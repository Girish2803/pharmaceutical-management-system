package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.ApprovedOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovedOrderRepository extends JpaRepository<ApprovedOrder,Long> {

}
