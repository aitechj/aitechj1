package com.aiportal.learning.config;

import com.aiportal.learning.service.AuditLogService;
import com.aiportal.learning.util.IpAddressUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SecurityLoggingFilter implements Filter {
    
    private static final Logger logger = LoggerFactory.getLogger(SecurityLoggingFilter.class);
    private static final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS_PER_MINUTE = 100;
    
    @Autowired
    private AuditLogService auditLogService;
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String method = httpRequest.getMethod();
        String uri = httpRequest.getRequestURI();
        String userAgent = httpRequest.getHeader("User-Agent");
        String ipAddress = IpAddressUtil.getClientIpAddress(httpRequest);
        
        if (containsSuspiciousContent(uri) || containsSuspiciousContent(userAgent)) {
            logger.warn("Suspicious request detected - Method: {}, URI: {}, User-Agent: {}", 
                       method, uri, userAgent);
            auditLogService.logSystemError("Security", "Suspicious request detected", 
                String.format("Method: %s, URI: %s, IP: %s", method, uri, ipAddress));
        }
        
        checkRateLimit(ipAddress, uri);
        
        chain.doFilter(request, response);
    }
    
    private void checkRateLimit(String ipAddress, String endpoint) {
        long currentTime = System.currentTimeMillis();
        String key = ipAddress + ":" + endpoint;
        
        requestCounts.computeIfAbsent(key, k -> new ArrayList<>()).add(currentTime);
        
        List<Long> timestamps = requestCounts.get(key);
        timestamps.removeIf(timestamp -> currentTime - timestamp > 60000);
        
        if (timestamps.size() > MAX_REQUESTS_PER_MINUTE) {
            auditLogService.logRateLimitViolation(ipAddress, endpoint, timestamps.size());
        }
    }
    
    private boolean containsSuspiciousContent(String content) {
        if (content == null) return false;
        String lower = content.toLowerCase();
        return lower.contains("<script") || lower.contains("javascript:") || 
               lower.contains("eval(") || lower.contains("expression(");
    }
}
