package com.codewithgt.fullstack_backend.controller;
import com.codewithgt.fullstack_backend.exception.SupplierNotFoundException;
import com.codewithgt.fullstack_backend.model.Supplier;
import com.codewithgt.fullstack_backend.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SupplierController {
    @Autowired
    private SupplierRepository supplierRepository;
    @PostMapping("/supplier")
    Supplier newSupplier(@RequestBody Supplier newSupplier) {
        return supplierRepository.save(newSupplier);
    }

    @GetMapping("/suppliers")
    List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }
    @GetMapping("/supplier/{id}")
    Supplier getSupplierById(@PathVariable Long id){
        return supplierRepository.findById(id)
                .orElseThrow(()->new SupplierNotFoundException(id));
    }
    @GetMapping("/supplier/checkUsername/{username}")
    boolean checkSupplierUsername(@PathVariable String username) {
        return supplierRepository.existsByUsername(username);
    }

    @PutMapping("/supplier/{id}")
    Supplier updateSupplier(@RequestBody Supplier newSupplier,@PathVariable Long id){
        return supplierRepository.findById(id)
                .map(supplier ->  {
                    supplier.setUsername(newSupplier.getUsername());
                    supplier.setPhone(newSupplier.getPhone());
                    supplier.setCompanyName(newSupplier.getCompanyName());
                    supplier.setEmail(newSupplier.getEmail());
                    return supplierRepository.save(supplier);
                }).orElseThrow(()->new SupplierNotFoundException(id));
    }
    @DeleteMapping("/supplier/{id}")
    String deleteSupplier(@PathVariable Long id){
        if(!supplierRepository.existsById(id)){
            throw new SupplierNotFoundException(id);

        }
        supplierRepository.deleteById(id);
        return "supplier with id "+id+" has been deleted successfully.";
    }

}
