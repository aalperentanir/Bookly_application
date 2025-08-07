package com.aalperen.bookly.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReadingListRequest {
    private String name;
    private String description;
    private Boolean isPublic;
    private Long userId;
    private List<Long> bookIds;
}
