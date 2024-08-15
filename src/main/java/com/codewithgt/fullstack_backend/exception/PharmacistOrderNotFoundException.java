package com.codewithgt.fullstack_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class PharmacistOrderNotFoundException extends RuntimeException{
    public PharmacistOrderNotFoundException(Long id){


    }
}
