package com.aiportal.learning.service;

import com.aiportal.learning.model.UserPreferences;
import com.aiportal.learning.model.User;
import com.aiportal.learning.repository.UserPreferencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserPreferencesService {
    
    @Autowired
    private UserPreferencesRepository userPreferencesRepository;
    
    public Optional<UserPreferences> findByUserId(Long userId) {
        return userPreferencesRepository.findByUserId(userId);
    }
    
    public UserPreferences getOrCreateUserPreferences(User user) {
        return userPreferencesRepository.findByUserId(user.getId())
            .orElseGet(() -> {
                UserPreferences preferences = new UserPreferences(user);
                return userPreferencesRepository.save(preferences);
            });
    }
    
    public UserPreferences save(UserPreferences preferences) {
        return userPreferencesRepository.save(preferences);
    }
    
    public UserPreferences updateUserPreferences(User user, UserPreferences.DifficultyLevel difficultyLevel, 
                                                java.util.List<String> preferredTopics, String bio,
                                                boolean emailCourseUpdates, boolean emailLearningReminders,
                                                boolean emailChatTips, boolean emailPlatformUpdates) {
        UserPreferences preferences = getOrCreateUserPreferences(user);
        preferences.setDifficultyLevel(difficultyLevel);
        preferences.setPreferredTopics(preferredTopics);
        preferences.setBio(bio);
        preferences.setEmailCourseUpdates(emailCourseUpdates);
        preferences.setEmailLearningReminders(emailLearningReminders);
        preferences.setEmailChatTips(emailChatTips);
        preferences.setEmailPlatformUpdates(emailPlatformUpdates);
        return userPreferencesRepository.save(preferences);
    }
}
