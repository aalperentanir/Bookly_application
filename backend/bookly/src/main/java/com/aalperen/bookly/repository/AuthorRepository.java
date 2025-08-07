package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    List<Author> findByNameContainingIgnoreCase(String name);

    List<Author> findByNationality(String nationality);

    @Query("SELECT a FROM Author a JOIN a.books b GROUP BY a.id ORDER BY COUNT(b) DESC")
    List<Author> findMostProductiveAuthors();

    @Query("SELECT a FROM Author a JOIN a.books b GROUP BY a.id HAVING COUNT(b) >= :minBooks")
    List<Author> findAuthorsWithMinBooks(@Param("minBooks") Long minBooks);


}
