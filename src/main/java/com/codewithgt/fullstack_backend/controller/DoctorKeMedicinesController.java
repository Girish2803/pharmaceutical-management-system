package com.codewithgt.fullstack_backend.controller;

import com.codewithgt.fullstack_backend.exception.DoctorKeMedicinesNotFoundException;

import com.codewithgt.fullstack_backend.model.Doctorkemedicines;
import com.codewithgt.fullstack_backend.repository.DoctorkemedicineRepostiroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DoctorKeMedicinesController {
    @Autowired
    private DoctorkemedicineRepostiroy doctorkemedicineRepostiroy;
    @PostMapping("/doctorkemedicine")
    Doctorkemedicines newDoctorKeMedicines(@RequestBody Doctorkemedicines newDoctorKeMedicines) {
        return doctorkemedicineRepostiroy.save(newDoctorKeMedicines);
    }

    @GetMapping("/doctorkemedicines")
        List<Doctorkemedicines> getAllDoctorKeMedicines() {
        return doctorkemedicineRepostiroy.findAll();
    }
    @GetMapping("/doctorkemedicine/{id}")
    Doctorkemedicines getDoctorKeMedicinesById(@PathVariable Long id){
        return doctorkemedicineRepostiroy.findById(id)
                .orElseThrow(()->new DoctorKeMedicinesNotFoundException(id));
    }

    @PutMapping("/doctorkemedicine/{id}")
    Doctorkemedicines updateDoctorKeMedicines(@RequestBody Doctorkemedicines newDoctorKeMedicines,@PathVariable Long id){
        return doctorkemedicineRepostiroy.findById(id)
                .map(doctorkemedicines ->  {
                    doctorkemedicines.setName(newDoctorKeMedicines.getName());
                    doctorkemedicines.setManufacture_date(newDoctorKeMedicines.getManufacture_date());
                    doctorkemedicines.setExpiry_date(newDoctorKeMedicines.getExpiry_date());
                    doctorkemedicines.setPrice(newDoctorKeMedicines.getPrice());
                    doctorkemedicines.setQuantity(newDoctorKeMedicines.getQuantity());
                    return doctorkemedicineRepostiroy.save(doctorkemedicines);
                }).orElseThrow(()->new DoctorKeMedicinesNotFoundException(id));
    }
    @DeleteMapping("/doctorkemedicine/{id}")
    String deleteDoctorKeMedicines(@PathVariable Long id){
        if(!doctorkemedicineRepostiroy.existsById(id)){
            throw new DoctorKeMedicinesNotFoundException(id);

        }
        doctorkemedicineRepostiroy.deleteById(id);
        return "doctor ke medicines with id "+id+" has been deleted successfully.";
    }

}
