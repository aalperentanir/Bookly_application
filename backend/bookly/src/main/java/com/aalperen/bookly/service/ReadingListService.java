package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.ReadingListRequest;
import com.aalperen.bookly.entity.ReadingList;
import com.aalperen.bookly.entity.User;

import java.util.List;
import java.util.Optional;

public interface ReadingListService {

    List<ReadingList> getUserReadingLists(Long userId);

    List<ReadingList> getPublicReadingLists();

    ReadingList createDefaultReadingListForUser(User user);

    ReadingList getReadingListById(Long id);

    ReadingList createReadingList(ReadingListRequest readingList, User user);

    ReadingList updateReadingList(Long id, ReadingListRequest readingListDetails, User user);

    void deleteReadingList(Long id, Long userId);

    ReadingList addBookToReadingList(Long listId, Long bookId, Long userId);

    ReadingList removeBookFromReadingList(Long listId, Long bookId, Long userId);

    List<ReadingList> getUserListsContainingBook(Long userId, Long bookId);
}
