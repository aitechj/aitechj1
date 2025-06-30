package com.aiportal.learning.service;

import com.aiportal.learning.model.AuditLog;
import com.aiportal.learning.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    public Page<AuditLog> getAllAuditLogs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        return auditLogRepository.findAll(pageable);
    }
    
    public Page<AuditLog> getAuditLogsByEntity(String entityName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return auditLogRepository.findByEntityNameOrderByTimestampDesc(entityName, pageable);
    }
    
    public Page<AuditLog> getAuditLogsBySeverity(String severity, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
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
    
    public void logCriticalEvent(String entityName, String entityId, String description, Long userId) {
        createManualAuditLog(entityName, entityId, "CRITICAL_EVENT", null, description, userId, "CRITICAL");
    }
    
    public void logDebugEvent(String entityName, String entityId, String description, Long userId) {
        createManualAuditLog(entityName, entityId, "DEBUG_EVENT", null, description, userId, "DEBUG");
    }
    
    public void logErrorEvent(String entityName, String entityId, String description, Long userId) {
        createManualAuditLog(entityName, entityId, "ERROR_EVENT", null, description, userId, "ERROR");
    }
}
