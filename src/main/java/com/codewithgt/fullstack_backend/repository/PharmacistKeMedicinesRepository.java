package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.PharmacistKeMedicines;
import com.codewithgt.fullstack_backend.model.medicines;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PharmacistKeMedicinesRepository extends JpaRepository<PharmacistKeMedicines,Long> {
    Optional<PharmacistKeMedicines> findByName(String name);
}
