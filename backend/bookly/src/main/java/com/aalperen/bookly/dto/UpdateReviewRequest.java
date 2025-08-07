package com.aalperen.bookly.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateReviewRequest {

    private Integer rating;

    private String comment;

    private LocalDateTime updatedAt = LocalDateTime.now();
}
