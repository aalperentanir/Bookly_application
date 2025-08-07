package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    List<Publisher> findByNameContainingIgnoreCase(String name);

    List<Publisher> findByFoundedYear(Integer foundedYear);


    @Query("SELECT p FROM Publisher p JOIN p.books b GROUP BY p.id ORDER BY COUNT(b) DESC")
    List<Publisher> findMostActivePublishers();
}
