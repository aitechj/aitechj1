package com.aiportal.learning.service;

import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

@Service
public class InputSanitizationService {
    
    public String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        
        String sanitized = HtmlUtils.htmlEscape(input);
        
        sanitized = sanitized.replaceAll("[<>\"'%;()&+]", "");
        
        return sanitized.trim();
    }
    
    public String sanitizeForDisplay(String input) {
        return input != null ? HtmlUtils.htmlEscape(input) : null;
    }
}
