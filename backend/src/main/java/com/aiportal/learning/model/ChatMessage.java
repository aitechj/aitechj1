package com.aiportal.learning.model;

import jakarta.persistence.*;
import com.aiportal.learning.validation.NoXSS;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages", indexes = {
    @Index(name = "idx_chat_user_id", columnList = "user_id"),
    @Index(name = "idx_chat_timestamp", columnList = "timestamp"),
    @Index(name = "idx_chat_user_timestamp", columnList = "user_id, timestamp")
})
@EntityListeners(com.aiportal.learning.audit.AuditEntityListener.class)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NoXSS
    @Column(columnDefinition = "TEXT", nullable = false)
    private String userMessage;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String aiResponse;
    
    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
    
    @Column(nullable = false)
    private Integer tokenCount = 0;
    
    public ChatMessage() {}
    
    public ChatMessage(User user, String userMessage, String aiResponse, Integer tokenCount) {
        this.user = user;
        this.userMessage = userMessage;
        this.aiResponse = aiResponse;
        this.tokenCount = tokenCount;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getUserMessage() { return userMessage; }
    public void setUserMessage(String userMessage) { this.userMessage = userMessage; }
    
    public String getAiResponse() { return aiResponse; }
    public void setAiResponse(String aiResponse) { this.aiResponse = aiResponse; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public Integer getTokenCount() { return tokenCount; }
    public void setTokenCount(Integer tokenCount) { this.tokenCount = tokenCount; }
}
