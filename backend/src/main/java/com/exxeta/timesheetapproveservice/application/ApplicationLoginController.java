package com.exxeta.timesheetapproveservice.application;

import com.exxeta.timesheetapproveservice.domain.AppLoginData;
import com.exxeta.timesheetapproveservice.service.UserDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("auth")
public class ApplicationLoginController {
    @Autowired
    UserDBRepository userDBRepository;

    @GetMapping()
    public ResponseEntity authenticateUser(@RequestParam String appUser, @RequestParam String password ){

        if (userDBRepository.loginDataIsValid(appUser, password)){
            AppLoginData appLoginData= new AppLoginData(appUser, password, userDBRepository.userIsStudent(appUser));
            return ResponseEntity.ok(appLoginData);
        }
        else {
            return ResponseEntity.badRequest().body("Login failed.");
        }
    }
}
