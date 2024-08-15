package com.codewithgt.fullstack_backend.controller;

import com.codewithgt.fullstack_backend.exception.ApprovedOrderNotFoundException;
import com.codewithgt.fullstack_backend.exception.ManufacturerNotFoundException;
import com.codewithgt.fullstack_backend.model.ApprovedOrder;
import com.codewithgt.fullstack_backend.model.Manufacturer;
import com.codewithgt.fullstack_backend.repository.ApprovedOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ApprovedOrderController {
    @Autowired
    private ApprovedOrderRepository approvedOrderRepository;


    @PostMapping("/approvedorder")
    ApprovedOrder newApprovedOrder(@RequestBody ApprovedOrder newApprovedOrder) {
        return approvedOrderRepository.save(newApprovedOrder);
    }

    @GetMapping("/approvedorders")
    List<ApprovedOrder> getAllApprovedOrders() {
        return approvedOrderRepository.findAll();
    }

    @GetMapping("/approvedorder/{id}")
    ApprovedOrder getApprovedOrderById(@PathVariable Long id){
        return approvedOrderRepository.findById(id)
                .orElseThrow(()->new ApprovedOrderNotFoundException(id));
    }
    @GetMapping("/approvedorders/count")
    public long countApprovedOrders() {
        return approvedOrderRepository.count();
    }
    @PutMapping("/approvedorder/{id}")
    ApprovedOrder updateApprovedOrder(@RequestBody ApprovedOrder newApprovedOrder,@PathVariable Long id){
        return approvedOrderRepository.findById(id)
                .map(approvedOrder ->  {
                   approvedOrder.setName(newApprovedOrder.getName());
                    approvedOrder.setPrice(newApprovedOrder.getPrice());
                    approvedOrder.setQuantity(newApprovedOrder.getQuantity());
                    return approvedOrderRepository.save(approvedOrder);
                }).orElseThrow(()->new ApprovedOrderNotFoundException(id));
    }

    @DeleteMapping("/approveorder/{id}")
    String deleteApprovedOrder(@PathVariable Long id){
        if(!approvedOrderRepository.existsById(id)){
            throw new ApprovedOrderNotFoundException(id);

        }
        approvedOrderRepository.deleteById(id);
        return "approved order with id "+id+" has been deleted successfully.";

    }
}
