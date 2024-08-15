package com.codewithgt.fullstack_backend.exception;

public class ApprovedOrderNotFoundException extends RuntimeException{
    public ApprovedOrderNotFoundException(Long id){
        super("could not find manufacturer with id "+id);
    }
}
