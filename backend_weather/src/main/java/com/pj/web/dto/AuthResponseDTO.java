package com.pj.web.dto;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class AuthResponseDTO {
    private String token;

    public AuthResponseDTO() {
    }

    public AuthResponseDTO(String token) {
        this.token = token;
    }

    // Getter and setter
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
