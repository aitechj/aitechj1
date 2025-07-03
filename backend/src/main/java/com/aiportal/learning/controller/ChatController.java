package com.aiportal.learning.controller;

import com.aiportal.learning.dto.ChatMessageDto;
import com.aiportal.learning.dto.ChatMessageRequest;
import com.aiportal.learning.model.ChatMessage;
import com.aiportal.learning.model.User;
import com.aiportal.learning.service.ChatService;
import com.aiportal.learning.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/message")
    public ResponseEntity<ChatMessageDto> sendMessage(@Valid @RequestBody ChatMessageRequest request,
                                                     Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            ChatMessage chatMessage = chatService.sendMessage(user, request.getMessage());
            return ResponseEntity.ok(new ChatMessageDto(chatMessage));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/history")
    public ResponseEntity<List<ChatMessageDto>> getChatHistory(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<ChatMessage> chatHistory = chatService.getChatHistory(user.getId());
        List<ChatMessageDto> chatMessageDtos = chatHistory.stream()
            .map(ChatMessageDto::new)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(chatMessageDtos);
    }
    
    @GetMapping("/usage")
    public ResponseEntity<Long> getChatUsage(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Long usageCount = chatService.getChatUsageCount(user.getId());
        return ResponseEntity.ok(usageCount);
    }
}
