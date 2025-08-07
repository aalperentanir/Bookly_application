package com.aalperen.bookly.controller;

import com.aalperen.bookly.dto.BookSummary;
import com.aalperen.bookly.dto.ReadingListRequest;
import com.aalperen.bookly.dto.ReadingListResponse;
import com.aalperen.bookly.entity.ReadingList;
import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.service.ReadingListService;
import com.aalperen.bookly.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reading-lists")
@RequiredArgsConstructor
@Tag(name = "Reading List API", description = "Reading List controller")
public class ReadingListController {

    private final ReadingListService readingListService;

    private final UserService userService;

    @GetMapping("/user")
    @Operation(summary = "Get User Reading List Request")
    public ResponseEntity<List<ReadingListResponse>> getUserReadingLists(@RequestHeader("Authorization")String jwt) {
        User user = userService.findUserByToken(jwt);
        List<ReadingList> readingLists = readingListService.getUserReadingLists(user.getId());
        return new ResponseEntity<>(mapToReadingListResponseList(readingLists), HttpStatus.OK);
    }

    @GetMapping("/public")
    @Operation(summary = "Get Public Reading Lists Request")
    public ResponseEntity<List<ReadingListResponse>> getPublicReadingLists() {
        List<ReadingList> readingLists = readingListService.getPublicReadingLists();
        return new ResponseEntity<>(mapToReadingListResponseList(readingLists), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Reading List By Id Request")
    public ResponseEntity<ReadingListResponse> getReadingListById(@PathVariable Long id) {
        ReadingList readingList = readingListService.getReadingListById(id);
            return new ResponseEntity<>(mapToReadingListResponse(readingList), HttpStatus.OK);

    }

    @PostMapping()
    @Operation(summary = "Create Reading List Request")
    public ResponseEntity<ReadingListResponse> createReadingList(@RequestHeader("Authorization")String jwt, @RequestBody ReadingListRequest req) {

            User user = userService.findUserByToken(jwt);
            ReadingList createdReadingList = readingListService.createReadingList(req,user);
            return new ResponseEntity<>(mapToReadingListResponse(createdReadingList), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Reading List Request")
    public ResponseEntity<ReadingListResponse> updateReadingList(@PathVariable Long id, @RequestHeader("Authorization")String jwt, @RequestBody ReadingListRequest readingListDetails) {

            User user = userService.findUserByToken(jwt);
            ReadingList updatedReadingList = readingListService.updateReadingList(id, readingListDetails, user);
            return new ResponseEntity<>(mapToReadingListResponse(updatedReadingList), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Reading List Request")
    public ResponseEntity<Void> deleteReadingList(@PathVariable Long id, @RequestHeader("Authorization")String jwt) {
            User user = userService.findUserByToken(jwt);
            readingListService.deleteReadingList(id, user.getId());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PostMapping("/{listId}/books/{bookId}")
    @Operation(summary = "Add Book To Reading List Request")
    public ResponseEntity<ReadingListResponse> addBookToReadingList(@PathVariable Long listId, @PathVariable Long bookId, @RequestHeader("Authorization")String jwt) {
            User user = userService.findUserByToken(jwt);
            ReadingList updatedReadingList = readingListService.addBookToReadingList(listId, bookId, user.getId());
            return new ResponseEntity<>(mapToReadingListResponse(updatedReadingList), HttpStatus.OK);
    }

    @DeleteMapping("/{listId}/books/{bookId}")
    @Operation(summary = "Remove Book From Reading List Request")
    public ResponseEntity<ReadingListResponse> removeBookFromReadingList(@PathVariable Long listId, @PathVariable Long bookId,  @RequestHeader("Authorization")String jwt) {

        User user = userService.findUserByToken(jwt);
        ReadingList updatedReadingList = readingListService.removeBookFromReadingList(listId, bookId, user.getId());
            return new ResponseEntity<>(mapToReadingListResponse(updatedReadingList), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/containing-book/{bookId}")
    @Operation(summary = "Get User List Containing Book Request")
    public ResponseEntity<List<ReadingListResponse>> getUserListsContainingBook(@PathVariable Long userId, @PathVariable Long bookId) {
        List<ReadingList> readingLists = readingListService.getUserListsContainingBook(userId, bookId);
        return new ResponseEntity<>(mapToReadingListResponseList(readingLists), HttpStatus.OK);
    }


    private ReadingListResponse mapToReadingListResponse(ReadingList readingList) {
        ReadingListResponse response = new ReadingListResponse();
        response.setId(readingList.getId());
        response.setName(readingList.getName());
        response.setDescription(readingList.getDescription());
        response.setIsPublic(readingList.getIsPublic());
        response.setCreatedAt(readingList.getCreatedAt());

        response.setUserId(readingList.getUser().getId());
        response.setUserName(readingList.getUser().getUsername());
        List<BookSummary> bookSummaries = readingList.getBooks().stream().map(book -> {
            BookSummary summary = new BookSummary();
            summary.setId(book.getId());
            summary.setTitle(book.getTitle());
            summary.setAuthors(book.getAuthors());
            summary.setCoverImageUrl(book.getCoverImageUrl());
            return summary;
        }).toList();

        response.setBooks(bookSummaries);

        return response;
    }

    private List<ReadingListResponse> mapToReadingListResponseList(List<ReadingList> lists) {
        return lists.stream()
                .map(this::mapToReadingListResponse)
                .collect(Collectors.toList());
    }


}