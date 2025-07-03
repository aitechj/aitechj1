package com.aiportal.learning.repository;

import com.aiportal.learning.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByUserIdOrderByTimestampDesc(Long userId);
    List<ChatMessage> findTop10ByUserIdOrderByTimestampDesc(Long userId);
    
    @Query("SELECT COUNT(c) FROM ChatMessage c WHERE c.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM ChatMessage c WHERE c.user.id = :userId AND c.timestamp >= :since")
    Long countByUserIdAndTimestampAfter(@Param("userId") Long userId, @Param("since") LocalDateTime since);
}
