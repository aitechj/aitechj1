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
        if (!databaseUrl.startsWith("jdbc:postgresql://")) {
            throw new IllegalStateException("DATABASE_URL must be a valid PostgreSQL JDBC URL");
        }
        if (!databaseUrl.contains("sslmode=require")) {
            throw new IllegalStateException("DATABASE_URL must include sslmode=require for security");
        }
        try {
            String urlPart = databaseUrl.substring("jdbc:postgresql://".length());
            if (urlPart.contains("@")) {
                String credentials = urlPart.substring(0, urlPart.indexOf("@"));
                if (credentials.contains(":")) {
                    String username = credentials.substring(0, credentials.indexOf(":"));
                    if ("postgres".equals(username)) {
                        throw new IllegalStateException("DATABASE_URL should not use default 'postgres' username for security");
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Warning: Could not parse DATABASE_URL for username validation: " + e.getMessage());
        }
    }
}
