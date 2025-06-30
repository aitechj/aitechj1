package com.aiportal.learning.service;

import com.aiportal.learning.model.Subscriber;
import com.aiportal.learning.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriberService {
    
    @Autowired
    private SubscriberRepository subscriberRepository;
    
    public List<Subscriber> findAll() {
        return subscriberRepository.findAll();
    }
    
    public Optional<Subscriber> findById(Long id) {
        return subscriberRepository.findById(id);
    }
    
    public Optional<Subscriber> findByEmail(String email) {
        return subscriberRepository.findByEmail(email);
    }
    
    public boolean existsByEmail(String email) {
        return subscriberRepository.existsByEmail(email);
    }
    
    public Subscriber save(Subscriber subscriber) {
        return subscriberRepository.save(subscriber);
    }
    
    public Subscriber update(Long id, Subscriber subscriberDetails) {
        Subscriber subscriber = subscriberRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Subscriber not found with id: " + id));
        
        subscriber.setEmail(subscriberDetails.getEmail());
        subscriber.setFirstName(subscriberDetails.getFirstName());
        subscriber.setLastName(subscriberDetails.getLastName());
        subscriber.setSubscriptionType(subscriberDetails.getSubscriptionType());
        
        return subscriberRepository.save(subscriber);
    }
    
    public void deleteById(Long id) {
        subscriberRepository.deleteById(id);
    }
}
