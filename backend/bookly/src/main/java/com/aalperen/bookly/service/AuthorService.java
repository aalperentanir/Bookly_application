package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.AuthorRequest;
import com.aalperen.bookly.entity.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorService {

    List<Author> getAllAuthors();

    Author getAuthorById(Long id);

    Author createAuthor(AuthorRequest req);

    Author updateAuthor(Long id, AuthorRequest authorDetails);

    void deleteAuthor(Long id);

    List<Author> searchAuthorsByName(String name);

    List<Author> getMostProductiveAuthors();




}
