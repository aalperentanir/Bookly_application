package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.AuthorRequest;
import com.aalperen.bookly.entity.Author;
import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import com.aalperen.bookly.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthorServiceImp implements AuthorService {

    private final AuthorRepository authorRepository;


    @Override
    @Transactional(readOnly = true)
    public List<Author> getAllAuthors() {
        try {
            return authorRepository.findAll();
        }catch (BusinessException e){
            log.error("Error while fetching all authors", e);
            throw new BusinessException("Unexpected error", ReturnCodes.INTERNAL_ERROR.intValue(),"Unexpected error");
        }

    }

    @Override
    @Transactional(readOnly = true)
    public Author getAuthorById(Long id) {

        try {
            return authorRepository.findById(id).orElseThrow(() -> new BusinessException("Author not found",ReturnCodes.AUTHOR_NOT_FOUND.intValue(),"Author not found"));
        }catch (BusinessException e){
            log.error("Error while fetching author with id {}", id, e);
            throw new BusinessException("Unexpected error", ReturnCodes.INTERNAL_ERROR.intValue(),"Unexpected error");
        }

    }

    @Override
    @Transactional
    public Author createAuthor(AuthorRequest req) {
        try {
            Author author = new Author();
            author.setName(req.getName());
            author.setNationality(req.getNationality());
            author.setBiography(req.getBiography());
            author.setProfileImageUrl(req.getProfileImageUrl());
            author.setDeathDate(req.getDeathDate());
            author.setBirthDate(req.getBirthDate());

            Author saved = authorRepository.save(author);
            log.info("Author created with id {}", saved.getId());
            return saved;
        } catch (BusinessException e) {
            log.error("Error while creating author", e);
            throw new BusinessException("Unexpected error", ReturnCodes.INTERNAL_ERROR.intValue(),"Unexpected error");
        }
    }

    @Override
    @Transactional
    public Author updateAuthor(Long id, AuthorRequest authorDetails) {

        try{
            Author author = authorRepository.findById(id)
                    .orElseThrow(() -> new BusinessException("Author not found",ReturnCodes.AUTHOR_NOT_FOUND.intValue(),"Author not found"));
            author.setName(authorDetails.getName());
            author.setBiography(authorDetails.getBiography());
            author.setBirthDate(authorDetails.getBirthDate());
            author.setDeathDate(authorDetails.getDeathDate());
            author.setNationality(authorDetails.getNationality());
            author.setProfileImageUrl(authorDetails.getProfileImageUrl());

            return authorRepository.save(author);

        }catch (BusinessException e){
            log.error("Error while updating author with id {}", id, e);
            throw new BusinessException("Unexpected error", ReturnCodes.INTERNAL_ERROR.intValue(),"Unexpected error");

        }
    }

    @Override
    @Transactional
    public void deleteAuthor(Long id) {
        try {
            if (!authorRepository.existsById(id)) {
                log.warn("Author not found with id: {}", id);
                throw new BusinessException(
                        "Author Not Found",
                        ReturnCodes.AUTHOR_NOT_FOUND.intValue(),
                        ReturnCodes.AUTHOR_NOT_FOUND.description(),
                        "No author found with ID " + id
                );
            }
            authorRepository.deleteById(id);
            log.info("Author deleted with id {}", id);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error while deleting author with id {}", id, e);
            throw new BusinessException("AuthorService Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Author> searchAuthorsByName(String name) {
        try {
            return authorRepository.findByNameContainingIgnoreCase(name);
        } catch (Exception e) {
            log.error("Error while searching authors by name: {}", name, e);
            throw new BusinessException("Search Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Author> getMostProductiveAuthors() {
        try {
            return authorRepository.findMostProductiveAuthors();
        } catch (Exception e) {
            log.error("Error while fetching most productive authors", e);
            throw new BusinessException("Productivity Fetch Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }
}
