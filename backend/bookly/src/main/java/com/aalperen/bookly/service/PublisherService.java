package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.PublisherRequest;
import com.aalperen.bookly.entity.Publisher;

import java.util.List;
import java.util.Optional;

public interface PublisherService {

    List<Publisher> getAllPublishers();

    Publisher getPublisherById(Long id);

    Publisher createPublisher(PublisherRequest req);

    Publisher updatePublisher(Long id, PublisherRequest publisherDetails);

    void deletePublisher(Long id);

    List<Publisher> getPublishersByName(String name);

    List<Publisher> getPublishersByFoundedYear(Integer foundedYear);

    List<Publisher> getMostActivePublishers();

    boolean existsById(Long id);


}
