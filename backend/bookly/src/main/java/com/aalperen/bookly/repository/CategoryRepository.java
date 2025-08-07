package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    List<Category> findByNameContainingIgnoreCase(String name);

    @Query("SELECT c FROM Category c JOIN c.books b GROUP BY c.id ORDER BY COUNT(b) DESC")
    List<Category> findMostPopularCategories();
}
