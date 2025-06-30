package com.aiportal.learning.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SecurityLoggingFilter implements Filter {
    
    private static final Logger logger = LoggerFactory.getLogger(SecurityLoggingFilter.class);
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String method = httpRequest.getMethod();
        String uri = httpRequest.getRequestURI();
        String userAgent = httpRequest.getHeader("User-Agent");
        
        if (containsSuspiciousContent(uri) || containsSuspiciousContent(userAgent)) {
            logger.warn("Suspicious request detected - Method: {}, URI: {}, User-Agent: {}", 
                       method, uri, userAgent);
        }
        
        chain.doFilter(request, response);
    }
    
    private boolean containsSuspiciousContent(String content) {
        if (content == null) return false;
        String lower = content.toLowerCase();
        return lower.contains("<script") || lower.contains("javascript:") || 
               lower.contains("eval(") || lower.contains("expression(");
    }
}
