package com.aalperen.bookly.controller;

import com.aalperen.bookly.dto.PublisherRequest;
import com.aalperen.bookly.dto.PublisherResponse;
import com.aalperen.bookly.entity.Publisher;
import com.aalperen.bookly.service.PublisherService;
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
@RequestMapping("/api/publishers")
@RequiredArgsConstructor
@Tag(name = "Publisher API", description = "Publisher controller")
public class PublisherController {

    private final PublisherService publisherService;

    @GetMapping
    @Operation(summary = "Get All Publishers Request")
    public ResponseEntity<List<PublisherResponse>> getAllPublishers() {
        List<Publisher> publishers = publisherService.getAllPublishers();
        return new ResponseEntity<>(mapToPublisherResponseList(publishers), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Publisher By Id Request")
    public ResponseEntity<PublisherResponse> getPublisherById(@PathVariable Long id) {
        Publisher publisher = publisherService.getPublisherById(id);
            return new ResponseEntity<>(mapToPublisherResponse(publisher), HttpStatus.OK);

    }

    @GetMapping("/search")
    @Operation(summary = "Search Publisher Request")
    public ResponseEntity<List<PublisherResponse>> searchPublishersByName(@RequestParam String name) {
        List<Publisher> publishers = publisherService.getPublishersByName(name);
        return new ResponseEntity<>(mapToPublisherResponseList(publishers), HttpStatus.OK);
    }

    @GetMapping("/founded-year/{year}")
    @Operation(summary = "Get Publisher By Founded Year Request")
    public ResponseEntity<List<PublisherResponse>> getPublishersByFoundedYear(@PathVariable Integer year) {
        List<Publisher> publishers = publisherService.getPublishersByFoundedYear(year);
        return new ResponseEntity<>(mapToPublisherResponseList(publishers), HttpStatus.OK);
    }

    @GetMapping("/most-active")
    @Operation(summary = "Get Most Active Publishers Request")
    public ResponseEntity<List<PublisherResponse>> getMostActivePublishers() {
        List<Publisher> publishers = publisherService.getMostActivePublishers();
        return new ResponseEntity<>(mapToPublisherResponseList(publishers), HttpStatus.OK);
    }

    @GetMapping("/{id}/exists")
    @Operation(summary = "Check Publisher Exists Request")
    public ResponseEntity<Boolean> checkPublisherExists(@PathVariable Long id) {
        boolean exists = publisherService.existsById(id);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    private PublisherResponse mapToPublisherResponse(Publisher publisher) {
        PublisherResponse publisherResponse = new PublisherResponse();
        publisherResponse.setId(publisher.getId());
        publisherResponse.setName(publisher.getName());
        publisherResponse.setDescription(publisher.getDescription());
        publisherResponse.setFoundedYear(publisher.getFoundedYear());
        return publisherResponse;
    }

    private List<PublisherResponse> mapToPublisherResponseList(List<Publisher> publishers) {
        return publishers.stream()
                .map(this::mapToPublisherResponse)
                .collect(Collectors.toList());
    }
}