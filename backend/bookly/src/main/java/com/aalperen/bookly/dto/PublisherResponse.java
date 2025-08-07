package com.aalperen.bookly.dto;
import lombok.Data;

@Data
public class PublisherResponse {

    private Long id;

    private String name;

    private String description;

    private Integer foundedYear;
}
