package com.codewithgt.fullstack_backend.controller;

import com.codewithgt.fullstack_backend.exception.MedicineNotFoundException;
import com.codewithgt.fullstack_backend.model.medicines;
import com.codewithgt.fullstack_backend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class medicineController {
    @Autowired
    private MedicineRepository medicineRepository;

    @PostMapping("/medicine")
    public medicines newMedicine(@RequestBody medicines newMedicine) {
        return medicineRepository.save(newMedicine);
    }
    @GetMapping("/medicines/count")
    public long countMedicines() {
        return medicineRepository.count();
    }

    @GetMapping("/medicines")
    public List<medicines> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @GetMapping("/medicine/{id}")
    public medicines getMedicineById(@PathVariable Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new MedicineNotFoundException(id));
    }

    @GetMapping("/medicine/name/{name}")
    public medicines getMedicineByName(@PathVariable String name) {
        return medicineRepository.findByName(name)
                .orElseThrow(() -> new MedicineNotFoundException(name));
    }
    @PutMapping("/medicine/{id}")
    public medicines updateMedicine(@RequestBody medicines newMedicine, @PathVariable Long id) {
        return medicineRepository.findById(id)
                .map(medicine -> {
                    medicine.setName(newMedicine.getName());
                    medicine.setManufacture_date(newMedicine.getManufacture_date());
                    medicine.setExpiry_date(newMedicine.getExpiry_date());
                    medicine.setPrice(newMedicine.getPrice());
                    medicine.setQuantity(newMedicine.getQuantity());
                    return medicineRepository.save(medicine);
                }).orElseThrow(() -> new MedicineNotFoundException(id));
    }

    @DeleteMapping("/medicine/{id}")
    public String deleteMedicine(@PathVariable Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new MedicineNotFoundException(id);
        }
        medicineRepository.deleteById(id);
        return "Medicine with id " + id + " has been deleted successfully.";
    }
}
