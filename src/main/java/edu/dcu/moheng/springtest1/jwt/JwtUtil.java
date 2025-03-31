package edu.dcu.moheng.springtest1.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {  // 로그인 성공 시 JWT 토큰 발급, 요청에 포함된 토큰을 읽고 이메일 추출, 토큰이 유효한지 검사

    //  시크릿 키를 자동으로 생성해서 key에 저장 (토큰을 암호화/복호화하는 데 사용됨)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    //  토큰 유효 시간: 1일 (1000ms * 60s * 60m * 24h)
    private final long expireTimeMs = 1000 * 60 * 60 * 24;

    //  토큰 생성
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // 토큰 안에 email 정보 넣기
                .setExpiration(new Date(System.currentTimeMillis() + expireTimeMs)) // 만료 시간
                .signWith(key) // 키로 서명
                .compact();
    }

    //  토큰에서 이메일 추출
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    //  토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true; // 에러 없으면 유효함
        } catch (JwtException | IllegalArgumentException e) {
            return false; // 에러 있으면 잘못된 토큰
        }
    }
}

