package com.codewithgt.fullstack_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codewithgt.fullstack_backend.model.Admin;
public interface AdminRepository extends JpaRepository<Admin,Long>{
    boolean existsByUsername(String username);
}
