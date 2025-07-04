package com.aiportal.learning.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class PaginationRequest {
    @Min(value = 0, message = "Page number must be non-negative")
    private int page = 0;
    
    @Min(value = 1, message = "Page size must be at least 1")
    @Max(value = 100, message = "Page size must not exceed 100")
    private int size = 10;
    
    public PaginationRequest() {}
    
    public PaginationRequest(int page, int size) {
        this.page = page;
        this.size = size;
    }
    
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    
    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }
}
