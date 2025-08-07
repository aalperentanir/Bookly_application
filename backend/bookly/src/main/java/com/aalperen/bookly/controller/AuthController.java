package com.aalperen.bookly.controller;

import com.aalperen.bookly.config.JWTProvider;
import com.aalperen.bookly.dto.AuthResponse;
import com.aalperen.bookly.dto.CreateUserRequest;
import com.aalperen.bookly.dto.LoginRequest;
import com.aalperen.bookly.dto.LoginResponse;
import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.enums.Role;
import com.aalperen.bookly.service.CustomeUserDetailsService;
import com.aalperen.bookly.service.JWTService;
import com.aalperen.bookly.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import java.util.Collection;

// http://localhost:8080/swagger-ui.html
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication API", description = "Authentication controller")
public class AuthController {

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;

    private final CustomeUserDetailsService customeUserDetailsService;

    private final JWTService jwtService;


    @PostMapping("/signup")
    @Operation(summary = "Create User Request")
    public ResponseEntity<AuthResponse> createUser(@RequestBody CreateUserRequest req){

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword());
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setRole(req.getRole());
        user.setProfileImageUrl(req.getProfileImageUrl());

        User createdUser = userService.createUser(user);

        String jwt = jwtService.createAuth(createdUser);

        AuthResponse response = new AuthResponse();
        response.setToken(jwt);
        response.setRole(createdUser.getRole());
        response.setMessage("SIGNUP REQUEST SUCCESS");


        return ResponseEntity.ok(response);
    }
    @PostMapping("/signin")
    @Operation(summary = "Login Request")
    public ResponseEntity<LoginResponse> signin(@RequestBody LoginRequest req){
        String username = req.getEmail();
        String password = req.getPassword();

        Authentication auth = authentication(username,password);

        String jwt = JWTProvider.generateToken(auth);


        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String role = "";
        if (authorities != null) {
            role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
        }

        LoginResponse response = new LoginResponse();
        response.setToken(jwt);
        response.setMessage("SIGNIN REQUEST SUCCESS");
        response.setRole(Role.valueOf(role));

        return ResponseEntity.ok(response);
    }

    private Authentication authentication(String username, String password) {
        UserDetails userDetails = customeUserDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
