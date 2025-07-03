package com.aiportal.learning.dto;

import com.aiportal.learning.model.Course;
import java.time.LocalDateTime;
import java.util.List;

public class CourseDto {
    private String id;
    private String title;
    private String description;
    private String instructor;
    private Integer durationWeeks;
    private String difficulty;
    private String status;
    private List<String> topics;
    private String createdAt;
    private String updatedAt;
    
    public CourseDto() {}
    
    public CourseDto(Course course) {
        this.id = course.getId().toString();
        this.title = course.getTitle();
        this.description = course.getDescription();
        this.instructor = course.getInstructor();
        this.durationWeeks = course.getDurationWeeks();
        this.difficulty = course.getDifficulty().name().toLowerCase();
        this.status = course.getStatus().name().toLowerCase();
        this.topics = course.getTopics();
        this.createdAt = course.getCreatedAt().toString();
        this.updatedAt = course.getUpdatedAt().toString();
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    
    public Integer getDurationWeeks() { return durationWeeks; }
    public void setDurationWeeks(Integer durationWeeks) { this.durationWeeks = durationWeeks; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public List<String> getTopics() { return topics; }
    public void setTopics(List<String> topics) { this.topics = topics; }
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
