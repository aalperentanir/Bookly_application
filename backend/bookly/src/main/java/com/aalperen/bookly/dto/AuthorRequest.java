package com.aalperen.bookly.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorRequest {

    private String name;

    private String biography;

    private LocalDate birthDate;

    private LocalDate deathDate;

    private String nationality;

    private String profileImageUrl;
}
