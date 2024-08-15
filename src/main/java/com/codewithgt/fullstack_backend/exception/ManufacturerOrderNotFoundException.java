package com.codewithgt.fullstack_backend.exception;

public class ManufacturerOrderNotFoundException extends RuntimeException{
    public ManufacturerOrderNotFoundException(Long id)
    {
        super("Could not found the manufacturer order with id"+id);
    }
}
