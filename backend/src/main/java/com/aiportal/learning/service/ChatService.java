package com.aiportal.learning.service;

import com.aiportal.learning.model.ChatMessage;
import com.aiportal.learning.model.User;
import com.aiportal.learning.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    public List<ChatMessage> getChatHistory(Long userId) {
        return chatMessageRepository.findTop10ByUserIdOrderByTimestampDesc(userId);
    }
    
    public ChatMessage sendMessage(User user, String userMessage) {
        String aiResponse = generateAIResponse(userMessage);
        int tokenCount = calculateTokenCount(userMessage, aiResponse);
        
        ChatMessage chatMessage = new ChatMessage(user, userMessage, aiResponse, tokenCount);
        return chatMessageRepository.save(chatMessage);
    }
    
    public Long getChatUsageCount(Long userId) {
        return chatMessageRepository.countByUserId(userId);
    }
    
    public Long getRecentChatUsageCount(Long userId, LocalDateTime since) {
        return chatMessageRepository.countByUserIdAndTimestampAfter(userId, since);
    }
    
    public Long getTotalChatQueries() {
        return chatMessageRepository.count();
    }
    
    private String generateAIResponse(String userMessage) {
        return "This is a simulated AI response to: " + userMessage + ". In a real implementation, this would integrate with an AI service like OpenAI GPT.";
    }
    
    private int calculateTokenCount(String userMessage, String aiResponse) {
        return (userMessage.length() + aiResponse.length()) / 4;
    }
}
