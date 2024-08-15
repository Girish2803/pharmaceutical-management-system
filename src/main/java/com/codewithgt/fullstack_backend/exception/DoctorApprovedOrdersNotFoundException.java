package com.codewithgt.fullstack_backend.exception;

public class DoctorApprovedOrdersNotFoundException extends RuntimeException{
    public DoctorApprovedOrdersNotFoundException(Long id){
        super("could not find doctor order with id "+id);
    }
}
