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
    
    @Value("${app_admin_password:Techjadmin@1234!@#$}")
    private String adminPassword;
    
    @Override
    public void run(String... args) throws Exception {
        var existingAdminOpt = userRepository.findByEmail(adminEmail);
        
        if (existingAdminOpt.isEmpty()) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setRole(User.Role.ADMIN);
            admin.setSubscription(User.Subscription.ENTERPRISE);
            admin.setDeletable(false);
            
            userRepository.save(admin);
            System.out.println("Admin user created: " + adminEmail);
        } else {
            User existingAdmin = existingAdminOpt.get();
            String encodedPassword = passwordEncoder.encode(adminPassword);
            if (!passwordEncoder.matches(adminPassword, existingAdmin.getPassword())) {
                existingAdmin.setPassword(encodedPassword);
                existingAdmin.setRole(User.Role.ADMIN);
                existingAdmin.setSubscription(User.Subscription.ENTERPRISE);
                existingAdmin.setDeletable(false);
                userRepository.save(existingAdmin);
                System.out.println("Admin user password updated: " + adminEmail);
            } else {
                System.out.println("Admin user already exists with correct password: " + adminEmail);
            }
        }
    }
}
