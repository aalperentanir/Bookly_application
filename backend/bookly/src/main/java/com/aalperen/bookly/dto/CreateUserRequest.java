package com.aalperen.bookly.dto;

import com.aalperen.bookly.enums.Role;
import lombok.Data;

@Data
public class CreateUserRequest {
    private String username;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private Role role = Role.USER;

    private String profileImageUrl;
}
