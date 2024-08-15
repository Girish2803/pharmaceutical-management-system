package com.codewithgt.fullstack_backend.exception;

public class MedicineNotFoundException extends RuntimeException{
    public MedicineNotFoundException(Long id){
        super("Could not found the medicine with id " + id);
    }

    public MedicineNotFoundException(String name){
        super("Could not found the medicine with name " + name);
    }
}
