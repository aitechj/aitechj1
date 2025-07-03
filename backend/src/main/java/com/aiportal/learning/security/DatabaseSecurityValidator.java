package com.aiportal.learning.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class DatabaseSecurityValidator {
    
    @Value("${DATABASE_PASSWORD}")
    private String databasePassword;
    
    @Value("${spring.datasource.username}")
    private String databaseUsername;
    
    @PostConstruct
    public void validateDatabaseSecurity() {
        if (databasePassword == null || databasePassword.trim().isEmpty()) {
            throw new IllegalStateException("DATABASE_PASSWORD environment variable must be provided");
        }
        if (databasePassword.length() < 16) {
            throw new IllegalStateException("DATABASE_PASSWORD must be at least 16 characters long for security");
        }
        if (databaseUsername == null || databaseUsername.trim().isEmpty()) {
            throw new IllegalStateException("DATABASE_USERNAME environment variable must be provided");
        }
        if ("postgres".equals(databaseUsername)) {
            throw new IllegalStateException("DATABASE_USERNAME should not use default 'postgres' username for security");
        }
    }
}
