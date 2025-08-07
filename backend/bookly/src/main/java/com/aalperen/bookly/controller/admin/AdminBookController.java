package com.aalperen.bookly.controller.admin;

import com.aalperen.bookly.dto.*;
import com.aalperen.bookly.entity.Book;
import com.aalperen.bookly.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Book API",description = "Book controller for Admin")
public class AdminBookController {

    private final BookService bookService;

    @PostMapping("/books")
    @Operation(summary = "Create Book Request", description = "Only admin role can create new book")
    public ResponseEntity<BookResponse> createBook(@RequestBody CreateBookRequest request) {
        Book createdBook = bookService.createBook(request);
        return ResponseEntity.ok(mapToBookResponse(createdBook));
    }

    @PutMapping("/books/{id}")
    @Operation(summary = "Update Book Request", description = "Only admin role can update book")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long id, @RequestBody UpdateBookRequest req) {
        Book updatedBook = bookService.updateBook(id, req);
        return ResponseEntity.ok(mapToBookResponse(updatedBook));

    }

    @DeleteMapping("/books/{id}")
    @Operation(summary = "Delete Book Request", description = "Only admin role can delete book")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    private BookResponse mapToBookResponse(Book book) {

        BookResponse response = new BookResponse();

        response.setId(book.getId());
        response.setTitle(book.getTitle());
        response.setSummary(book.getSummary());
        response.setPublicationDate(book.getPublicationDate());
        response.setIsbn(book.getIsbn());
        response.setPageCount(book.getPageCount());
        response.setCoverImageUrl(book.getCoverImageUrl());
        response.setAverageRating(book.getAverageRating());
        response.setRatingCount(book.getRatingCount());

        response.setAuthors(book.getAuthors().stream()
                .map(author -> {
                    AuthorDTO dto = new AuthorDTO();
                    dto.setId(author.getId());
                    dto.setName(author.getName());
                    dto.setBiography(author.getBiography());
                    dto.setBirthDate(author.getBirthDate());
                    dto.setDeathDate(author.getDeathDate());
                    dto.setNationality(author.getNationality());
                    dto.setProfileImageUrl(author.getProfileImageUrl());
                    return dto;
                }).collect(Collectors.toSet()));


        response.setCategories(
                book.getCategories().stream().map(category -> {
                    CategoryDTO dto = new CategoryDTO();
                    dto.setId(category.getId());
                    dto.setName(category.getName());
                    dto.setDescription(category.getDescription());
                    return dto;
                }).collect(Collectors.toSet())
        );

        response.setReviews(
                book.getReviews().stream().map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setId(review.getId());
                    dto.setRating(review.getRating());
                    dto.setComment(review.getComment());
                    dto.setCreatedAt(review.getCreatedAt());
                    dto.setUpdatedAt(review.getUpdatedAt());
                    dto.setUserId(review.getUser().getId());
                    return dto;
                }).collect(Collectors.toList())
        );

        if (book.getPublisher() != null) {
            PublisherDTO publisherDTO = new PublisherDTO();
            publisherDTO.setId(book.getPublisher().getId());
            publisherDTO.setName(book.getPublisher().getName());
            publisherDTO.setDescription(book.getPublisher().getDescription());
            publisherDTO.setFoundedYear(book.getPublisher().getFoundedYear());
            response.setPublisher(publisherDTO);
        }

        return response;

    }
}
