package com.aiportal.learning.dto;

public class DashboardStatsDto {
    private Long enrolledCourses;
    private Long completedCourses;
    private Long aiChatQueries;
    private Integer learningStreak;
    
    public DashboardStatsDto() {}
    
    public DashboardStatsDto(Long enrolledCourses, Long completedCourses, Long aiChatQueries, Integer learningStreak) {
        this.enrolledCourses = enrolledCourses;
        this.completedCourses = completedCourses;
        this.aiChatQueries = aiChatQueries;
        this.learningStreak = learningStreak;
    }
    
    public Long getEnrolledCourses() { return enrolledCourses; }
    public void setEnrolledCourses(Long enrolledCourses) { this.enrolledCourses = enrolledCourses; }
    
    public Long getCompletedCourses() { return completedCourses; }
    public void setCompletedCourses(Long completedCourses) { this.completedCourses = completedCourses; }
    
    public Long getAiChatQueries() { return aiChatQueries; }
    public void setAiChatQueries(Long aiChatQueries) { this.aiChatQueries = aiChatQueries; }
    
    public Integer getLearningStreak() { return learningStreak; }
    public void setLearningStreak(Integer learningStreak) { this.learningStreak = learningStreak; }
}
