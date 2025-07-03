package com.aiportal.learning.controller;

import com.aiportal.learning.dto.CourseDto;
import com.aiportal.learning.dto.CourseRequest;
import com.aiportal.learning.model.Course;
import com.aiportal.learning.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    @Autowired
    private CourseService courseService;
    
    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<Course> courses = courseService.findActiveCourses();
        List<CourseDto> courseDtos = courses.stream()
            .map(CourseDto::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(courseDtos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable Long id) {
        return courseService.findById(id)
            .map(course -> ResponseEntity.ok(new CourseDto(course)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CourseDto> createCourse(@Valid @RequestBody CourseRequest request) {
        try {
            Course course = new Course();
            course.setTitle(request.getTitle());
            course.setDescription(request.getDescription());
            course.setInstructor(request.getInstructor());
            course.setDurationWeeks(request.getDurationWeeks());
            course.setDifficulty(Course.Difficulty.valueOf(request.getDifficulty().toUpperCase()));
            course.setTopics(request.getTopics());
            
            if (request.getStatus() != null) {
                course.setStatus(Course.Status.valueOf(request.getStatus().toUpperCase()));
            }
            
            Course savedCourse = courseService.save(course);
            return ResponseEntity.ok(new CourseDto(savedCourse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequest request) {
        try {
            Course course = courseService.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
            
            course.setTitle(request.getTitle());
            course.setDescription(request.getDescription());
            course.setInstructor(request.getInstructor());
            course.setDurationWeeks(request.getDurationWeeks());
            course.setDifficulty(Course.Difficulty.valueOf(request.getDifficulty().toUpperCase()));
            course.setTopics(request.getTopics());
            
            if (request.getStatus() != null) {
                course.setStatus(Course.Status.valueOf(request.getStatus().toUpperCase()));
            }
            
            Course savedCourse = courseService.save(course);
            return ResponseEntity.ok(new CourseDto(savedCourse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
