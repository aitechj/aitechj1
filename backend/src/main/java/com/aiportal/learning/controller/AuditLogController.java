package com.aiportal.learning.controller;

import com.aiportal.learning.dto.AuditLogFilterRequest;
import com.aiportal.learning.dto.AuditLogRequest;
import com.aiportal.learning.dto.PaginationRequest;
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
            @ModelAttribute AuditLogFilterRequest filterRequest) {
        
        if (filterRequest.getPage() < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (filterRequest.getSize() < 1 || filterRequest.getSize() > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
        return ResponseEntity.ok(auditLogService.getAllAuditLogs(
            filterRequest.getPage(), 
            filterRequest.getSize(), 
            filterRequest.getStartDate(), 
            filterRequest.getEndDate()
        ));
    }
    
    @GetMapping("/logs/entity/{entityName}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsByEntity(
            @PathVariable String entityName,
            @ModelAttribute AuditLogFilterRequest filterRequest) {
        
        if (filterRequest.getPage() < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (filterRequest.getSize() < 1 || filterRequest.getSize() > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
        return ResponseEntity.ok(auditLogService.getAuditLogsByEntity(
            entityName, 
            filterRequest.getPage(), 
            filterRequest.getSize(), 
            filterRequest.getStartDate(), 
            filterRequest.getEndDate()
        ));
    }
    
    @GetMapping("/logs/severity/{severity}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsBySeverity(
            @PathVariable String severity,
            @ModelAttribute AuditLogFilterRequest filterRequest) {
        
        if (filterRequest.getPage() < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (filterRequest.getSize() < 1 || filterRequest.getSize() > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
        return ResponseEntity.ok(auditLogService.getAuditLogsBySeverity(
            severity, 
            filterRequest.getPage(), 
            filterRequest.getSize(), 
            filterRequest.getStartDate(), 
            filterRequest.getEndDate()
        ));
    }
    
    @GetMapping("/logs/user/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<AuditLog>> getAuditLogsByUser(
            @PathVariable Long userId,
            @ModelAttribute PaginationRequest paginationRequest) {
        
        if (paginationRequest.getPage() < 0) {
            throw new IllegalArgumentException("Page number must be non-negative");
        }
        if (paginationRequest.getSize() < 1 || paginationRequest.getSize() > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
        
        return ResponseEntity.ok(auditLogService.getAuditLogsByUser(
            userId, 
            paginationRequest.getPage(), 
            paginationRequest.getSize()
        ));
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
