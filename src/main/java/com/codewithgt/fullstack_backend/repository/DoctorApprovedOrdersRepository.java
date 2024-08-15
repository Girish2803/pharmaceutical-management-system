package com.codewithgt.fullstack_backend.repository;

import com.codewithgt.fullstack_backend.model.DoctorApprovedOrders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorApprovedOrdersRepository extends JpaRepository<DoctorApprovedOrders,Long> {

}
