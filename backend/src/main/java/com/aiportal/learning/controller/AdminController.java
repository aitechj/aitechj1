package com.aiportal.learning.controller;

import com.aiportal.learning.dto.AdminStatsDto;
import com.aiportal.learning.dto.AuthResponse;
import com.aiportal.learning.model.User;
import com.aiportal.learning.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getAdminStats() {
        AdminStatsDto stats = adminService.getAdminStats();
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<AuthResponse.UserDto>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        List<AuthResponse.UserDto> userDtos = users.stream()
            .map(AuthResponse.UserDto::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }
}
