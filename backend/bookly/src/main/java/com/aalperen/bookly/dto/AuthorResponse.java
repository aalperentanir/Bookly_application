package com.aalperen.bookly.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AuthorResponse {
    private Long id;
    private String name;
    private String biography;
    private LocalDate birthDate;
    private LocalDate deathDate;
    private String nationality;
    private String profileImageUrl;
}

