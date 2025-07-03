package com.aiportal.learning.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class UserPreferencesRequest {
    private List<String> preferredTopics;
    
    @NotBlank(message = "Difficulty level is required")
    private String difficultyLevel;
    
    private boolean emailCourseUpdates;
    private boolean emailLearningReminders;
    private boolean emailChatTips;
    private boolean emailPlatformUpdates;
    private String bio;
    
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
}
