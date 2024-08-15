package com.codewithgt.fullstack_backend.controller;
import com.codewithgt.fullstack_backend.exception.UserNotFoundException;
import com.codewithgt.fullstack_backend.model.Admin;
import com.codewithgt.fullstack_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:3000")
public class adminController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/admin")
    Admin newAdmin(@RequestBody Admin newAdmin) {
        return adminRepository.save(newAdmin);
    }

    @GetMapping("/admins")
    List<Admin> getAllAdmins() {
        return adminRepository.findAll(); // Now `findAll` is static
    }

    @GetMapping("/admin/{id}")
    Admin getAdminById(@PathVariable Long id){
        return adminRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }
    @GetMapping("/admin/checkUsername/{username}")
    boolean checkAdminUsername(@PathVariable String username) {
        return adminRepository.existsByUsername(username);
    }
    @PutMapping("/admin/{id}")
    Admin updateAdmin(@RequestBody Admin newAdmin,@PathVariable Long id){
        return adminRepository.findById(id)
                .map(admin ->  {
                    admin.setUsername(newAdmin.getUsername());
                    admin.setName(newAdmin.getName());
                    admin.setSpecialization(newAdmin.getSpecialization());
                    return adminRepository.save(admin);
                }).orElseThrow(()->new UserNotFoundException(id));
    }
    @GetMapping("/admins/count")
    public long countAdmins() {
        return adminRepository.count();
    }

    @DeleteMapping("/admin/{id}")
    String deleteAdmin(@PathVariable Long id){
        if(!adminRepository.existsById(id)){
            throw new UserNotFoundException(id);

        }
        adminRepository.deleteById(id);
        return "doctor with id "+id+" has been deleted successfully.";

    }
}