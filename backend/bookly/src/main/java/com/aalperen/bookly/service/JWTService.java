package com.aalperen.bookly.service;

import com.aalperen.bookly.config.JWTProvider;
import com.aalperen.bookly.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JWTService {

    public String createAuth(User user) {
        try {

            Authentication auth = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            SecurityContextHolder.getContext().setAuthentication(auth);

            return JWTProvider.generateToken(auth);


        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}