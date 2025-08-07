package com.aalperen.bookly.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CreateBookRequest {

    private String title;
    private String summary;
    private LocalDate publicationDate;
    private String isbn;
    private Integer pageCount;
    private String coverImageUrl;
    private Double averageRating;
    private Integer ratingCount;
    private Set<Long> authorIds;
    private List<Long> reviewIds;
    private Set<Long> categoryIds;
    private Long publisherId;
}
