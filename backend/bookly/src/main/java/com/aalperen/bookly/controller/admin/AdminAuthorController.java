package com.aalperen.bookly.controller.admin;

import com.aalperen.bookly.dto.AuthorRequest;
import com.aalperen.bookly.dto.AuthorResponse;
import com.aalperen.bookly.entity.Author;
import com.aalperen.bookly.service.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Author API", description = "Author controller for Admin role")
@RequiredArgsConstructor
public class AdminAuthorController {

    private final AuthorService authorService;

    @PostMapping("/authors")
    @Operation(summary = "Create author Request", description = "Only admin role can create author new customer")
    public ResponseEntity<AuthorResponse> createAuthor(@RequestBody AuthorRequest req) {
        Author createdAuthor = authorService.createAuthor(req);

        return ResponseEntity.ok(mapToAuthorResponse(createdAuthor));

    }

    @PutMapping("/authors/{id}")
    @Operation(summary = "Update Author Request",description = "Only admin role can update author")
    public ResponseEntity<AuthorResponse> updateAuthor(@PathVariable Long id, @RequestBody AuthorRequest authorDetails) {
        Author updatedAuthor = authorService.updateAuthor(id, authorDetails);
        return ResponseEntity.ok(mapToAuthorResponse(updatedAuthor));
    }

    @DeleteMapping("/authors/{id}")
    @Operation(summary = "Delete Author Request", description = "Only admin role can delete author")
    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id) {
        authorService.deleteAuthor(id);
        return ResponseEntity.noContent().build();
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
}
