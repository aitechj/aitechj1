package com.aiportal.learning.repository;

import com.aiportal.learning.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    Page<AuditLog> findByEntityNameOrderByTimestampDesc(String entityName, Pageable pageable);
    Page<AuditLog> findBySeverityOrderByTimestampDesc(String severity, Pageable pageable);
    Page<AuditLog> findByUserIdOrderByTimestampDesc(Long userId, Pageable pageable);
    
    @Query("SELECT a FROM AuditLog a WHERE a.entityName = :entityName AND a.severity = :severity ORDER BY a.timestamp DESC")
    Page<AuditLog> findByEntityNameAndSeverityOrderByTimestampDesc(@Param("entityName") String entityName, @Param("severity") String severity, Pageable pageable);
    
    Page<AuditLog> findByTimestampBetweenOrderByTimestampDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<AuditLog> findByTimestampGreaterThanEqualOrderByTimestampDesc(LocalDateTime start, Pageable pageable);
    Page<AuditLog> findByTimestampLessThanEqualOrderByTimestampDesc(LocalDateTime end, Pageable pageable);
    
    Page<AuditLog> findByEntityNameAndTimestampBetweenOrderByTimestampDesc(String entityName, LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<AuditLog> findByEntityNameAndTimestampGreaterThanEqualOrderByTimestampDesc(String entityName, LocalDateTime start, Pageable pageable);
    Page<AuditLog> findByEntityNameAndTimestampLessThanEqualOrderByTimestampDesc(String entityName, LocalDateTime end, Pageable pageable);
    
    Page<AuditLog> findBySeverityAndTimestampBetweenOrderByTimestampDesc(String severity, LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<AuditLog> findBySeverityAndTimestampGreaterThanEqualOrderByTimestampDesc(String severity, LocalDateTime start, Pageable pageable);
    Page<AuditLog> findBySeverityAndTimestampLessThanEqualOrderByTimestampDesc(String severity, LocalDateTime end, Pageable pageable);
}
