package com.codewithgt.fullstack_backend.exception;

public class ManufacturerNotFoundException extends RuntimeException{
    public ManufacturerNotFoundException(Long id)
    {
        super("could not find manufacturer with id "+id);
    }
}
