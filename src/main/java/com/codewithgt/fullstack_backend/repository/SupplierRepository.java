package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {
    boolean existsByUsername(String username);
}
