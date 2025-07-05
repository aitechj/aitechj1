package com.aiportal.learning.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class DatabaseSecurityValidator {
    
    @Value("${JDBC_URL:}")
    private String jdbcUrl;
    
    @Value("${DB_USERNAME:}")
    private String dbUsername;
    
    @Value("${DB_PASSWORD:}")
    private String dbPassword;
    
    @PostConstruct
    public void validateDatabaseSecurity() {
        if (jdbcUrl == null || jdbcUrl.trim().isEmpty()) {
            throw new IllegalStateException("JDBC_URL environment variable must be provided");
        }
        if (!jdbcUrl.startsWith("jdbc:postgresql://")) {
            throw new IllegalStateException("JDBC_URL must be a valid PostgreSQL JDBC URL");
        }
        if (!jdbcUrl.contains("sslmode=require")) {
            throw new IllegalStateException("JDBC_URL must include sslmode=require for security");
        }
        if (dbUsername == null || dbUsername.trim().isEmpty()) {
            throw new IllegalStateException("DB_USERNAME environment variable must be provided");
        }
        if (dbPassword == null || dbPassword.trim().isEmpty()) {
            throw new IllegalStateException("DB_PASSWORD environment variable must be provided");
        }
        if ("postgres".equals(dbUsername)) {
            throw new IllegalStateException("DB_USERNAME should not use default 'postgres' username for security");
        }
    }
}
