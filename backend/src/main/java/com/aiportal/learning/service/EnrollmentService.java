package com.aiportal.learning.service;

import com.aiportal.learning.model.Enrollment;
import com.aiportal.learning.model.User;
import com.aiportal.learning.model.Course;
import com.aiportal.learning.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    public List<Enrollment> findByUserId(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }
    
    public List<Enrollment> findActiveEnrollmentsByUserId(Long userId) {
        return enrollmentRepository.findByUserIdAndStatus(userId, Enrollment.Status.IN_PROGRESS);
    }
    
    public Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
    }
    
    public boolean isUserEnrolledInCourse(Long userId, Long courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }
    
    public Enrollment enrollUser(User user, Course course) {
        if (isUserEnrolledInCourse(user.getId(), course.getId())) {
            throw new RuntimeException("User is already enrolled in this course");
        }
        
        Enrollment enrollment = new Enrollment(user, course);
        return enrollmentRepository.save(enrollment);
    }
    
    public Enrollment updateProgress(Long enrollmentId, Integer progressPercentage) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
            .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
        enrollment.setProgressPercentage(progressPercentage);
        return enrollmentRepository.save(enrollment);
    }
    
    public Long countEnrollmentsByUserId(Long userId) {
        return enrollmentRepository.countEnrollmentsByUserId(userId);
    }
    
    public Long countCompletedCoursesByUserId(Long userId) {
        return enrollmentRepository.countCompletedCoursesByUserId(userId);
    }
}
