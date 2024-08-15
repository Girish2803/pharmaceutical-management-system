package com.codewithgt.fullstack_backend.controller;
import com.codewithgt.fullstack_backend.exception.PharmacistNotFoundException;
import com.codewithgt.fullstack_backend.model.Pharmacist;
import com.codewithgt.fullstack_backend.repository.PharmacistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:3000")
public class PharmacistController {
    @Autowired
    private PharmacistRepository pharmacistRepository;
    @PostMapping("/pharmacist")
    Pharmacist newPharmacist(@RequestBody Pharmacist newPharmacist) {
        return pharmacistRepository.save(newPharmacist);
    }

    @GetMapping("/pharmacists")
    List<Pharmacist> getAllPharmacists() {
        return pharmacistRepository.findAll();
    }
    @GetMapping("/pharmacist/{id}")
    Pharmacist getPharmacistById(@PathVariable Long id){
        return pharmacistRepository.findById(id)
                .orElseThrow(()->new PharmacistNotFoundException(id));
    }
    @GetMapping("/pharmacist/checkUsername/{username}")
    boolean checkPharmacistUsername(@PathVariable String username) {
        return pharmacistRepository.existsByUsername(username);
    }

    @PutMapping("/pharmacist/{id}")
    Pharmacist updatePharmacist(@RequestBody Pharmacist newPharmacist,@PathVariable Long id){
        return pharmacistRepository.findById(id)
                .map(pharmacist ->  {
                    pharmacist.setUsername(newPharmacist.getUsername());
                    pharmacist.setPhone(newPharmacist.getPhone());
                    pharmacist.setSpecialization(newPharmacist.getSpecialization());
                    pharmacist.setLicenseId(newPharmacist.getLicenseId());
                    return pharmacistRepository.save(pharmacist);
                }).orElseThrow(()->new PharmacistNotFoundException(id));
    }
    @GetMapping("/pharmacists/count")
    public long countPharmacists() {
        return pharmacistRepository.count();
    }

    @DeleteMapping("/pharmacist/{id}")
    String deletePharmacist(@PathVariable Long id){
        if(!pharmacistRepository.existsById(id)){
            throw new PharmacistNotFoundException(id);

        }
        pharmacistRepository.deleteById(id);
        return "doctor with id "+id+" has been deleted successfully.";
    }
}
