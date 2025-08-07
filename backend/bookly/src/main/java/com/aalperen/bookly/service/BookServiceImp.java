package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.CreateBookRequest;
import com.aalperen.bookly.dto.UpdateBookRequest;
import com.aalperen.bookly.entity.*;
import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import com.aalperen.bookly.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImp implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    private final PublisherRepository publisherRepository;
    private final ReviewRepository reviewRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<Book> getAllBooks(Pageable pageable) {
        try {
            return bookRepository.findAll(pageable);
        } catch (Exception e) {
            log.error("Error fetching all books", e);
            throw new BusinessException("BookService Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Book getBookById(Long id) {
        try {
            return bookRepository.findById(id)
                    .orElseThrow(() -> new BusinessException("Book Not Found", ReturnCodes.BOOK_NOT_FOUND.intValue(), "Book with ID " + id + " not found"));
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error fetching book with id {}", id, e);
            throw new BusinessException("BookService Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional
    public Book createBook(CreateBookRequest request) {
        try {
            Book book = new Book();
            book.setTitle(request.getTitle());
            book.setSummary(request.getSummary());
            book.setPublicationDate(request.getPublicationDate());
            book.setIsbn(request.getIsbn());
            book.setAverageRating(request.getAverageRating());
            book.setRatingCount(request.getRatingCount());
            book.setPageCount(request.getPageCount());
            book.setCoverImageUrl(request.getCoverImageUrl());

            // Author
            if (request.getAuthorIds() != null && !request.getAuthorIds().isEmpty()) {
                List<Author> authors = authorRepository.findAllById(request.getAuthorIds());
                if (authors.size() != request.getAuthorIds().size()) {
                    Set<Long> foundIds = authors.stream().map(Author::getId).collect(Collectors.toSet());
                    Set<Long> missingIds = new HashSet<>(request.getAuthorIds());
                    missingIds.removeAll(foundIds);
                    throw new BusinessException("Missing authors", ReturnCodes.AUTHOR_NOT_FOUND.intValue(), "Missing author IDs: " + missingIds);
                }
                book.setAuthors(new HashSet<>(authors));
            }

            // Category
            if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
                List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());
                if (categories.size() != request.getCategoryIds().size()) {
                    Set<Long> foundIds = categories.stream().map(Category::getId).collect(Collectors.toSet());
                    Set<Long> missingIds = new HashSet<>(request.getCategoryIds());
                    missingIds.removeAll(foundIds);
                    throw new BusinessException("Missing categories", ReturnCodes.CATEGORY_NOT_FOUND.intValue(), "Missing category IDs: " + missingIds);
                }
                book.setCategories(new HashSet<>(categories));
            }

            // Publisher
            if (request.getPublisherId() != null) {
                Publisher publisher = publisherRepository.findById(request.getPublisherId())
                        .orElseThrow(() -> new BusinessException("Publisher Not Found", ReturnCodes.PUBLISHER_NOT_FOUND.intValue(), "Publisher ID: " + request.getPublisherId()));
                book.setPublisher(publisher);
            }

            // Reviews
            if (request.getReviewIds() != null && !request.getReviewIds().isEmpty()) {
                List<Review> reviews = reviewRepository.findAllById(request.getReviewIds());
                if (reviews.size() != request.getReviewIds().size()) {
                    Set<Long> foundIds = reviews.stream().map(Review::getId).collect(Collectors.toSet());
                    Set<Long> missingIds = new HashSet<>(request.getReviewIds());
                    missingIds.removeAll(foundIds);
                    throw new BusinessException("Missing reviews", ReturnCodes.REVIEW_NOT_FOUND.intValue(), "Missing review IDs: " + missingIds);
                }
                book.setReviews(reviews);
            }

            Book saved = bookRepository.save(book);
            log.info("Book created with ID {}", saved.getId());
            return saved;

        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error creating book", e);
            throw new BusinessException("BookService Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional
    public Book updateBook(Long id, UpdateBookRequest bookDetails) {
        try {
            Book book = bookRepository.findById(id)
                    .orElseThrow(() -> new BusinessException("Book Not Found", ReturnCodes.BOOK_NOT_FOUND.intValue(), "Book with ID " + id + " not found"));

            book.setTitle(bookDetails.getTitle());
            book.setSummary(bookDetails.getSummary());
            book.setPublicationDate(bookDetails.getPublicationDate());
            book.setIsbn(bookDetails.getIsbn());
            book.setPageCount(bookDetails.getPageCount());
            book.setCoverImageUrl(bookDetails.getCoverImageUrl());

            if (bookDetails.getAuthorIds() != null) {
                book.setAuthors(new HashSet<>(authorRepository.findAllById(bookDetails.getAuthorIds())));
            }

            if (bookDetails.getCategoryIds() != null) {
                book.setCategories(new HashSet<>(categoryRepository.findAllById(bookDetails.getCategoryIds())));
            }

            if (bookDetails.getPublisherId() != null) {
                Publisher publisher = publisherRepository.findById(bookDetails.getPublisherId())
                        .orElseThrow(() -> new BusinessException("Publisher Not Found", ReturnCodes.PUBLISHER_NOT_FOUND.intValue(), "Publisher ID: " + bookDetails.getPublisherId()));
                book.setPublisher(publisher);
            }

            if (bookDetails.getReviewIds() != null) {
                List<Review> reviews = new LinkedList<>(reviewRepository.findAllById(bookDetails.getReviewIds()));
                book.setReviews(reviews);
            }

            Book updated = bookRepository.save(book);
            log.info("Book updated with ID {}", updated.getId());
            return updated;

        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error updating book with id {}", id, e);
            throw new BusinessException("BookService Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        try {
            if (!bookRepository.existsById(id)) {
                throw new BusinessException("Book Not Found", ReturnCodes.BOOK_NOT_FOUND.intValue(), "Book with ID " + id + " not found");
            }
            bookRepository.deleteById(id);
            log.info("Book deleted with ID {}", id);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error deleting book with ID {}", id, e);
            throw new BusinessException("BookService Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> searchBooksByTitle(String title) {
        try {
            return bookRepository.findByTitleContainingIgnoreCase(title);
        } catch (Exception e) {
            log.error("Error searching books by title: {}", title, e);
            throw new BusinessException("Book Search Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Book> searchBooks(String keyword, Pageable pageable) {
        try {
            return bookRepository.searchBooks(keyword, pageable);
        } catch (Exception e) {
            log.error("Error searching books by keyword: {}", keyword, e);
            throw new BusinessException("Book Search Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getBooksByAuthor(Long authorId) {
        try {
            return bookRepository.findBooksByAuthorId(authorId);
        } catch (Exception e) {
            log.error("Error fetching books by authorId: {}", authorId, e);
            throw new BusinessException("Fetch Author Books Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Book> getBooksByCategory(Long categoryId, Pageable pageable) {
        try {
            return bookRepository.findBooksByCategoryId(categoryId, pageable);
        } catch (Exception e) {
            log.error("Error fetching books by categoryId: {}", categoryId, e);
            throw new BusinessException("Fetch Category Books Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getTopRatedBooks(Double minRating, Pageable pageable) {
        try {
            return bookRepository.findTopRatedBooks(minRating, pageable);
        } catch (Exception e) {
            log.error("Error fetching top rated books", e);
            throw new BusinessException("Top Rated Books Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Book> getMostReviewedBooks(Pageable pageable) {
        try {
            return bookRepository.findMostReviewedBooks(pageable);
        } catch (Exception e) {
            log.error("Error fetching most reviewed books", e);
            throw new BusinessException("Most Reviewed Books Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }

    @Override
    @Transactional
    public void updateBookRating(Long bookId, Double averageRating, Integer ratingCount) {
        try {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new BusinessException("Book Not Found", ReturnCodes.BOOK_NOT_FOUND.intValue(), "Book ID: " + bookId));
            book.setAverageRating(averageRating);
            book.setRatingCount(ratingCount);
            bookRepository.save(book);
            log.info("Book rating updated for ID {}", bookId);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error updating rating for bookId {}", bookId, e);
            throw new BusinessException("Update Rating Error", ReturnCodes.INTERNAL_SERVER_ERROR.intValue(), e.getMessage());
        }
    }
}
