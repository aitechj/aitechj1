package com.aiportal.learning.controller;

import com.aiportal.learning.dto.SubscriberRequest;
import com.aiportal.learning.dto.SubscriberResponse;
import com.aiportal.learning.model.Subscriber;
import com.aiportal.learning.service.SubscriberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subscribers")
public class SubscriberController {
    
    @Autowired
    private SubscriberService subscriberService;
    
    @GetMapping
    public ResponseEntity<List<SubscriberResponse>> getAllSubscribers() {
        List<Subscriber> subscribers = subscriberService.findAll();
        List<SubscriberResponse> response = subscribers.stream()
            .map(SubscriberResponse::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SubscriberResponse> getSubscriberById(@PathVariable Long id) {
        return subscriberService.findById(id)
            .map(subscriber -> ResponseEntity.ok(new SubscriberResponse(subscriber)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<SubscriberResponse> createSubscriber(@Valid @RequestBody SubscriberRequest request) {
        try {
            if (subscriberService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest().build();
            }
            
            Subscriber subscriber = new Subscriber();
            subscriber.setEmail(request.getEmail());
            subscriber.setFirstName(request.getFirstName());
            subscriber.setLastName(request.getLastName());
            subscriber.setSubscriptionType(request.getSubscriptionType());
            
            Subscriber savedSubscriber = subscriberService.save(subscriber);
            return ResponseEntity.ok(new SubscriberResponse(savedSubscriber));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SubscriberResponse> updateSubscriber(@PathVariable Long id, @Valid @RequestBody SubscriberRequest request) {
        try {
            Subscriber subscriberDetails = new Subscriber();
            subscriberDetails.setEmail(request.getEmail());
            subscriberDetails.setFirstName(request.getFirstName());
            subscriberDetails.setLastName(request.getLastName());
            subscriberDetails.setSubscriptionType(request.getSubscriptionType());
            
            Subscriber updatedSubscriber = subscriberService.update(id, subscriberDetails);
            return ResponseEntity.ok(new SubscriberResponse(updatedSubscriber));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscriber(@PathVariable Long id) {
        try {
            subscriberService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
