package com.aiportal.learning.repository;

import com.aiportal.learning.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByStatus(Course.Status status);
    List<Course> findByDifficulty(Course.Difficulty difficulty);
    List<Course> findByStatusAndDifficulty(Course.Status status, Course.Difficulty difficulty);
    List<Course> findByStatusOrderByCreatedAtDesc(Course.Status status);
}
