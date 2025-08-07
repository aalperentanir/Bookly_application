package com.aalperen.bookly.controller;


import com.aalperen.bookly.dto.AuthorRequest;
import com.aalperen.bookly.dto.AuthorResponse;
import com.aalperen.bookly.entity.Author;
import com.aalperen.bookly.service.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
@Tag(name = "Author API", description = "Author controller")
public class AuthorController {


    private final AuthorService authorService;

    @GetMapping
    @Operation(summary = "Get All Authors Request")
    public ResponseEntity<List<AuthorResponse>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(mapToResponseList(authors));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Author By Id Request")
    public ResponseEntity<AuthorResponse> getAuthorById(@PathVariable Long id) {
        Author author = authorService.getAuthorById(id);

        return ResponseEntity.ok(mapToAuthorResponse(author));
    }

    @GetMapping("/search")
    @Operation(summary = "Search Author Request")
    public ResponseEntity<List<AuthorResponse>> searchAuthors(@RequestParam String name) {
        List<Author> authors = authorService.searchAuthorsByName(name);
        return ResponseEntity.ok(mapToResponseList(authors));
    }

    @GetMapping("/most-productive")
    @Operation(summary = "Get Most Productive Authors Request")
    public ResponseEntity<List<AuthorResponse>> getMostProductiveAuthors() {
        List<Author> authors = authorService.getMostProductiveAuthors();
        return ResponseEntity.ok(mapToResponseList(authors));
    }

    private AuthorResponse mapToAuthorResponse(Author author) {
        AuthorResponse response = new AuthorResponse();
        response.setId(author.getId());
        response.setName(author.getName());
        response.setBiography(author.getBiography());
        response.setBirthDate(author.getBirthDate());
        response.setDeathDate(author.getDeathDate());
        response.setNationality(author.getNationality());
        response.setProfileImageUrl(author.getProfileImageUrl());
        return response;
    }

    private List<AuthorResponse> mapToResponseList(List<Author> authors) {
        return authors.stream()
                .map(this::mapToAuthorResponse)
                .collect(Collectors.toList());
    }



}

