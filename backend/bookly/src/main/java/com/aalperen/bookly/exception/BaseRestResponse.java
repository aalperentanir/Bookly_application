package com.aalperen.bookly.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serial;

@Data
@AllArgsConstructor
public class BaseRestResponse {

    @Serial
    private static final long serialVersionUID = -3040576603356791514L;

    private int code;
    private String message;
}
