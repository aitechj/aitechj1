package com.aiportal.learning.config;

import com.aiportal.learning.service.AuditLogService;
import com.aiportal.learning.service.UserService;
import com.aiportal.learning.util.IpAddressUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class ApiAccessLoggingFilter implements Filter {
    
    @Autowired
    private AuditLogService auditLogService;
    
    @Autowired
    private UserService userService;
    
    private static final List<String> MONITORED_PATHS = Arrays.asList(
        "/api/auth", "/api/subscribers", "/api/audit"
    );
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String uri = httpRequest.getRequestURI();
        boolean shouldMonitor = MONITORED_PATHS.stream().anyMatch(uri::startsWith);
        
        if (!shouldMonitor) {
            chain.doFilter(request, response);
            return;
        }
        
        long startTime = System.currentTimeMillis();
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(httpResponse);
        
        try {
            chain.doFilter(request, responseWrapper);
        } finally {
            long responseTime = System.currentTimeMillis() - startTime;
            String ipAddress = IpAddressUtil.getClientIpAddress(httpRequest);
            String method = httpRequest.getMethod();
            int statusCode = responseWrapper.getStatus();
            
            Long userId = getCurrentUserId();
            
            auditLogService.logApiAccess(uri, method, ipAddress, userId, responseTime, statusCode);
            
            responseWrapper.copyBodyToResponse();
        }
    }
    
    private Long getCurrentUserId() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                String email = auth.getName();
                var user = userService.findByEmail(email);
                if (user.isPresent()) {
                    return user.get().getId();
                }
            }
        } catch (Exception e) {
        }
        return null;
    }
}
