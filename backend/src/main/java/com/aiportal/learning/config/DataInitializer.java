package com.aiportal.learning.config;

import com.aiportal.learning.model.User;
import com.aiportal.learning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    private String adminEmail = "isha.bahati@hotmail.com";
    
    @Value("${app_admin_password:admin123}")
    private String adminPassword;
    
    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setRole(User.Role.ADMIN);
            admin.setSubscription(User.Subscription.ENTERPRISE);
            
            userRepository.save(admin);
            System.out.println("Admin user created: " + adminEmail);
        }
    }
}
