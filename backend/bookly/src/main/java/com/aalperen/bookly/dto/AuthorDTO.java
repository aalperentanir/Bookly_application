package com.aalperen.bookly.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorDTO {


    private Long id;

    private String name;

    private String biography;

    private LocalDate birthDate;

    private LocalDate deathDate;

    private String nationality;

    private String profileImageUrl;
}
