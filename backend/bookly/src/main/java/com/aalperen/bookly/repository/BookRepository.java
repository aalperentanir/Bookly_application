package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    Optional<Book> findByIsbn(String isbn);


    @Query("SELECT b FROM Book b JOIN b.authors a WHERE a.id = :authorId")
    List<Book> findBooksByAuthorId(@Param("authorId") Long authorId);

    @Query("SELECT b FROM Book b JOIN b.categories c WHERE c.id = :categoryId")
    Page<Book> findBooksByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    List<Book> findByPublisherId(Long publisherId);

    @Query("SELECT b FROM Book b WHERE b.averageRating >= :minRating ORDER BY b.averageRating DESC")
    List<Book> findTopRatedBooks(@Param("minRating") Double minRating,Pageable pageable);

    @Query("SELECT b FROM Book b ORDER BY b.ratingCount DESC")
    List<Book> findMostReviewedBooks(Pageable pageable);


    @Query("SELECT DISTINCT b FROM Book b LEFT JOIN b.authors a WHERE " +
            "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(b.summary) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Book> searchBooks(@Param("keyword")String keyword, Pageable pageable);


    @Query("SELECT b FROM Book b WHERE YEAR(b.publicationDate) BETWEEN :startYear AND :endYear")
    List<Book> findBooksByYearRage(@Param("startDate") Integer startDate, @Param("endDate") Integer endDate);
}
