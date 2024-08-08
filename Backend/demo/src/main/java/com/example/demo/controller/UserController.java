package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        try {
            User user = userService.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());
            if (user != null) {
                return ResponseEntity.ok(user); // Return the user object if login is successful
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        try {
            userService.registerUser(newUser);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
