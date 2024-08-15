package com.codewithgt.fullstack_backend.repository;
import com.codewithgt.fullstack_backend.model.Pharmacist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PharmacistRepository extends JpaRepository<Pharmacist, Long> {
    boolean existsByUsername(String username);
}
