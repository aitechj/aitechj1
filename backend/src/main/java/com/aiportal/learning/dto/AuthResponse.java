package com.aiportal.learning.dto;

import com.aiportal.learning.model.User;

public class AuthResponse {
    private String token;
    private UserDto user;
    
    public AuthResponse() {}
    
    public AuthResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
    
    public static class UserDto {
        private String id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;
        private String subscription;
        
        public UserDto() {}
        
        public UserDto(User user) {
            this.id = user.getId().toString();
            this.email = user.getEmail();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.role = user.getRole().name().toLowerCase();
            this.subscription = user.getSubscription().name().toLowerCase();
        }
        
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        
        public String getSubscription() { return subscription; }
        public void setSubscription(String subscription) { this.subscription = subscription; }
    }
}
