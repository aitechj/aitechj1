package com.aiportal.learning.service;

import com.aiportal.learning.dto.DashboardStatsDto;
import com.aiportal.learning.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class DashboardService {
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @Autowired
    private ChatService chatService;
    
    public DashboardStatsDto getUserDashboardStats(User user) {
        Long enrolledCourses = enrollmentService.countEnrollmentsByUserId(user.getId());
        Long completedCourses = enrollmentService.countCompletedCoursesByUserId(user.getId());
        Long aiChatQueries = chatService.getChatUsageCount(user.getId());
        Integer learningStreak = calculateLearningStreak(user.getId());
        
        return new DashboardStatsDto(enrolledCourses, completedCourses, aiChatQueries, learningStreak);
    }
    
    private Integer calculateLearningStreak(Long userId) {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        Long recentActivity = chatService.getRecentChatUsageCount(userId, thirtyDaysAgo);
        return recentActivity.intValue();
    }
}
