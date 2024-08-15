package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManufacturerRepository extends JpaRepository<Manufacturer,Long> {
    boolean existsByUsername(String username);
}
