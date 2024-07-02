package com.pj.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pj.web.auth.JwtTokenProvider;
import com.pj.web.dto.AuthResponseDTO;
import com.pj.web.dto.LoginDTO;
import com.pj.web.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	

	@Autowired
	private AuthService authService;
	
	private final LoginDTO loginDTO;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        if (authService.authenticate(loginDTO.getUsername(), loginDTO.getPassword())) {
            String token = jwtTokenProvider.createToken(loginDTO.getUsername());
            return ResponseEntity.ok(new AuthResponseDTO(token));
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }


}
