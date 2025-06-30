package com.aiportal.learning.controller;

import com.aiportal.learning.model.AuditLog;
import com.aiportal.learning.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/audit")
public class AuditLogController {
    
    @Autowired
    private AuditLogService auditLogService;
    
    @GetMapping("/logs")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAllAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(auditLogService.getAllAuditLogs(page, size, startDate, endDate));
    }
    
    @GetMapping("/logs/entity/{entityName}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsByEntity(
            @PathVariable String entityName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(auditLogService.getAuditLogsByEntity(entityName, page, size, startDate, endDate));
    }
    
    @GetMapping("/logs/severity/{severity}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsBySeverity(
            @PathVariable String severity,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(auditLogService.getAuditLogsBySeverity(severity, page, size, startDate, endDate));
    }
    
    @GetMapping("/logs/user/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(auditLogService.getAuditLogsByUser(userId, page, size));
    }
    
    @PostMapping("/logs/manual")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> createManualAuditLog(
            @RequestParam String entityName,
            @RequestParam String entityId,
            @RequestParam String operation,
            @RequestParam(required = false) String oldValues,
            @RequestParam(required = false) String newValues,
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "INFO") String severity) {
        auditLogService.createManualAuditLog(entityName, entityId, operation, oldValues, newValues, userId, severity);
        return ResponseEntity.ok().build();
    }
}
