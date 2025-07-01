package com.aiportal.learning.controller;

import com.aiportal.learning.dto.AuthResponse;
import com.aiportal.learning.dto.LoginRequest;
import com.aiportal.learning.dto.RegisterRequest;
import com.aiportal.learning.model.User;
import com.aiportal.learning.service.AuthService;
import com.aiportal.learning.service.AuditLogService;
import com.aiportal.learning.service.InputSanitizationService;
import com.aiportal.learning.service.UserService;
import com.aiportal.learning.util.IpAddressUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private InputSanitizationService inputSanitizationService;
    
    @Autowired
    private AuditLogService auditLogService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, 
                                           HttpServletResponse httpResponse, HttpServletRequest httpRequest) {
        try {
            String ipAddress = IpAddressUtil.getClientIpAddress(httpRequest);
            System.out.println("DEBUG: Login attempt for email: " + request.getEmail());
            AuthResponse response = authService.login(request);
            setAuthCookie(httpResponse, response.getToken());
            
            auditLogService.logSuccessfulLogin(request.getEmail(), ipAddress, Long.parseLong(response.getUser().getId()));
            
            System.out.println("DEBUG: Login successful for email: " + request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            String ipAddress = IpAddressUtil.getClientIpAddress(httpRequest);
            String userAgent = httpRequest.getHeader("User-Agent");
            
            auditLogService.logFailedLogin(request.getEmail(), ipAddress, userAgent);
            
            System.out.println("DEBUG: Login failed for email: " + request.getEmail() + " - Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request, HttpServletResponse httpResponse) {
        try {
            if (userService.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            
            request.setFirstName(inputSanitizationService.sanitizeInput(request.getFirstName()));
            request.setLastName(inputSanitizationService.sanitizeInput(request.getLastName()));
            
            AuthResponse response = authService.register(request);
            setAuthCookie(httpResponse, response.getToken());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<AuthResponse.UserDto> getCurrentUser(Authentication authentication, HttpServletRequest request) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        String email = authentication.getName();
        User user = userService.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if ("admin".equals(user.getRole())) {
            String ipAddress = IpAddressUtil.getClientIpAddress(request);
            auditLogService.logAdminDashboardAccess(email, ipAddress, user.getId());
        }
        
        return ResponseEntity.ok(new AuthResponse.UserDto(user));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse httpResponse) {
        clearAuthCookie(httpResponse);
        return ResponseEntity.ok().build();
    }
    
    private void setAuthCookie(HttpServletResponse response, String token) {
        String cookieValue = String.format(
            "auth_token=%s; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=None",
            token
        );
        response.setHeader("Set-Cookie", cookieValue);
    }
    
    private void clearAuthCookie(HttpServletResponse response) {
        String cookieValue = "auth_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None";
        response.setHeader("Set-Cookie", cookieValue);
    }
}
