package com.aiportal.learning;

import com.aiportal.learning.model.User;
import com.aiportal.learning.repository.UserRepository;
import com.aiportal.learning.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class AdminDeletionProtectionTest {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testAdminUserCannotBeDeleted() {
        User admin = userRepository.findByEmail("isha.bahati@hotmail.com").orElse(null);
        assertNotNull(admin, "Admin user should exist");
        assertFalse(admin.isDeletable(), "Admin user should not be deletable");
        assertEquals(User.Role.ADMIN, admin.getRole(), "Admin should have ADMIN role");
        assertEquals(User.Subscription.ENTERPRISE, admin.getSubscription(), "Admin should have ENTERPRISE subscription");
        
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            userService.deleteById(admin.getId());
        });
        
        assertTrue(exception.getMessage().contains("Cannot delete protected user"), 
                   "Exception should mention protected user");
    }
}
