package com.banking.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.banking.backend.entity.User;
import com.banking.backend.model.LoginRequest;
import com.banking.backend.model.LoginResponse;
import com.banking.backend.model.RegisterRequest;
import com.banking.backend.model.RegisterResponse;
import com.banking.backend.repository.UserRepository;
import com.banking.backend.security.JwtUtil;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public RegisterResponse register(
            @RequestBody RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new RegisterResponse("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        userRepository.save(user);

        return new RegisterResponse("Registration Successful");
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new LoginResponse("User Not Found", null);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse("Invalid Password", null);
        }

        String token = JwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                "Login Successful",
                token
        );
    }
}