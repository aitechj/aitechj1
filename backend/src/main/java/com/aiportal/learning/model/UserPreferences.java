package com.aiportal.learning.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_preferences", indexes = {
    @Index(name = "idx_preferences_user_id", columnList = "user_id")
})
@EntityListeners(com.aiportal.learning.audit.AuditEntityListener.class)
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @ElementCollection
    @CollectionTable(name = "user_preferred_topics", joinColumns = @JoinColumn(name = "preferences_id"))
    @Column(name = "topic")
    private List<String> preferredTopics;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DifficultyLevel difficultyLevel = DifficultyLevel.BEGINNER;
    
    @Column(nullable = false)
    private boolean emailCourseUpdates = true;
    
    @Column(nullable = false)
    private boolean emailLearningReminders = true;
    
    @Column(nullable = false)
    private boolean emailChatTips = true;
    
    @Column(nullable = false)
    private boolean emailPlatformUpdates = true;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    public UserPreferences() {}
    
    public UserPreferences(User user) {
        this.user = user;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public List<String> getPreferredTopics() { return preferredTopics; }
    public void setPreferredTopics(List<String> preferredTopics) { this.preferredTopics = preferredTopics; }
    
    public DifficultyLevel getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public boolean isEmailCourseUpdates() { return emailCourseUpdates; }
    public void setEmailCourseUpdates(boolean emailCourseUpdates) { this.emailCourseUpdates = emailCourseUpdates; }
    
    public boolean isEmailLearningReminders() { return emailLearningReminders; }
    public void setEmailLearningReminders(boolean emailLearningReminders) { this.emailLearningReminders = emailLearningReminders; }
    
    public boolean isEmailChatTips() { return emailChatTips; }
    public void setEmailChatTips(boolean emailChatTips) { this.emailChatTips = emailChatTips; }
    
    public boolean isEmailPlatformUpdates() { return emailPlatformUpdates; }
    public void setEmailPlatformUpdates(boolean emailPlatformUpdates) { this.emailPlatformUpdates = emailPlatformUpdates; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
