package com.codewithgt.fullstack_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codewithgt.fullstack_backend.model.medicines;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<medicines, Long> {
    Optional<medicines> findByName(String name);
}