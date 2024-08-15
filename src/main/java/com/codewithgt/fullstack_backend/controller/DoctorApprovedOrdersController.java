package com.codewithgt.fullstack_backend.controller;

import com.codewithgt.fullstack_backend.exception.DoctorApprovedOrdersNotFoundException;
import com.codewithgt.fullstack_backend.exception.DoctorKeMedicinesNotFoundException;
import com.codewithgt.fullstack_backend.model.DoctorApprovedOrders;
import com.codewithgt.fullstack_backend.repository.DoctorApprovedOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DoctorApprovedOrdersController {
    @Autowired
    private DoctorApprovedOrdersRepository doctorApprovedOrdersRepository;

    @PostMapping("/doctorapprovedorder")
    DoctorApprovedOrders newDoctorApprovedOrder(@RequestBody DoctorApprovedOrders newDoctorApprovedOrder) {
        return doctorApprovedOrdersRepository.save(newDoctorApprovedOrder);
    }

    @GetMapping("/doctorapprovedorders")
    List<DoctorApprovedOrders> getAllDoctorApprovedOrders() {
        return doctorApprovedOrdersRepository.findAll();
    }

    @GetMapping("/doctorapprovedorder/{id}")
    DoctorApprovedOrders getDoctorApprovedOrderById(@PathVariable Long id){
        return doctorApprovedOrdersRepository.findById(id)
                .orElseThrow(()->new DoctorApprovedOrdersNotFoundException(id));
    }
    @GetMapping("/doctorapprovedorders/count")
    public long countDoctorApprovedOrders() {
        return doctorApprovedOrdersRepository.count();
    }
    @PutMapping("/doctorapprovedorder/{id}")
    DoctorApprovedOrders updateDoctorApprovedOrder(@RequestBody DoctorApprovedOrders newDoctorApprovedOrder,@PathVariable Long id){
        return doctorApprovedOrdersRepository.findById(id)
                .map(doctorApprovedOrders ->  {
                    doctorApprovedOrders.setName(newDoctorApprovedOrder.getName());
                    doctorApprovedOrders.setPrice(newDoctorApprovedOrder.getPrice());
                    doctorApprovedOrders.setQuantity(newDoctorApprovedOrder.getQuantity());
                    return doctorApprovedOrdersRepository.save(doctorApprovedOrders);
                }).orElseThrow(()->new DoctorKeMedicinesNotFoundException(id));
    }

    @DeleteMapping("/doctorapproveorder/{id}")
    String deleteDoctorApprovedOrder(@PathVariable Long id){
        if(!doctorApprovedOrdersRepository.existsById(id)){
            throw new DoctorApprovedOrdersNotFoundException(id);

        }
        doctorApprovedOrdersRepository.deleteById(id);
        return "approved order with id "+id+" has been deleted successfully.";

    }
}
