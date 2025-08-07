package com.aalperen.bookly.dto;

import com.aalperen.bookly.entity.Author;
import com.aalperen.bookly.entity.Category;
import com.aalperen.bookly.entity.Publisher;
import com.aalperen.bookly.entity.Review;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1695983934255050823L;

    private Long id;

    private String title;

    private String summary;

    private LocalDate publicationDate;

    private String isbn;

    private Integer pageCount;

    private String coverImageUrl;

    private Double averageRating = 0.0;

    private Integer ratingCount = 0;


    private Set<AuthorDTO> authors;


    private Set<CategoryDTO> categories;


    private List<ReviewDTO> reviews;

    private PublisherDTO publisher;
}
