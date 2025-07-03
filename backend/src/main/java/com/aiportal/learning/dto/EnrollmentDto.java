package com.aiportal.learning.dto;

import com.aiportal.learning.model.Enrollment;

public class EnrollmentDto {
    private String id;
    private CourseDto course;
    private Integer progressPercentage;
    private String status;
    private String enrolledAt;
    private String completedAt;
    private String updatedAt;
    
    public EnrollmentDto() {}
    
    public EnrollmentDto(Enrollment enrollment) {
        this.id = enrollment.getId().toString();
        this.course = new CourseDto(enrollment.getCourse());
        this.progressPercentage = enrollment.getProgressPercentage();
        this.status = enrollment.getStatus().name().toLowerCase();
        this.enrolledAt = enrollment.getEnrolledAt().toString();
        this.completedAt = enrollment.getCompletedAt() != null ? enrollment.getCompletedAt().toString() : null;
        this.updatedAt = enrollment.getUpdatedAt().toString();
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public CourseDto getCourse() { return course; }
    public void setCourse(CourseDto course) { this.course = course; }
    
    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(String enrolledAt) { this.enrolledAt = enrolledAt; }
    
    public String getCompletedAt() { return completedAt; }
    public void setCompletedAt(String completedAt) { this.completedAt = completedAt; }
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
