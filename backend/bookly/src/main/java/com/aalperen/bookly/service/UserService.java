package com.aalperen.bookly.service;

import com.aalperen.bookly.entity.User;

public interface UserService {

    User findUserByToken(String token);

    User findUserByEmail(String email);

    User createUser(User user);
}
