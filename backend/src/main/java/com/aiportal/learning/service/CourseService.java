package com.aiportal.learning.service;

import com.aiportal.learning.model.Course;
import com.aiportal.learning.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    public List<Course> findAll() {
        return courseRepository.findAll();
    }
    
    public List<Course> findActiveCourses() {
        return courseRepository.findByStatusOrderByCreatedAtDesc(Course.Status.ACTIVE);
    }
    
    public List<Course> findByDifficulty(Course.Difficulty difficulty) {
        return courseRepository.findByDifficulty(difficulty);
    }
    
    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }
    
    public Course save(Course course) {
        return courseRepository.save(course);
    }
    
    public void deleteById(Long id) {
        courseRepository.deleteById(id);
    }
    
    public long countActiveCourses() {
        return courseRepository.findByStatus(Course.Status.ACTIVE).size();
    }
}
