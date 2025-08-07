package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    User findByEmail(String username);

    List<User> findByIsActiveTrue();

    @Query("SELECT u FROM User u JOIN u.reviews r GROUP BY u.id ORDER BY COUNT(r) DESC")
    List<User> findMostActiveReviewers();


    @Query("SELECT u FROM User u WHERE u.username = :identifier OR u.email = :identifier")
    Optional<User> findByUsernameOrEmail(@Param("identifier")String identifier);
}
