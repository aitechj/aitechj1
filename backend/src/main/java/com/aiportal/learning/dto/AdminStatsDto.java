package com.aiportal.learning.dto;

public class AdminStatsDto {
    private Long totalUsers;
    private Long activeCourses;
    private Long totalChatQueries;
    private Double totalRevenue;
    
    public AdminStatsDto() {}
    
    public AdminStatsDto(Long totalUsers, Long activeCourses, Long totalChatQueries, Double totalRevenue) {
        this.totalUsers = totalUsers;
        this.activeCourses = activeCourses;
        this.totalChatQueries = totalChatQueries;
        this.totalRevenue = totalRevenue;
    }
    
    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    
    public Long getActiveCourses() { return activeCourses; }
    public void setActiveCourses(Long activeCourses) { this.activeCourses = activeCourses; }
    
    public Long getTotalChatQueries() { return totalChatQueries; }
    public void setTotalChatQueries(Long totalChatQueries) { this.totalChatQueries = totalChatQueries; }
    
    public Double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(Double totalRevenue) { this.totalRevenue = totalRevenue; }
}
