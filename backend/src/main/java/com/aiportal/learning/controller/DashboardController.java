package com.aiportal.learning.controller;

import com.aiportal.learning.dto.DashboardStatsDto;
import com.aiportal.learning.dto.EnrollmentDto;
import com.aiportal.learning.model.User;
import com.aiportal.learning.model.Enrollment;
import com.aiportal.learning.service.DashboardService;
import com.aiportal.learning.service.EnrollmentService;
import com.aiportal.learning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    
    @Autowired
    private DashboardService dashboardService;
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        DashboardStatsDto stats = dashboardService.getUserDashboardStats(user);
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/courses")
    public ResponseEntity<List<EnrollmentDto>> getCurrentCourses(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Enrollment> activeEnrollments = enrollmentService.findActiveEnrollmentsByUserId(user.getId());
        List<EnrollmentDto> enrollmentDtos = activeEnrollments.stream()
            .map(EnrollmentDto::new)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(enrollmentDtos);
    }
}
