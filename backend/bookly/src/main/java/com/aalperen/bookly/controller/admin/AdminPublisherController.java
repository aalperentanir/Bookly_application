package com.aalperen.bookly.controller.admin;

import com.aalperen.bookly.dto.PublisherRequest;
import com.aalperen.bookly.dto.PublisherResponse;
import com.aalperen.bookly.entity.Publisher;
import com.aalperen.bookly.service.PublisherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Publisher API", description ="Publisher controller for Admin")
public class AdminPublisherController {

    private final PublisherService publisherService;


    @PostMapping("/publishers")
    @Operation(summary = "Create Publisher Request", description = "Only admin role can create new publisher")
    public ResponseEntity<PublisherResponse> createPublisher(@RequestBody PublisherRequest publisher) {
        Publisher createdPublisher = publisherService.createPublisher(publisher);
        return new ResponseEntity<>(mapToPublisherResponse(createdPublisher), HttpStatus.CREATED);

    }

    @PutMapping("/publishers/{id}")
    @Operation(summary = "Update Publisher Request", description = "Only admin role can update publisher")
    public ResponseEntity<PublisherResponse> updatePublisher(@PathVariable Long id, @RequestBody PublisherRequest publisherDetails) {

        Publisher updatedPublisher = publisherService.updatePublisher(id, publisherDetails);
        return new ResponseEntity<>(mapToPublisherResponse(updatedPublisher), HttpStatus.OK);

    }

    @DeleteMapping("/publishers/{id}")
    @Operation(summary = "Delete Publisher Request", description = "Only admin role can delete publisher")
    public ResponseEntity<Void> deletePublisher(@PathVariable Long id) {

        publisherService.deletePublisher(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    private PublisherResponse mapToPublisherResponse(Publisher publisher) {
        PublisherResponse publisherResponse = new PublisherResponse();
        publisherResponse.setId(publisher.getId());
        publisherResponse.setName(publisher.getName());
        publisherResponse.setDescription(publisher.getDescription());
        publisherResponse.setFoundedYear(publisher.getFoundedYear());
        return publisherResponse;
    }
}
