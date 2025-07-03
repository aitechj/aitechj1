package com.aiportal.learning.dto;

import com.aiportal.learning.validation.NoXSS;
import jakarta.validation.constraints.NotBlank;

public class ChatMessageRequest {
    @NotBlank(message = "Message is required")
    @NoXSS
    private String message;
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
