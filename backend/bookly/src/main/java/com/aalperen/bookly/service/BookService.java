package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.CreateBookRequest;
import com.aalperen.bookly.dto.UpdateBookRequest;
import com.aalperen.bookly.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {

    Page<Book> getAllBooks(Pageable pageable);

    Book getBookById(Long id);

    Book createBook(CreateBookRequest request);

    Book updateBook(Long id, UpdateBookRequest bookDetails);

    void deleteBook(Long id);

    List<Book> searchBooksByTitle(String title);

    Page<Book> searchBooks(String keyword, Pageable pageable);

    List<Book> getBooksByAuthor(Long authorId);

    Page<Book> getBooksByCategory(Long categoryId, Pageable pageable);

    List<Book> getTopRatedBooks(Double minRating, Pageable pageable);

    List<Book> getMostReviewedBooks(Pageable pageable);

    void updateBookRating(Long bookId, Double averageRating, Integer ratingCount);


}
