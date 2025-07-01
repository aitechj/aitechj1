package com.aiportal.learning.dto;

import com.aiportal.learning.validation.NoXSS;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class ValidationDTOTest {

    private Validator validator;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void testAuditLogRequest_ValidData_ShouldPass() {
        AuditLogRequest request = new AuditLogRequest(
                "TestEntity", "123", "CREATE", null, "test data", 1L, "INFO"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertTrue(violations.isEmpty(), "Valid request should have no violations");
    }

    @Test
    public void testAuditLogRequest_BlankEntityName_ShouldFail() {
        AuditLogRequest request = new AuditLogRequest(
                "", "123", "CREATE", null, "test data", 1L, "INFO"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Blank entity name should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Entity name is required")));
    }

    @Test
    public void testAuditLogRequest_BlankEntityId_ShouldFail() {
        AuditLogRequest request = new AuditLogRequest(
                "TestEntity", "", "CREATE", null, "test data", 1L, "INFO"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Blank entity ID should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Entity ID is required")));
    }

    @Test
    public void testAuditLogRequest_BlankOperation_ShouldFail() {
        AuditLogRequest request = new AuditLogRequest(
                "TestEntity", "123", "", null, "test data", 1L, "INFO"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Blank operation should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Operation is required")));
    }

    @Test
    public void testAuditLogRequest_InvalidOperationPattern_ShouldFail() {
        AuditLogRequest request = new AuditLogRequest(
                "TestEntity", "123", "invalid-operation", null, "test data", 1L, "INFO"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Invalid operation pattern should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Operation must contain only uppercase letters and underscores")));
    }

    @Test
    public void testAuditLogRequest_InvalidSeverity_ShouldFail() {
        AuditLogRequest request = new AuditLogRequest(
                "TestEntity", "123", "CREATE", null, "test data", 1L, "INVALID_SEVERITY"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Invalid severity should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Severity must be one of: INFO, WARN, ERROR, CRITICAL")));
    }

    @Test
    public void testAuditLogRequest_ExcessiveEntityNameLength_ShouldFail() {
        String longEntityName = "a".repeat(101);
        AuditLogRequest request = new AuditLogRequest(
                longEntityName, "123", "CREATE", null, "test data", 1L, "INFO"
        );

        Set<ConstraintViolation<AuditLogRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Excessive entity name length should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Entity name must be between 1 and 100 characters")));
    }

    @Test
    public void testAuditLogFilterRequest_ValidData_ShouldPass() {
        AuditLogFilterRequest request = new AuditLogFilterRequest(
                0, 10, "TestEntity", "INFO", "2025-01-01", "2025-12-31", 1L
        );

        Set<ConstraintViolation<AuditLogFilterRequest>> violations = validator.validate(request);
        assertTrue(violations.isEmpty(), "Valid filter request should have no violations");
    }

    @Test
    public void testAuditLogFilterRequest_NegativePage_ShouldFail() {
        AuditLogFilterRequest request = new AuditLogFilterRequest(
                -1, 10, "TestEntity", "INFO", "2025-01-01", "2025-12-31", 1L
        );

        Set<ConstraintViolation<AuditLogFilterRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Negative page should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Page number must be non-negative")));
    }

    @Test
    public void testAuditLogFilterRequest_InvalidDateFormat_ShouldFail() {
        AuditLogFilterRequest request = new AuditLogFilterRequest(
                0, 10, "TestEntity", "INFO", "invalid-date", "2025-12-31", 1L
        );

        Set<ConstraintViolation<AuditLogFilterRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Invalid date format should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Start date must be in YYYY-MM-DD format")));
    }

    @Test
    public void testAuditLogFilterRequest_InvalidSeverity_ShouldFail() {
        AuditLogFilterRequest request = new AuditLogFilterRequest(
                0, 10, "TestEntity", "INVALID_SEVERITY", "2025-01-01", "2025-12-31", 1L
        );

        Set<ConstraintViolation<AuditLogFilterRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Invalid severity should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Severity must be one of: INFO, WARN, ERROR, CRITICAL")));
    }

    @Test
    public void testPaginationRequest_ValidData_ShouldPass() {
        PaginationRequest request = new PaginationRequest(0, 10);

        Set<ConstraintViolation<PaginationRequest>> violations = validator.validate(request);
        assertTrue(violations.isEmpty(), "Valid pagination request should have no violations");
    }

    @Test
    public void testPaginationRequest_NegativePage_ShouldFail() {
        PaginationRequest request = new PaginationRequest(-1, 10);

        Set<ConstraintViolation<PaginationRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Negative page should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Page number must be non-negative")));
    }

    @Test
    public void testPaginationRequest_ZeroSize_ShouldFail() {
        PaginationRequest request = new PaginationRequest(0, 0);

        Set<ConstraintViolation<PaginationRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Zero page size should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Page size must be at least 1")));
    }

    @Test
    public void testPaginationRequest_ExcessiveSize_ShouldFail() {
        PaginationRequest request = new PaginationRequest(0, 101);

        Set<ConstraintViolation<PaginationRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty(), "Excessive page size should cause validation failure");
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Page size must not exceed 100")));
    }
}
