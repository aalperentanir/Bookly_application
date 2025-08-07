package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.CreateReviewRequest;
import com.aalperen.bookly.dto.UpdateReviewRequest;
import com.aalperen.bookly.entity.Book;
import com.aalperen.bookly.entity.Review;
import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import com.aalperen.bookly.repository.BookRepository;
import com.aalperen.bookly.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImp implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final BookService bookService;

    @Override
    @Transactional(readOnly = true)
    public Page<Review> getReviewsByBook(Long bookId, Pageable pageable) {
        return reviewRepository.findByBookIdOrderByCreatedAtDesc(bookId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    @Transactional
    public Review createReview(CreateReviewRequest reviewRequest, Long bookId, User user) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BusinessException(
                        "Book Not Found",
                        ReturnCodes.BOOK_NOT_FOUND.intValue(),
                        "Book Not Found"
                ));

        Optional<Review> existingReview = reviewRepository.findByUserIdAndBookId(user.getId(), bookId);
        if (existingReview.isPresent()) {
            throw new BusinessException(
                    "Review Already Exists",
                    ReturnCodes.REVIEW_ALREADY_EXISTS.intValue(),
                    "User already reviewed this book"
            );
        }

        Review review = new Review();
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        review.setBook(book);
        review.setUser(user);

        Review savedReview = reviewRepository.save(review);
        updateBookAverageRating(bookId);

        return savedReview;
    }

    @Override
    @Transactional
    public Review updateReview(Long reviewId, UpdateReviewRequest reviewDetails, User user) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessException(
                        "Review Not Found",
                        ReturnCodes.REVIEW_NOT_FOUND.intValue(),
                        "Review Not Found Review ID: " + reviewId
                ));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new BusinessException(
                    "Access Denied",
                    ReturnCodes.UNAUTHORIZED_REVIEW_ACCESS.intValue(),
                    "Access Denied User ID: " + user.getId()
            );
        }

        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());
        review.setUpdatedAt(LocalDateTime.now());

        Review updatedReview = reviewRepository.save(review);
        updateBookAverageRating(review.getBook().getId());

        return updatedReview;
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId, User user) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessException(
                        "Review Not Found",
                        ReturnCodes.REVIEW_NOT_FOUND.intValue(),
                        "Review Not Found"
                ));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new BusinessException(
                    "Access Denied",
                    ReturnCodes.UNAUTHORIZED_REVIEW_ACCESS.intValue(),
                    "Access Denied User ID: " + user.getId()
            );
        }

        Long bookId = review.getBook().getId();
        reviewRepository.delete(review);
        updateBookAverageRating(bookId);
    }

    @Override
    @Transactional
    public void updateBookAverageRating(Long bookId) {
        Double averageRating = reviewRepository.findAverageRatingByBookId(bookId);
        Long ratingCount = reviewRepository.countReviewsByBookId(bookId);

        if (averageRating == null) {
            averageRating = 0.0;
        }

        bookService.updateBookRating(bookId, averageRating, ratingCount.intValue());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Review> getRecentReviews() {
        return reviewRepository.findTop10ByOrderByCreatedAtDesc();
    }
}
