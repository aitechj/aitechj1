package com.aiportal.learning.dto;

import com.aiportal.learning.validation.NoXSS;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuditLogRequest {
    @NotBlank(message = "Entity name is required")
    @Size(min = 1, max = 100, message = "Entity name must be between 1 and 100 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_-]+$", message = "Entity name can only contain letters, numbers, underscores, and hyphens")
    @NoXSS
    private String entityName;
    
    @NotBlank(message = "Entity ID is required")
    @Size(min = 1, max = 255, message = "Entity ID must be between 1 and 255 characters")
    @NoXSS
    private String entityId;
    
    @NotBlank(message = "Operation is required")
    @Size(min = 1, max = 50, message = "Operation must be between 1 and 50 characters")
    @Pattern(regexp = "^[A-Z_]+$", message = "Operation must contain only uppercase letters and underscores")
    @NoXSS
    private String operation;
    
    @Size(max = 1000, message = "Old values must not exceed 1000 characters")
    @NoXSS
    private String oldValues;
    
    @Size(max = 1000, message = "New values must not exceed 1000 characters")
    @NoXSS
    private String newValues;
    
    private Long userId;
    
    @Pattern(regexp = "^(INFO|WARN|ERROR|CRITICAL)$", message = "Severity must be one of: INFO, WARN, ERROR, CRITICAL")
    private String severity = "INFO";
    
    public AuditLogRequest() {}
    
    public AuditLogRequest(String entityName, String entityId, String operation, String oldValues, String newValues, Long userId, String severity) {
        this.entityName = entityName;
        this.entityId = entityId;
        this.operation = operation;
        this.oldValues = oldValues;
        this.newValues = newValues;
        this.userId = userId;
        this.severity = severity != null ? severity : "INFO";
    }
    
    public String getEntityName() { return entityName; }
    public void setEntityName(String entityName) { this.entityName = entityName; }
    
    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }
    
    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }
    
    public String getOldValues() { return oldValues; }
    public void setOldValues(String oldValues) { this.oldValues = oldValues; }
    
    public String getNewValues() { return newValues; }
    public void setNewValues(String newValues) { this.newValues = newValues; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
}
