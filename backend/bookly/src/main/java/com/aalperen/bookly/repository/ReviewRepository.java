package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByBookIdOrderByCreatedAtDesc(Long bookId, Pageable pageable);


    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<Review> findByUserIdAndBookId(Long userId, Long bookId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.book.id = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") Long bookId);


    @Query("SELECT COUNT(r) FROM Review r WHERE r.book.id = :bookId")
    Long countReviewsByBookId(@Param("bookId") Long bookId);

    List<Review> findByRatingBetween(Integer minRating, Integer maxRating);

    List<Review> findTop10ByOrderByCreatedAtDesc();




}
