package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.ReadingListRequest;
import com.aalperen.bookly.entity.Book;
import com.aalperen.bookly.entity.ReadingList;
import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import com.aalperen.bookly.repository.BookRepository;
import com.aalperen.bookly.repository.ReadingListRepository;
import com.aalperen.bookly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReadingListServiceImp implements ReadingListService {

    private final ReadingListRepository readingListRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReadingList> getUserReadingLists(Long userId) {
        return readingListRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReadingList> getPublicReadingLists() {
        return readingListRepository.findByIsPublicTrueOrderByCreatedAtDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public ReadingList getReadingListById(Long id) {
        return readingListRepository.findById(id)
                .orElseThrow(() -> new BusinessException("READING_LIST_NOT_FOUND",ReturnCodes.READING_LIST_NOT_FOUND.intValue(),"READING_LIST_NOT_FOUND"));
    }

    @Override
    @Transactional
    public ReadingList createReadingList(ReadingListRequest request, User user) {
        List<Book> books = bookRepository.findAllById(request.getBookIds());

        ReadingList readingList = new ReadingList();
        readingList.setName(request.getName());
        readingList.setDescription(request.getDescription());
        readingList.setIsPublic(request.getIsPublic());
        readingList.setCreatedAt(LocalDateTime.now());
        readingList.setUser(user);
        readingList.setBooks(books);

        return readingListRepository.save(readingList);
    }

    @Transactional
    @Override
    public ReadingList createDefaultReadingListForUser(User user) {
        ReadingList readingList = new ReadingList();
        readingList.setName(user.getFirstName() + user.getLastName() +"'s Default Reading List");
        readingList.setDescription("This is the default reading list created automatically for the user.");
        readingList.setIsPublic(false);
        readingList.setCreatedAt(LocalDateTime.now());
        readingList.setUser(user);
        readingList.setBooks(List.of());

        return readingListRepository.save(readingList);
    }

    @Override
    @Transactional
    public ReadingList updateReadingList(Long id, ReadingListRequest request, User user) {
        ReadingList readingList = readingListRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Reading List not found",ReturnCodes.READING_LIST_NOT_FOUND.intValue(),"Reading list not found"));

        if (!readingList.getUser().getId().equals(user.getId())) {
            throw new BusinessException("UNAUTHORIZED_READING_LIST_ACCESS",ReturnCodes.UNAUTHORIZED_READING_LIST_ACCESS.intValue(),"UNAUTHORIZED_READING_LIST_ACCESS");
        }

        readingList.setName(request.getName());
        readingList.setDescription(request.getDescription());
        readingList.setIsPublic(request.getIsPublic());

        if (request.getBookIds() != null && !request.getBookIds().isEmpty()) {
            List<Book> books = bookRepository.findAllById(request.getBookIds());
            readingList.setBooks(books);
        }

        return readingListRepository.save(readingList);
    }

    @Override
    @Transactional
    public void deleteReadingList(Long id, Long userId) {
        ReadingList readingList = readingListRepository.findById(id)
                .orElseThrow(() -> new BusinessException("READING_LIST_NOT_FOUND",ReturnCodes.READING_LIST_NOT_FOUND.intValue(),"READING_LIST_NOT_FOUND"));

        if (!readingList.getUser().getId().equals(userId)) {
            throw new BusinessException("UNAUTHORIZED_READING_LIST_ACCESS",ReturnCodes.UNAUTHORIZED_READING_LIST_ACCESS.intValue(),"UNAUTHORIZED_READING_LIST_ACCESS");
        }

        readingListRepository.delete(readingList);
    }

    @Override
    @Transactional
    public ReadingList addBookToReadingList(Long listId, Long bookId, Long userId) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new BusinessException("READING_LIST_NOT_FOUND",ReturnCodes.READING_LIST_NOT_FOUND.intValue(),"READING_LIST_NOT_FOUND"));

        if (!readingList.getUser().getId().equals(userId)) {
            throw new BusinessException("UNAUTHORIZED_READING_LIST_ACCESS",ReturnCodes.UNAUTHORIZED_READING_LIST_ACCESS.intValue(),"UNAUTHORIZED_READING_LIST_ACCESS");
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BusinessException("BOOK_NOT_FOUND",ReturnCodes.BOOK_NOT_FOUND.intValue(),"BOOK_NOT_FOUND"));

        if (readingList.getBooks().contains(book)) {
            throw new BusinessException("BOOK_ALREADY_IN_LIST",ReturnCodes.BOOK_ALREADY_IN_LIST.intValue(),"BOOK_ALREADY_IN_LIST");
        }

        readingList.getBooks().add(book);

        return readingListRepository.save(readingList);
    }

    @Override
    @Transactional
    public ReadingList removeBookFromReadingList(Long listId, Long bookId, Long userId) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new BusinessException("READING_LIST_NOT_FOUND",ReturnCodes.READING_LIST_NOT_FOUND.intValue(),"READING_LIST_NOT_FOUND"));

        if (!readingList.getUser().getId().equals(userId)) {
            throw new BusinessException("UNAUTHORIZED_READING_LIST_ACCESS",ReturnCodes.UNAUTHORIZED_READING_LIST_ACCESS.intValue(),"UNAUTHORIZED_READING_LIST_ACCESS");
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BusinessException("BOOK_NOT_FOUND",ReturnCodes.BOOK_NOT_FOUND.intValue(),"BOOK_NOT_FOUND"));

        readingList.getBooks().remove(book);

        return readingListRepository.save(readingList);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReadingList> getUserListsContainingBook(Long userId, Long bookId) {
        return readingListRepository.findUserListsContainingBook(userId, bookId);
    }
}
