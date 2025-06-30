package com.aiportal.learning.controller;

import com.aiportal.learning.dto.AuthResponse;
import com.aiportal.learning.dto.LoginRequest;
import com.aiportal.learning.dto.RegisterRequest;
import com.aiportal.learning.model.User;
import com.aiportal.learning.service.AuthService;
import com.aiportal.learning.service.InputSanitizationService;
import com.aiportal.learning.service.UserService;
import jakarta.servlet.http.Cookie;
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
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse httpResponse) {
        try {
            AuthResponse response = authService.login(request);
            setAuthCookie(httpResponse, response.getToken());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
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
    public ResponseEntity<AuthResponse.UserDto> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        String email = authentication.getName();
        User user = userService.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return ResponseEntity.ok(new AuthResponse.UserDto(user));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse httpResponse) {
        clearAuthCookie(httpResponse);
        return ResponseEntity.ok().build();
    }
    
    private void setAuthCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // HTTPS only
        cookie.setPath("/");
        cookie.setMaxAge(3600); // 1 hour (matches JWT expiration)
        response.addCookie(cookie);
    }
    
    private void clearAuthCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth_token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately
        response.addCookie(cookie);
    }
}
