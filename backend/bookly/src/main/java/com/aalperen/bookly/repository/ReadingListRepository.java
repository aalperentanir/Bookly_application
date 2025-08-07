package com.aalperen.bookly.repository;

import com.aalperen.bookly.entity.ReadingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReadingListRepository extends JpaRepository<ReadingList, Long> {

    List<ReadingList> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<ReadingList> findByIsPublicTrueOrderByCreatedAtDesc();

    List<ReadingList> findByNameContainingIgnoreCase(String name);

    @Query("SELECT rl FROM ReadingList rl JOIN rl.books b WHERE rl.user.id = :userId AND b.id = :bookId")
    List<ReadingList> findUserListsContainingBook(@Param("userId") Long userId, @Param("bookId") Long bookId);
}
