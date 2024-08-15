package com.codewithgt.fullstack_backend.controller;
import com.codewithgt.fullstack_backend.exception.PharmacistOrderNotFoundException;
import com.codewithgt.fullstack_backend.model.PharmacistOrders;
import com.codewithgt.fullstack_backend.repository.PharmacistOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class PharmacistOrderController {
    @Autowired
    private PharmacistOrderRepository pharmacistOrderRepository;

    @PostMapping("/pharmacistrorder")
    PharmacistOrders newPharmacistOrders(@RequestBody PharmacistOrders newPharmacistOrders) {
        return pharmacistOrderRepository.save(newPharmacistOrders);
    }

    @GetMapping("/pharmacistorders")
    List<PharmacistOrders> getAllPharmacistOrders() {
        return pharmacistOrderRepository.findAll();
    }

    @GetMapping("/pharmacistorders/{id}")
    PharmacistOrders getPharmacistOrdersById(@PathVariable Long id){
        return pharmacistOrderRepository.findById(id)
                .orElseThrow(()->new PharmacistOrderNotFoundException(id));
    }


    @GetMapping("/pharmacistorders/count")
    public long countPharmacistOrders() {
        return pharmacistOrderRepository.count();
    }
    @PutMapping("/pharmacistOrder/{id}")
    PharmacistOrders updatePharmacistOrders(@RequestBody PharmacistOrders newPharmacistOrder,@PathVariable Long id){
        return pharmacistOrderRepository.findById(id)
                .map(pharmacistOrders -> {
                    pharmacistOrders.setName(newPharmacistOrder.getName());
                    pharmacistOrders.setPrice(newPharmacistOrder.getPrice());
                    pharmacistOrders.setQuantity(newPharmacistOrder.getQuantity());

                    return pharmacistOrderRepository.save(pharmacistOrders);
                }).orElseThrow(() -> new PharmacistOrderNotFoundException(id));
    }

    @DeleteMapping("/pharmacistorder/{id}")
    String deletePharmacistOrder(@PathVariable Long id){
        if(!pharmacistOrderRepository.existsById(id)){
            throw new PharmacistOrderNotFoundException(id);

        }
        pharmacistOrderRepository.deleteById(id);
        return "pharmacist order with id "+id+" has been deleted successfully.";

    }
}
