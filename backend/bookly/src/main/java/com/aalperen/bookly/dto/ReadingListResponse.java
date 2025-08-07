package com.aalperen.bookly.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReadingListResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private Long userId;
    private String userName;
    private List<BookSummary> books;
}
