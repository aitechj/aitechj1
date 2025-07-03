package com.aiportal.learning.dto;

import com.aiportal.learning.model.ChatMessage;

public class ChatMessageDto {
    private String id;
    private String userMessage;
    private String aiResponse;
    private String timestamp;
    private Integer tokenCount;
    
    public ChatMessageDto() {}
    
    public ChatMessageDto(ChatMessage chatMessage) {
        this.id = chatMessage.getId().toString();
        this.userMessage = chatMessage.getUserMessage();
        this.aiResponse = chatMessage.getAiResponse();
        this.timestamp = chatMessage.getTimestamp().toString();
        this.tokenCount = chatMessage.getTokenCount();
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserMessage() { return userMessage; }
    public void setUserMessage(String userMessage) { this.userMessage = userMessage; }
    
    public String getAiResponse() { return aiResponse; }
    public void setAiResponse(String aiResponse) { this.aiResponse = aiResponse; }
    
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    
    public Integer getTokenCount() { return tokenCount; }
    public void setTokenCount(Integer tokenCount) { this.tokenCount = tokenCount; }
}
