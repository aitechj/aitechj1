package com.aiportal.learning.controller;

import com.aiportal.learning.dto.EnrollmentDto;
import com.aiportal.learning.dto.EnrollmentRequest;
import com.aiportal.learning.model.Enrollment;
import com.aiportal.learning.model.User;
import com.aiportal.learning.model.Course;
import com.aiportal.learning.service.EnrollmentService;
import com.aiportal.learning.service.UserService;
import com.aiportal.learning.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private CourseService courseService;
    
    @GetMapping
    public ResponseEntity<List<EnrollmentDto>> getUserEnrollments(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Enrollment> enrollments = enrollmentService.findByUserId(user.getId());
        List<EnrollmentDto> enrollmentDtos = enrollments.stream()
            .map(EnrollmentDto::new)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(enrollmentDtos);
    }
    
    @PostMapping
    public ResponseEntity<EnrollmentDto> enrollInCourse(@Valid @RequestBody EnrollmentRequest request, 
                                                       Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Course course = courseService.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
            
            Enrollment enrollment = enrollmentService.enrollUser(user, course);
            return ResponseEntity.ok(new EnrollmentDto(enrollment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/progress")
    public ResponseEntity<EnrollmentDto> updateProgress(@PathVariable Long id, 
                                                       @Valid @RequestBody EnrollmentRequest request,
                                                       Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Enrollment enrollment = enrollmentService.updateProgress(id, request.getProgressPercentage());
            
            if (!enrollment.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).build();
            }
            
            return ResponseEntity.ok(new EnrollmentDto(enrollment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
