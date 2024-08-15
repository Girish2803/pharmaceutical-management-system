package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.PharmacistOrders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PharmacistOrderRepository extends JpaRepository<PharmacistOrders,Long> {

}
