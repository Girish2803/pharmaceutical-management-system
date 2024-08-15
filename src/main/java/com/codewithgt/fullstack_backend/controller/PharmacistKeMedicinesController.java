package com.codewithgt.fullstack_backend.controller;

import com.codewithgt.fullstack_backend.exception.MedicineNotFoundException;
import com.codewithgt.fullstack_backend.exception.PharmacistKeMedicinesNotFoundException;
import com.codewithgt.fullstack_backend.exception.PharmacistNotFoundException;
import com.codewithgt.fullstack_backend.model.Pharmacist;
import com.codewithgt.fullstack_backend.model.PharmacistKeMedicines;
import com.codewithgt.fullstack_backend.model.medicines;
import com.codewithgt.fullstack_backend.repository.PharmacistKeMedicinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class PharmacistKeMedicinesController {
    @Autowired
    private PharmacistKeMedicinesRepository pharmacistKeMedicinesRepository;
    @PostMapping("/pharmacistkemedicine")
    PharmacistKeMedicines newPharmacistKeMedicines(@RequestBody PharmacistKeMedicines newPharmacistKeMedicines) {
        return pharmacistKeMedicinesRepository.save(newPharmacistKeMedicines);
    }
    @GetMapping("/pharmacistkemedicines/count")
    public long countPharmacistKeMedicines() {
        return pharmacistKeMedicinesRepository.count();
    }

    @GetMapping("/pharmacistskemedicines")
    List<PharmacistKeMedicines> getAllPharmacistsKeMedicines() {
        return pharmacistKeMedicinesRepository.findAll();
    }
    @GetMapping("/pharmacistkemedicines/{id}")
    PharmacistKeMedicines getPharmacistKeMedicinesById(@PathVariable Long id){
        return pharmacistKeMedicinesRepository.findById(id)
                .orElseThrow(()->new PharmacistKeMedicinesNotFoundException(id));
    }
    @GetMapping("/pharmacistkemedicines/name/{name}")
    public PharmacistKeMedicines getPharmacistKeMedicineByName(@PathVariable String name) {
        return pharmacistKeMedicinesRepository.findByName(name)
                .orElseThrow(() -> new PharmacistKeMedicinesNotFoundException(name));
    }
    @PutMapping("/pharmacistkemedicines/{id}")
    PharmacistKeMedicines updatePharmacistKeMedicines(@RequestBody PharmacistKeMedicines newPharmacistKeMedicines,@PathVariable Long id){
        return pharmacistKeMedicinesRepository.findById(id)
                .map(pharmacistKeMedicines ->  {
                    pharmacistKeMedicines.setName(newPharmacistKeMedicines.getName());
                    pharmacistKeMedicines.setManufacture_date(newPharmacistKeMedicines.getManufacture_date());
                    pharmacistKeMedicines.setExpiry_date(newPharmacistKeMedicines.getExpiry_date());
                    pharmacistKeMedicines.setPrice(newPharmacistKeMedicines.getPrice());
                    pharmacistKeMedicines.setQuantity(newPharmacistKeMedicines.getQuantity());
                    return pharmacistKeMedicinesRepository.save(pharmacistKeMedicines);
                }).orElseThrow(()->new PharmacistKeMedicinesNotFoundException(id));
    }

    @DeleteMapping("/pharmacistkemedicines/{id}")
    String deletePharmacistKeMedicines(@PathVariable Long id){
        if(!pharmacistKeMedicinesRepository.existsById(id)){
            throw new PharmacistKeMedicinesNotFoundException(id);

        }
        pharmacistKeMedicinesRepository.deleteById(id);
        return "pharmacist ke medicines with id "+id+" has been deleted successfully.";
    }

}
