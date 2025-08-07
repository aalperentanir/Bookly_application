package com.aalperen.bookly.dto;

import com.aalperen.bookly.enums.Role;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private Role role;

    private String message;
}
