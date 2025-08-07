package com.aalperen.bookly.dto;

import lombok.Data;

@Data
public class PublisherRequest {

    private String name;

    private String description;

    private Integer foundedYear;
}
