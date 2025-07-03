package com.aiportal.learning.model;

import jakarta.persistence.*;
import com.aiportal.learning.validation.NoXSS;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "courses", indexes = {
    @Index(name = "idx_course_status", columnList = "status"),
    @Index(name = "idx_course_difficulty", columnList = "difficulty"),
    @Index(name = "idx_course_created_at", columnList = "createdAt")
})
@EntityListeners(com.aiportal.learning.audit.AuditEntityListener.class)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NoXSS
    @Column(nullable = false)
    private String title;
    
    @NoXSS
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NoXSS
    @Column(nullable = false)
    private String instructor;
    
    @Column(nullable = false)
    private Integer durationWeeks;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty = Difficulty.BEGINNER;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.DRAFT;
    
    @ElementCollection
    @CollectionTable(name = "course_topics", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "topic")
    private List<String> topics;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    public Course() {}
    
    public Course(String title, String description, String instructor, Integer durationWeeks, Difficulty difficulty) {
        this.title = title;
        this.description = description;
        this.instructor = instructor;
        this.durationWeeks = durationWeeks;
        this.difficulty = difficulty;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    
    public Integer getDurationWeeks() { return durationWeeks; }
    public void setDurationWeeks(Integer durationWeeks) { this.durationWeeks = durationWeeks; }
    
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
    public List<String> getTopics() { return topics; }
    public void setTopics(List<String> topics) { this.topics = topics; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum Difficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
    
    public enum Status {
        DRAFT, ACTIVE, ARCHIVED
    }
}
