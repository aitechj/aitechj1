package com.aiportal.learning.config;

import com.aiportal.learning.service.AuditLogService;
import org.hibernate.resource.jdbc.spi.StatementInspector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QueryPerformanceInterceptor implements StatementInspector {
    
    @Autowired
    private AuditLogService auditLogService;
    
    private static final long SLOW_QUERY_THRESHOLD = 1000;
    
    @Override
    public String inspect(String sql) {
        long startTime = System.currentTimeMillis();
        
        Thread.currentThread().setName("SQL-" + startTime);
        
        new Thread(() -> {
            try {
                Thread.sleep(SLOW_QUERY_THRESHOLD);
                long currentTime = System.currentTimeMillis();
                if (Thread.currentThread().getName().startsWith("SQL-" + startTime)) {
                    long executionTime = currentTime - startTime;
                    auditLogService.logSlowQuery(sql, executionTime);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
        
        return sql;
    }
}
