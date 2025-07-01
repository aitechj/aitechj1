package com.aiportal.learning.dto;

import com.aiportal.learning.validation.NoXSS;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuditLogFilterRequest {
    @Min(value = 0, message = "Page number must be non-negative")
    private int page = 0;
    
    @Min(value = 1, message = "Page size must be at least 1")
    @Max(value = 100, message = "Page size must not exceed 100")
    private int size = 10;
    
    @Size(max = 100, message = "Entity name must not exceed 100 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_-]*$", message = "Entity name can only contain letters, numbers, underscores, and hyphens")
    @NoXSS
    private String entityName;
    
    @Pattern(regexp = "^(INFO|WARN|ERROR|CRITICAL)?$", message = "Severity must be one of: INFO, WARN, ERROR, CRITICAL")
    private String severity;
    
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Start date must be in YYYY-MM-DD format")
    private String startDate;
    
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "End date must be in YYYY-MM-DD format")
    private String endDate;
    
    private Long userId;
    
    public AuditLogFilterRequest() {}
    
    public AuditLogFilterRequest(int page, int size, String entityName, String severity, String startDate, String endDate, Long userId) {
        this.page = page;
        this.size = size;
        this.entityName = entityName;
        this.severity = severity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
    
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    
    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }
    
    public String getEntityName() { return entityName; }
    public void setEntityName(String entityName) { this.entityName = entityName; }
    
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
