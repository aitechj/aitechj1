package com.aiportal.learning.dto;

import com.aiportal.learning.model.UserPreferences;
import java.util.List;

public class UserPreferencesDto {
    private String id;
    private List<String> preferredTopics;
    private String difficultyLevel;
    private boolean emailCourseUpdates;
    private boolean emailLearningReminders;
    private boolean emailChatTips;
    private boolean emailPlatformUpdates;
    private String bio;
    private String createdAt;
    private String updatedAt;
    
    public UserPreferencesDto() {}
    
    public UserPreferencesDto(UserPreferences preferences) {
        this.id = preferences.getId().toString();
        this.preferredTopics = preferences.getPreferredTopics();
        this.difficultyLevel = preferences.getDifficultyLevel().name().toLowerCase();
        this.emailCourseUpdates = preferences.isEmailCourseUpdates();
        this.emailLearningReminders = preferences.isEmailLearningReminders();
        this.emailChatTips = preferences.isEmailChatTips();
        this.emailPlatformUpdates = preferences.isEmailPlatformUpdates();
        this.bio = preferences.getBio();
        this.createdAt = preferences.getCreatedAt().toString();
        this.updatedAt = preferences.getUpdatedAt().toString();
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public List<String> getPreferredTopics() { return preferredTopics; }
    public void setPreferredTopics(List<String> preferredTopics) { this.preferredTopics = preferredTopics; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
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
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
