package com.aiportal.learning.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NoXSSValidator implements ConstraintValidator<NoXSS, String> {
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        
        String[] xssPatterns = {
            "<script", "</script>", "javascript:", "onload=", "onerror=", 
            "onclick=", "onmouseover=", "onfocus=", "onblur=", "onchange=",
            "eval(", "expression(", "vbscript:", "data:text/html"
        };
        
        String lowerValue = value.toLowerCase();
        for (String pattern : xssPatterns) {
            if (lowerValue.contains(pattern)) {
                return false;
            }
        }
        return true;
    }
}
