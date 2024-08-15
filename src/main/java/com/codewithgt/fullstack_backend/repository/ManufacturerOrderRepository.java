package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.Manufacturer;
import com.codewithgt.fullstack_backend.model.ManufacturerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManufacturerOrderRepository extends JpaRepository<ManufacturerOrder,Long> {
}
