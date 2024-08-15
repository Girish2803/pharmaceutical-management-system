package com.codewithgt.fullstack_backend.exception;

public class PharmacistKeMedicinesNotFoundException extends RuntimeException{
    public PharmacistKeMedicinesNotFoundException(Long id)
    {
        super("Could not found the medicine with id"+id);
    }
    public PharmacistKeMedicinesNotFoundException(String name){
        super("Could not found the medicine with name " + name);
    }
}
