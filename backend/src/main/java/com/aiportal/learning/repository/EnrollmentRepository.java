package com.aiportal.learning.repository;

import com.aiportal.learning.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findByUserIdAndStatus(Long userId, Enrollment.Status status);
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
    
    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.user.id = :userId AND e.status = 'COMPLETED'")
    Long countCompletedCoursesByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.user.id = :userId")
    Long countEnrollmentsByUserId(@Param("userId") Long userId);
}
