package com.aalperen.bookly.service;

import com.aalperen.bookly.config.JWTProvider;
import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final ReadingListService readingListService;



    @Override
    @Transactional(readOnly = true)
    public User findUserByToken(String token) {
            String email = JWTProvider.getEmailFromToken(token);
            return userRepository.findByEmail(email);

    }

    @Override
    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            return user;
    }

    @Override
    @Transactional
    public User createUser(User user) {
        try {
            User isEmailExists = userRepository.findByEmail(user.getEmail());

            if (isEmailExists != null) {
                throw new RuntimeException("Email already exists");
            }

            User createdUser = new User();
            createdUser.setEmail(user.getEmail());
            createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
            createdUser.setUsername(user.getUsername());
            createdUser.setFirstName(user.getFirstName());
            createdUser.setLastName(user.getLastName());
            createdUser.setRole(user.getRole());
            createdUser.setProfileImageUrl(user.getProfileImageUrl());

            User savedUser = userRepository.save(createdUser);
            readingListService.createDefaultReadingListForUser(savedUser);
            

            return savedUser;

        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
