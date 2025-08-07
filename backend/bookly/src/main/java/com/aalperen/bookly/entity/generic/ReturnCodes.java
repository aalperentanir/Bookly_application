package com.aalperen.bookly.entity.generic;

import org.springframework.http.HttpStatus;

public enum ReturnCodes implements ReturnCode {

    NO_ERROR(200,"No Error",HttpStatus.OK),

    USER_NOT_FOUND(1002, "User not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(1003, "User already exists", HttpStatus.CONFLICT),

    AUTHOR_NOT_FOUND(2001, "Author not found", HttpStatus.NOT_FOUND),
    AUTHOR_ALREADY_EXISTS(2002, "Author already exists", HttpStatus.CONFLICT),


    BOOK_NOT_FOUND(3001, "Book not found", HttpStatus.NOT_FOUND),
    BOOK_ALREADY_EXISTS(3002, "Book already exists", HttpStatus.CONFLICT),
    INVALID_BOOK_RATING(3003, "Invalid book rating", HttpStatus.BAD_REQUEST),

    CATEGORY_NOT_FOUND(4001, "Category not found", HttpStatus.NOT_FOUND),
    CATEGORY_ALREADY_EXISTS(4002, "Category already exists", HttpStatus.CONFLICT),

    PUBLISHER_NOT_FOUND(5001, "Publisher not found", HttpStatus.NOT_FOUND),
    PUBLISHER_ALREADY_EXISTS(5002, "Publisher already exists", HttpStatus.CONFLICT),

    READING_LIST_NOT_FOUND(6001, "Reading list not found", HttpStatus.NOT_FOUND),
    BOOK_ALREADY_IN_LIST(6002, "Book is already in the reading list", HttpStatus.CONFLICT),
    BOOK_NOT_IN_LIST(6003, "Book is not in the reading list", HttpStatus.NOT_FOUND),
    UNAUTHORIZED_READING_LIST_ACCESS(6004, "Unauthorized access to reading list", HttpStatus.FORBIDDEN),

    REVIEW_NOT_FOUND(7001, "Review not found", HttpStatus.NOT_FOUND),
    REVIEW_ALREADY_EXISTS(7002, "Review already exists", HttpStatus.CONFLICT),
    UNAUTHORIZED_REVIEW_ACCESS(7003, "Unauthorized access to review", HttpStatus.FORBIDDEN),

    INTERNAL_ERROR(9001, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(9002, "Unauthorized", HttpStatus.UNAUTHORIZED),
    BAD_USER_CREDENTIALS(1001, "Bad user credentials", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(498, "Invalid or expired token", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED_ACCESS(401, "Unauthorized access", HttpStatus.UNAUTHORIZED),
    INTERNAL_SERVER_ERROR(500, "Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR),
    FORBIDDEN(403, "Forbidden, insufficient permissions", HttpStatus.FORBIDDEN);


    private final int code;
    private final String codeString;
    private final String description;
    private final int httpStatus;


    ReturnCodes(int code, String description, HttpStatus httpStatus) {
        this.code = code;
        this.codeString = String.valueOf(code);
        this.description = description;
        this.httpStatus = httpStatus.value();
    }

    @Override
    public String stringValue() {
        return codeString;
    }

    @Override
    public int intValue() {
        return code;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public int httpStatus() {
        return httpStatus;
    }

    @Override
    public boolean isSuccess() {
        return code == NO_ERROR.code;
    }

}
