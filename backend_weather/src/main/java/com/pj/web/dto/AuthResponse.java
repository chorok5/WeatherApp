package com.pj.web.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	private String token;
    private String username;
    private Long userId;
    private String role;
    private LocalDateTime expiresAt;
}
