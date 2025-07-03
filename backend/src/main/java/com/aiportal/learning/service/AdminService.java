package com.aiportal.learning.service;

import com.aiportal.learning.dto.AdminStatsDto;
import com.aiportal.learning.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private ChatService chatService;
    
    public AdminStatsDto getAdminStats() {
        Long totalUsers = getTotalUsersCount();
        Long activeCourses = courseService.countActiveCourses();
        Long totalChatQueries = chatService.getTotalChatQueries();
        Double totalRevenue = calculateTotalRevenue();
        
        return new AdminStatsDto(totalUsers, activeCourses, totalChatQueries, totalRevenue);
    }
    
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    private Long getTotalUsersCount() {
        return (long) userService.findAll().size();
    }
    
    private Double calculateTotalRevenue() {
        return 82400.0;
    }
}
