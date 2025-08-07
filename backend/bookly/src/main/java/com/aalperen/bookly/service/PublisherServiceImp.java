package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.PublisherRequest;
import com.aalperen.bookly.entity.Publisher;
import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import com.aalperen.bookly.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublisherServiceImp implements PublisherService {

    private final PublisherRepository publisherRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Publisher getPublisherById(Long id) {
        return publisherRepository.findById(id).orElseThrow(() ->
                new BusinessException(
                        "Publisher not found",
                        ReturnCodes.PUBLISHER_NOT_FOUND.intValue(),
                        "Publisher not found with ID: " + id
                ));
    }

    @Override
    @Transactional
    public Publisher createPublisher(PublisherRequest req) {
        Publisher publisher = new Publisher();
        publisher.setName(req.getName());
        publisher.setDescription(req.getDescription());
        publisher.setFoundedYear(req.getFoundedYear());

        return publisherRepository.save(publisher);
    }

    @Override
    @Transactional
    public Publisher updatePublisher(Long id, PublisherRequest publisherDetails) {
        Publisher publisher = publisherRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessException(
                                "Publisher not found",
                                ReturnCodes.PUBLISHER_NOT_FOUND.intValue(),
                                "Publisher not found with ID: " + id
                        ));

        publisher.setName(publisherDetails.getName());
        publisher.setDescription(publisherDetails.getDescription());
        publisher.setFoundedYear(publisherDetails.getFoundedYear());

        return publisherRepository.save(publisher);
    }

    @Override
    @Transactional
    public void deletePublisher(Long id) {
        Publisher publisher = publisherRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessException(
                                "Publisher not found",
                                ReturnCodes.PUBLISHER_NOT_FOUND.intValue(),
                                "Publisher not found with ID: " + id
                        ));

        publisherRepository.delete(publisher);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Publisher> getPublishersByName(String name) {
        return publisherRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Publisher> getPublishersByFoundedYear(Integer foundedYear) {
        return publisherRepository.findByFoundedYear(foundedYear);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Publisher> getMostActivePublishers() {
        return publisherRepository.findMostActivePublishers();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return publisherRepository.existsById(id);
    }
}
