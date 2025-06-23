package com.url.shortner.security.jwt;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class jwtAuthenticationResponse {
    private String token;
}
