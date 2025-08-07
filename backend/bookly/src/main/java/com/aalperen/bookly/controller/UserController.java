package com.aalperen.bookly.controller;


import com.aalperen.bookly.entity.User;
import com.aalperen.bookly.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name= "User API", description = "User controller")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get User By Token Request")
    public ResponseEntity<User> findUserProfile(@RequestHeader("Authorization")String token){

        User user = userService.findUserByToken(token);

        return ResponseEntity.ok(user);
    }
}
