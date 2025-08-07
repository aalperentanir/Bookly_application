package com.aalperen.bookly.controller;


import com.aalperen.bookly.dto.CreateReviewRequest;
import com.aalperen.bookly.dto.UpdateReviewRequest;
import com.aalperen.bookly.entity.Review;
import com.aalperen.bookly.dto.ReviewResponse;
import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.service.ReviewService;
import com.aalperen.bookly.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Review API", description = "Review controller")
public class ReviewController {

    private final ReviewService reviewService;

    private final UserService userService;

    @GetMapping("/book/{bookId}")
    @Operation(summary = "Get Reviews By Book Request")
    public ResponseEntity<Page<ReviewResponse>> getReviewsByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Review> reviews = reviewService.getReviewsByBook(bookId, pageable);

        Page<ReviewResponse> dtos = reviews.map(this::mapToReviewResponse);

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/user")
    @Operation(summary = "Get Reviews By User Request")
    public ResponseEntity<List<ReviewResponse>> getReviewsByUser(@RequestHeader("Authorization")String jwt) {
        User user = userService.findUserByToken(jwt);
        List<Review> reviews = reviewService.getReviewsByUser(user.getId());
        return ResponseEntity.ok(mapToResponseList(reviews));
    }

    @PostMapping("/book/{bookId}")
    @Operation(summary = "Create Review Request")
    public ResponseEntity<Review> createReview(

            @PathVariable Long bookId,
            @RequestHeader("Authorization")String jwt,
            @RequestBody CreateReviewRequest review) {

            User user = userService.findUserByToken(jwt);
            Review createdReview = reviewService.createReview(review, bookId, user);
            return ResponseEntity.ok(createdReview);

    }

    @PutMapping("/{reviewId}")
    @Operation(summary = "Update Review Request")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @RequestHeader("Authorization")String jwt,
            @RequestBody UpdateReviewRequest reviewDetails) {
            User user = userService.findUserByToken(jwt);
            Review updatedReview = reviewService.updateReview(reviewId, reviewDetails, user);
            return ResponseEntity.ok(mapToReviewResponse(updatedReview));

    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Delete Review Request")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId,
            @RequestHeader("Authorization")String jwt) {

            User user = userService.findUserByToken(jwt);
            reviewService.deleteReview(reviewId, user);
            return ResponseEntity.noContent().build();
    }

    @GetMapping("/recent")
    @Operation(summary = "Get Recent Reviews Request")
    public ResponseEntity<List<ReviewResponse>> getRecentReviews() {
        List<Review> reviews = reviewService.getRecentReviews();
        return ResponseEntity.ok(mapToResponseList(reviews));
    }


    private ReviewResponse mapToReviewResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUpdatedAt(),
                review.getUser().getId(),
                review.getBook().getId(),
                review.getUser().getFirstName(),
                review.getUser().getLastName(),
                review.getUser().getUsername()
        );
    }

    private List<ReviewResponse> mapToResponseList(List<Review> reviews) {
        return reviews.stream()
                .map(this::mapToReviewResponse)
                .collect(Collectors.toList());
    }




}
