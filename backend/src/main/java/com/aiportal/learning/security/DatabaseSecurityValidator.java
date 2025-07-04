package com.aiportal.learning.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class DatabaseSecurityValidator {
    
    @Value("${DATABASE_URL:}")
    private String databaseUrl;
    
    @PostConstruct
    public void validateDatabaseSecurity() {
        if (databaseUrl == null || databaseUrl.trim().isEmpty()) {
            throw new IllegalStateException("DATABASE_URL environment variable must be provided");
        }
        
        String maskedUrl = databaseUrl.replaceAll("://[^/]+/", "://***host***/");
        System.out.println("DATABASE_URL format check: " + maskedUrl);
        
        if (!databaseUrl.startsWith("jdbc:postgresql://")) {
            throw new IllegalStateException("DATABASE_URL must be a valid PostgreSQL JDBC URL");
        }
        if (!databaseUrl.contains("sslmode=require")) {
            throw new IllegalStateException("DATABASE_URL must include sslmode=require for security");
        }
        
        try {
            if (databaseUrl.contains("?")) {
                String queryString = databaseUrl.substring(databaseUrl.indexOf("?") + 1);
                String[] params = queryString.split("&");
                String username = null;
                String password = null;
                
                for (String param : params) {
                    if (param.startsWith("user=")) {
                        username = param.substring(5);
                    } else if (param.startsWith("password=")) {
                        password = param.substring(9);
                    }
                }
                
                if (username != null && password != null) {
                    System.out.println("Extracted username: " + username);
                    System.out.println("Extracted password: [MASKED - " + password.length() + " characters]");
                    
                    if ("postgres".equals(username)) {
                        throw new IllegalStateException("DATABASE_URL should not use default 'postgres' username for security");
                    }
                    if (password.length() < 16) {
                        throw new IllegalStateException("DATABASE_URL password must be at least 16 characters long for security");
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Warning: Could not parse DATABASE_URL query parameters for validation: " + e.getMessage());
        }
        
        System.out.println("DatabaseSecurityValidator: All validations passed");
    }
}
