package com.banking.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtil {

    // Key kamit kami 256-bit (32 characters) lamb pahije
    private static final String SECRET_STRING = "mysecretkeymysecretkeymysecretkey123";
    
    // String la secure SecretKey object madhe convert kela
    private static final SecretKey SECRET_KEY = 
            Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    public static String generateToken(String email) {
        return Jwts.builder()
                .subject(email) // Navin version madhe 'setSubject' cha 'subject' zala
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(SECRET_KEY) // Algorithm automatic detect hoto
                .compact();
    }

    public static String extractEmail(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(SECRET_KEY) // 'setSigningKey' chya jagi 'verifyWith'
                .build()
                .parseSignedClaims(token) // 'parseClaimsJws' chya jagi 'parseSignedClaims'
                .getPayload(); // 'getBody' chya jagi 'getPayload'

        return claims.getSubject();
    }
}