package com.codewithgt.fullstack_backend.controller;
import com.codewithgt.fullstack_backend.exception.ManufacturerOrderNotFoundException;
import com.codewithgt.fullstack_backend.model.ManufacturerOrder;
import com.codewithgt.fullstack_backend.repository.ManufacturerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ManufacturerOrderController {
    @Autowired
    private ManufacturerOrderRepository manufacturerOrderRepository;

    @PostMapping("/manufacturerorder")
    ManufacturerOrder newManufacturerOrder(@RequestBody ManufacturerOrder newManufacturerOrder) {
        return manufacturerOrderRepository.save(newManufacturerOrder);
    }

    @GetMapping("/manufacturerorders")
    List<ManufacturerOrder> getAllManufacturerOrders() {
        return manufacturerOrderRepository.findAll();
    }

    @GetMapping("/manufacturerorders/{id}")
    ManufacturerOrder getManufacturerOrderById(@PathVariable Long id){
        return manufacturerOrderRepository.findById(id)
                .orElseThrow(()->new ManufacturerOrderNotFoundException(id));
    }


    @GetMapping("/manufacturerorders/count")
    public long countManufacturerOrders() {
        return manufacturerOrderRepository.count();
    }
    @PutMapping("/manufacturerorder/{id}")
    ManufacturerOrder updateManufacturerOrder(@RequestBody ManufacturerOrder newManufacturerOrder,@PathVariable Long id){
        return manufacturerOrderRepository.findById(id)
                .map(manufacturerOrder -> {
                    manufacturerOrder.setName(newManufacturerOrder.getName());
                    manufacturerOrder.setPrice(newManufacturerOrder.getPrice());
                    manufacturerOrder.setQuantity(newManufacturerOrder.getQuantity());

                    return manufacturerOrderRepository.save(manufacturerOrder);
                }).orElseThrow(() -> new ManufacturerOrderNotFoundException(id));
    }

    @DeleteMapping("/manufacturerorder/{id}")
    String deleteManufacturerOrder(@PathVariable Long id){
        if(!manufacturerOrderRepository.existsById(id)){
            throw new ManufacturerOrderNotFoundException(id);

        }
        manufacturerOrderRepository.deleteById(id);
        return "manufacturer with id "+id+" has been deleted successfully.";

    }
}

