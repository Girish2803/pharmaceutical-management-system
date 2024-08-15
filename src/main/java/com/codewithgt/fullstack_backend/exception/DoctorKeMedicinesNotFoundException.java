package com.codewithgt.fullstack_backend.exception;

public class DoctorKeMedicinesNotFoundException extends RuntimeException {
    public DoctorKeMedicinesNotFoundException(Long id) {
        super("Could not found the medicine with id " + id);
    }
}