package com.aiportal.learning.service;

import com.aiportal.learning.model.AuditLog;
import com.aiportal.learning.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class AuditLogService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    public Page<AuditLog> getAllAuditLogs(int page, int size, String startDate, String endDate) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            return auditLogRepository.findByTimestampBetweenOrderByTimestampDesc(start, end, pageable);
        } else if (startDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            return auditLogRepository.findByTimestampGreaterThanEqualOrderByTimestampDesc(start, pageable);
        } else if (endDate != null) {
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            return auditLogRepository.findByTimestampLessThanEqualOrderByTimestampDesc(end, pageable);
        }
        
        return auditLogRepository.findAll(pageable);
    }
    
    public Page<AuditLog> getAuditLogsByEntity(String entityName, int page, int size, String startDate, String endDate) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            return auditLogRepository.findByEntityNameAndTimestampBetweenOrderByTimestampDesc(entityName, start, end, pageable);
        } else if (startDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            return auditLogRepository.findByEntityNameAndTimestampGreaterThanEqualOrderByTimestampDesc(entityName, start, pageable);
        } else if (endDate != null) {
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            return auditLogRepository.findByEntityNameAndTimestampLessThanEqualOrderByTimestampDesc(entityName, end, pageable);
        }
        
        return auditLogRepository.findByEntityNameOrderByTimestampDesc(entityName, pageable);
    }
    
    public Page<AuditLog> getAuditLogsBySeverity(String severity, int page, int size, String startDate, String endDate) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        
        if (startDate != null && endDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            return auditLogRepository.findBySeverityAndTimestampBetweenOrderByTimestampDesc(severity, start, end, pageable);
        } else if (startDate != null) {
            LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
            return auditLogRepository.findBySeverityAndTimestampGreaterThanEqualOrderByTimestampDesc(severity, start, pageable);
        } else if (endDate != null) {
            LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
            return auditLogRepository.findBySeverityAndTimestampLessThanEqualOrderByTimestampDesc(severity, end, pageable);
        }
        
        return auditLogRepository.findBySeverityOrderByTimestampDesc(severity, pageable);
    }
    
    public Page<AuditLog> getAuditLogsByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return auditLogRepository.findByUserIdOrderByTimestampDesc(userId, pageable);
    }
    
    public Page<AuditLog> getAuditLogsByEntityAndSeverity(String entityName, String severity, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return auditLogRepository.findByEntityNameAndSeverityOrderByTimestampDesc(entityName, severity, pageable);
    }
    
    public void createManualAuditLog(String entityName, String entityId, String operation, 
                                    String oldValues, String newValues, Long userId, String severity) {
        AuditLog auditLog = new AuditLog();
        auditLog.setEntityName(entityName);
        auditLog.setEntityId(entityId);
        auditLog.setOperation(operation);
        auditLog.setOldValues(oldValues);
        auditLog.setNewValues(newValues);
        auditLog.setUserId(userId);
        auditLog.setSeverity(severity);
        
        auditLogRepository.save(auditLog);
    }
    
    public void logFailedLogin(String email, String ipAddress, String userAgent) {
        createManualAuditLog("Authentication", email, "FAILED_LOGIN", 
            null, String.format("IP: %s, User-Agent: %s", ipAddress, userAgent), null, "WARN");
    }
    
    public void logSuccessfulLogin(String email, String ipAddress, Long userId) {
        createManualAuditLog("Authentication", email, "SUCCESSFUL_LOGIN", 
            null, String.format("IP: %s", ipAddress), userId, "INFO");
    }
    
    public void logApiAccess(String endpoint, String method, String ipAddress, Long userId, long responseTime, int statusCode) {
        String details = String.format("Method: %s, IP: %s, ResponseTime: %dms, Status: %d", 
            method, ipAddress, responseTime, statusCode);
        String severity = statusCode >= 400 ? "WARN" : "INFO";
        createManualAuditLog("API_ACCESS", endpoint, "ACCESS", null, details, userId, severity);
    }
    
    public void logAdminDashboardAccess(String email, String ipAddress, Long userId) {
        createManualAuditLog("AdminDashboard", "logs-dashboard", "ACCESS", 
            null, String.format("IP: %s", ipAddress), userId, "INFO");
    }
    
    public void logSlowQuery(String query, long executionTime) {
        String severity = executionTime > 5000 ? "CRITICAL" : executionTime > 1000 ? "WARN" : "INFO";
        createManualAuditLog("Database", "query", "SLOW_QUERY", 
            null, String.format("Query: %s, ExecutionTime: %dms", query, executionTime), null, severity);
    }
    
    public void logConfigurationChange(String configKey, String oldValue, String newValue, Long userId) {
        createManualAuditLog("Configuration", configKey, "CONFIG_CHANGE", oldValue, newValue, userId, "WARN");
    }
    
    public void logRateLimitViolation(String ipAddress, String endpoint, int requestCount) {
        createManualAuditLog("Security", "rate-limit", "VIOLATION", 
            null, String.format("IP: %s, Endpoint: %s, Requests: %d", ipAddress, endpoint, requestCount), null, "CRITICAL");
    }
    
    public void logSystemError(String component, String errorMessage, String stackTrace) {
        createManualAuditLog("System", component, "ERROR", 
            null, String.format("Error: %s, Stack: %s", errorMessage, stackTrace), null, "ERROR");
    }
    
    public void logCriticalEvent(String entityName, String entityId, String description, Long userId) {
        createManualAuditLog(entityName, entityId, "CRITICAL_EVENT", null, description, userId, "CRITICAL");
    }
    
    
    public void logErrorEvent(String entityName, String entityId, String description, Long userId) {
        createManualAuditLog(entityName, entityId, "ERROR_EVENT", null, description, userId, "ERROR");
    }
}
