package com.codewithgt.fullstack_backend.controller;
import com.codewithgt.fullstack_backend.exception.ManufacturerNotFoundException;
import com.codewithgt.fullstack_backend.exception.UserNotFoundException;
import com.codewithgt.fullstack_backend.model.Admin;
import com.codewithgt.fullstack_backend.model.Manufacturer;
import com.codewithgt.fullstack_backend.repository.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ManufacturerController {
    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @PostMapping("/manufacturer")
    Manufacturer newManufacturer(@RequestBody Manufacturer newManufacturer) {
        return manufacturerRepository.save(newManufacturer);
    }

    @GetMapping("/manufacturers")
    List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }

    @GetMapping("/manufacturer/{id}")
        Manufacturer getManufacturerById(@PathVariable Long id){
            return manufacturerRepository.findById(id)
                    .orElseThrow(()->new ManufacturerNotFoundException(id));
        }

    @GetMapping("/manufacturer/checkUsername/{username}")
    boolean checkManufacturerUsername(@PathVariable String username) {
        return manufacturerRepository.existsByUsername(username);
    }

    @PutMapping("/manufacturer/{id}")
    Manufacturer updateManufacturer(@RequestBody Manufacturer newManufacturer,@PathVariable Long id){
        return manufacturerRepository.findById(id)
                .map(manufacturer ->  {
                    manufacturer.setUsername(newManufacturer.getUsername());
                    manufacturer.setPhone(newManufacturer.getPhone());
                    manufacturer.setEmail(newManufacturer.getEmail());
                    manufacturer.setLocation(newManufacturer.getLocation());
                    return manufacturerRepository.save(manufacturer);
                }).orElseThrow(()->new ManufacturerNotFoundException(id));
    }
    @GetMapping("/manufacturers/count")
    public long countManufacturers() {
        return manufacturerRepository.count();
    }

    @DeleteMapping("/manufacturer/{id}")
    String deleteManufacturer(@PathVariable Long id){
        if(!manufacturerRepository.existsById(id)){
            throw new ManufacturerNotFoundException(id);

        }
        manufacturerRepository.deleteById(id);
        return "manufacturer with id "+id+" has been deleted successfully.";

    }
}