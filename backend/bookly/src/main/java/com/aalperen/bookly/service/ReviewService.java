package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.CreateReviewRequest;
import com.aalperen.bookly.dto.UpdateReviewRequest;
import com.aalperen.bookly.entity.Review;
import com.aalperen.bookly.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {

    Page<Review> getReviewsByBook(Long bookId, Pageable pageable);

    List<Review> getReviewsByUser(Long userId);

    Review createReview(CreateReviewRequest review, Long bookId, User user);

    Review updateReview(Long reviewId, UpdateReviewRequest reviewDetails, User user);

    void deleteReview(Long reviewId,  User user);

    void updateBookAverageRating(Long bookId);

    List<Review> getRecentReviews();
}
