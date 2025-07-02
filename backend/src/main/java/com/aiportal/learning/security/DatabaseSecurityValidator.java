package com.aiportal.learning.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class DatabaseSecurityValidator {
    
    @Value("${DATABASE_FILE_PASSWORD}")
    private String databaseFilePassword;
    
    @Value("${DATABASE_USER_PASSWORD}")
    private String databaseUserPassword;
    
    @Value("${spring.datasource.username}")
    private String databaseUsername;
    
    @PostConstruct
    public void validateDatabaseSecurity() {
        if (databaseFilePassword == null || databaseFilePassword.trim().isEmpty()) {
            throw new IllegalStateException("DATABASE_FILE_PASSWORD environment variable must be provided");
        }
        if (databaseFilePassword.length() < 16) {
            throw new IllegalStateException("DATABASE_FILE_PASSWORD must be at least 16 characters long for security");
        }
        if (databaseUserPassword == null || databaseUserPassword.trim().isEmpty()) {
            throw new IllegalStateException("DATABASE_USER_PASSWORD environment variable must be provided");
        }
        if (databaseUserPassword.length() < 16) {
            throw new IllegalStateException("DATABASE_USER_PASSWORD must be at least 16 characters long for security");
        }
        if (databaseUsername == null || databaseUsername.trim().isEmpty()) {
            throw new IllegalStateException("DATABASE_USERNAME environment variable must be provided");
        }
        if ("sa".equals(databaseUsername)) {
            throw new IllegalStateException("DATABASE_USERNAME should not use default 'sa' username for security");
        }
    }
}
