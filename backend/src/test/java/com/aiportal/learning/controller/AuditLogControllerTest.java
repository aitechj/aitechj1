package com.aiportal.learning.controller;

import com.aiportal.learning.dto.AuditLogFilterRequest;
import com.aiportal.learning.dto.AuditLogRequest;
import com.aiportal.learning.dto.PaginationRequest;
import com.aiportal.learning.model.AuditLog;
import com.aiportal.learning.service.AuditLogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuditLogController.class)
public class AuditLogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuditLogService auditLogService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testGetAllAuditLogs_ValidRequest_ShouldReturnLogs() throws Exception {
        Page<AuditLog> mockPage = new PageImpl<>(Collections.emptyList());
        when(auditLogService.getAllAuditLogs(anyInt(), anyInt(), any(), any())).thenReturn(mockPage);

        mockMvc.perform(get("/api/audit/logs")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void testGetAllAuditLogs_NonAdminUser_ShouldReturnForbidden() throws Exception {
        mockMvc.perform(get("/api/audit/logs"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testCreateManualAuditLog_ValidRequest_ShouldSucceed() throws Exception {
        AuditLogRequest validRequest = new AuditLogRequest(
                "TestEntity", "123", "CREATE", null, "test data", 1L, "INFO"
        );

        mockMvc.perform(post("/api/audit/logs/manual")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testCreateManualAuditLog_BlankEntityName_ShouldReturnBadRequest() throws Exception {
        AuditLogRequest invalidRequest = new AuditLogRequest(
                "", "123", "CREATE", null, "test data", 1L, "INFO"
        );

        mockMvc.perform(post("/api/audit/logs/manual")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testCreateManualAuditLog_InvalidOperation_ShouldReturnBadRequest() throws Exception {
        AuditLogRequest invalidRequest = new AuditLogRequest(
                "TestEntity", "123", "invalid-operation", null, "test data", 1L, "INFO"
        );

        mockMvc.perform(post("/api/audit/logs/manual")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testCreateManualAuditLog_InvalidSeverity_ShouldReturnBadRequest() throws Exception {
        AuditLogRequest invalidRequest = new AuditLogRequest(
                "TestEntity", "123", "CREATE", null, "test data", 1L, "INVALID_SEVERITY"
        );

        mockMvc.perform(post("/api/audit/logs/manual")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testCreateManualAuditLog_XSSInjection_ShouldReturnBadRequest() throws Exception {
        AuditLogRequest xssRequest = new AuditLogRequest(
                "<script>alert('XSS')</script>", "123", "CREATE", null, "test data", 1L, "INFO"
        );

        mockMvc.perform(post("/api/audit/logs/manual")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(xssRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testGetAuditLogsByEntity_ValidRequest_ShouldReturnLogs() throws Exception {
        Page<AuditLog> mockPage = new PageImpl<>(Collections.emptyList());
        when(auditLogService.getAuditLogsByEntity(anyString(), anyInt(), anyInt(), any(), any())).thenReturn(mockPage);

        mockMvc.perform(get("/api/audit/logs/entity/TestEntity")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testGetAuditLogsBySeverity_ValidRequest_ShouldReturnLogs() throws Exception {
        Page<AuditLog> mockPage = new PageImpl<>(Collections.emptyList());
        when(auditLogService.getAuditLogsBySeverity(anyString(), anyInt(), anyInt(), any(), any())).thenReturn(mockPage);

        mockMvc.perform(get("/api/audit/logs/severity/INFO")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void testGetAuditLogsByUser_ValidRequest_ShouldReturnLogs() throws Exception {
        Page<AuditLog> mockPage = new PageImpl<>(Collections.emptyList());
        when(auditLogService.getAuditLogsByUser(anyLong(), anyInt(), anyInt())).thenReturn(mockPage);

        mockMvc.perform(get("/api/audit/logs/user/1")
                .param("page", "0")
                .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}
