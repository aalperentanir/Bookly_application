package com.aalperen.bookly.dto;

import com.aalperen.bookly.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String token;

    private String message;

    private Role role;
}
