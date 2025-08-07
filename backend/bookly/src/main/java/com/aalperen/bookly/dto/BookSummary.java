package com.aalperen.bookly.dto;

import com.aalperen.bookly.entity.Author;
import lombok.Data;

import java.util.Set;

@Data
public class BookSummary {
    private Long id;
    private String title;
    private String coverImageUrl;
    private Set<Author> authors;
}