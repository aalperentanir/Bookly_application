package com.aalperen.bookly.exception;


import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Hidden
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice(basePackages = "com.aalperen.bookly.controller")
public class ExternalApiExceptionHandler {


    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<BaseRestResponse> handleAllException(Exception ex){
        log.error("handleAllException::{}",ex.getMessage(), ex);

        BaseRestResponse response = new BaseRestResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({BusinessException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseRestResponse> handleBusinessException(BusinessException ex) {
        log.error("handleBusinessException::{}",ex.getMessage(), ex);

        BaseRestResponse response = new BaseRestResponse(ex.getCode(), ex.getErrorMessage());

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
