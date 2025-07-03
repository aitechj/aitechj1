package com.aiportal.learning.controller;

import com.aiportal.learning.dto.UserPreferencesDto;
import com.aiportal.learning.dto.UserPreferencesRequest;
import com.aiportal.learning.dto.UserProfileRequest;
import com.aiportal.learning.dto.AuthResponse;
import com.aiportal.learning.model.User;
import com.aiportal.learning.model.UserPreferences;
import com.aiportal.learning.service.UserService;
import com.aiportal.learning.service.UserPreferencesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserPreferencesService userPreferencesService;
    
    @PutMapping
    public ResponseEntity<AuthResponse.UserDto> updateProfile(@Valid @RequestBody UserProfileRequest request,
                                                             Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            
            User savedUser = userService.save(user);
            
            if (request.getBio() != null) {
                UserPreferences preferences = userPreferencesService.getOrCreateUserPreferences(user);
                preferences.setBio(request.getBio());
                userPreferencesService.save(preferences);
            }
            
            return ResponseEntity.ok(new AuthResponse.UserDto(savedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/preferences")
    public ResponseEntity<UserPreferencesDto> getUserPreferences(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserPreferences preferences = userPreferencesService.getOrCreateUserPreferences(user);
        return ResponseEntity.ok(new UserPreferencesDto(preferences));
    }
    
    @PutMapping("/preferences")
    public ResponseEntity<UserPreferencesDto> updateUserPreferences(@Valid @RequestBody UserPreferencesRequest request,
                                                                   Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            UserPreferences.DifficultyLevel difficultyLevel = 
                UserPreferences.DifficultyLevel.valueOf(request.getDifficultyLevel().toUpperCase());
            
            UserPreferences preferences = userPreferencesService.updateUserPreferences(
                user, difficultyLevel, request.getPreferredTopics(), request.getBio(),
                request.isEmailCourseUpdates(), request.isEmailLearningReminders(),
                request.isEmailChatTips(), request.isEmailPlatformUpdates()
            );
            
            return ResponseEntity.ok(new UserPreferencesDto(preferences));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
