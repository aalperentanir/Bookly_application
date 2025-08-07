package com.aalperen.bookly.controller;

import com.aalperen.bookly.dto.*;
import com.aalperen.bookly.entity.Book;
import com.aalperen.bookly.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "Book API", description = "Book controller")
public class BookController {


    private final BookService bookService;

    @GetMapping("/books")
    @Operation(summary = "Get All Books Request")
    public ResponseEntity<Page<BookResponse>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Book> books = bookService.getAllBooks(pageable);

        Page<BookResponse> dtoPage = books.map(this::mapToBookResponse);
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/books/{id}")
    @Operation(summary = "Get Book By Id Request")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(mapToBookResponse(book));
    }

    @GetMapping("/books/search")
    @Operation(summary = "Search Book Request")
    public ResponseEntity<Page<BookResponse>> searchBooks(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookService.searchBooks(keyword, pageable);

        Page<BookResponse> dtoPage = books.map(this::mapToBookResponse);
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/books/author/{authorId}")
    @Operation(summary = "Get Book By Author Request")
    public ResponseEntity<List<BookResponse>> getBooksByAuthor(@PathVariable Long authorId) {
        List<Book> books = bookService.getBooksByAuthor(authorId);
        List<BookResponse> responses = books.stream().map(this::mapToBookResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/books/category/{categoryId}")
    @Operation(summary = "Get Book By Category Request")
    public ResponseEntity<Page<BookResponse>> getBooksByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookService.getBooksByCategory(categoryId, pageable);

        Page<BookResponse> dtoPage = books.map(this::mapToBookResponse);
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/books/top-rated")
    @Operation(summary = "Get Top Rated Books Request")
    public ResponseEntity<List<BookResponse>> getTopRatedBooks(
            @RequestParam(defaultValue = "4.0") Double minRating,
            @RequestParam(defaultValue = "10") int limit) {

        Pageable pageable = PageRequest.of(0, limit);
        List<Book> books = bookService.getTopRatedBooks(minRating, pageable);

        List<BookResponse> responses = books.stream().map(this::mapToBookResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/books/most-reviewed")
    @Operation(summary = "Get Most Reviewed Books Request")
    public ResponseEntity<List<BookResponse>> getMostReviewedBooks(
            @RequestParam(defaultValue = "10") int limit) {

        Pageable pageable = PageRequest.of(0, limit);
        List<Book> books = bookService.getMostReviewedBooks(pageable);

        List<BookResponse> responses = books.stream().map(this::mapToBookResponse).toList();
        return ResponseEntity.ok(responses);
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

