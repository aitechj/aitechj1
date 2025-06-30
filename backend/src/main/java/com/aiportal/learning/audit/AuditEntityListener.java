package com.aiportal.learning.audit;

import com.aiportal.learning.model.AuditLog;
import com.aiportal.learning.repository.AuditLogRepository;
import com.aiportal.learning.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuditEntityListener {
    
    private static AuditLogRepository auditLogRepository;
    private static ObjectMapper objectMapper;
    private static UserService userService;
    
    @Autowired
    public void setAuditLogRepository(AuditLogRepository auditLogRepository) {
        AuditEntityListener.auditLogRepository = auditLogRepository;
    }
    
    @Autowired
    public void setObjectMapper(ObjectMapper objectMapper) {
        AuditEntityListener.objectMapper = objectMapper;
    }
    
    @Autowired
    public void setUserService(UserService userService) {
        AuditEntityListener.userService = userService;
    }
    
    @PostPersist
    public void postPersist(Object entity) {
        createAuditLog(entity, "CREATE", null, entity);
    }
    
    @PostUpdate
    public void postUpdate(Object entity) {
        createAuditLog(entity, "UPDATE", null, entity);
    }
    
    @PostRemove
    public void postRemove(Object entity) {
        createAuditLog(entity, "DELETE", entity, null);
    }
    
    private void createAuditLog(Object entity, String operation, Object oldValue, Object newValue) {
        try {
            if (auditLogRepository == null || objectMapper == null) {
                return;
            }
            
            AuditLog auditLog = new AuditLog();
            auditLog.setEntityName(entity.getClass().getSimpleName());
            auditLog.setEntityId(getEntityId(entity));
            auditLog.setOperation(operation);
            auditLog.setOldValues(oldValue != null ? objectMapper.writeValueAsString(oldValue) : null);
            auditLog.setNewValues(newValue != null ? objectMapper.writeValueAsString(newValue) : null);
            auditLog.setUserId(getCurrentUserId());
            auditLog.setSeverity(determineSeverity(operation, entity));
            
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            System.err.println("Failed to create audit log: " + e.getMessage());
        }
    }
    
    private String getEntityId(Object entity) {
        try {
            var idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            Object id = idField.get(entity);
            return id != null ? id.toString() : "unknown";
        } catch (Exception e) {
            return "unknown";
        }
    }
    
    private Long getCurrentUserId() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                String email = auth.getName();
                if (userService != null) {
                    var user = userService.findByEmail(email);
                    if (user.isPresent()) {
                        return user.get().getId();
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to get current user ID: " + e.getMessage());
        }
        return null;
    }
    
    private String determineSeverity(String operation, Object entity) {
        if ("DELETE".equals(operation)) {
            return "WARN";
        } else if ("CREATE".equals(operation)) {
            return "INFO";
        } else if ("UPDATE".equals(operation)) {
            return "INFO";
        }
        return "INFO";
    }
}
