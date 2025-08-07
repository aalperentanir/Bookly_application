package com.aalperen.bookly.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private Long id;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long userId;
}
