package com.aiportal.learning.controller;

import com.aiportal.learning.dto.AuditLogRequest;
import com.aiportal.learning.model.AuditLog;
import com.aiportal.learning.service.AuditLogService;
import jakarta.validation.Valid;
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
        
        if (page < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
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
        
        if (page < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
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
        
        if (page < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
        return ResponseEntity.ok(auditLogService.getAuditLogsBySeverity(severity, page, size, startDate, endDate));
    }
    
    @GetMapping("/logs/user/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        if (page < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
        return ResponseEntity.ok(auditLogService.getAuditLogsByUser(userId, page, size));
    }
    
    @PostMapping("/logs/manual")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> createManualAuditLog(@Valid @RequestBody AuditLogRequest auditLogRequest) {
        auditLogService.createManualAuditLog(
            auditLogRequest.getEntityName(),
            auditLogRequest.getEntityId(),
            auditLogRequest.getOperation(),
            auditLogRequest.getOldValues(),
            auditLogRequest.getNewValues(),
            auditLogRequest.getUserId(),
            auditLogRequest.getSeverity()
        );
        return ResponseEntity.ok().build();
    }
}
