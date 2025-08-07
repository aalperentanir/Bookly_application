package com.aalperen.bookly.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBookRequest {
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
