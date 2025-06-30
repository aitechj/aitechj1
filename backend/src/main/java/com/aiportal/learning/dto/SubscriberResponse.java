package com.aiportal.learning.dto;

import com.aiportal.learning.model.Subscriber;

public class SubscriberResponse {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String subscriptionType;
    private String createdAt;
    private String updatedAt;
    
    public SubscriberResponse() {}
    
    public SubscriberResponse(Subscriber subscriber) {
        this.id = subscriber.getId().toString();
        this.email = subscriber.getEmail();
        this.firstName = subscriber.getFirstName();
        this.lastName = subscriber.getLastName();
        this.subscriptionType = subscriber.getSubscriptionType();
        this.createdAt = subscriber.getCreatedAt().toString();
        this.updatedAt = subscriber.getUpdatedAt().toString();
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getSubscriptionType() { return subscriptionType; }
    public void setSubscriptionType(String subscriptionType) { this.subscriptionType = subscriptionType; }
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
