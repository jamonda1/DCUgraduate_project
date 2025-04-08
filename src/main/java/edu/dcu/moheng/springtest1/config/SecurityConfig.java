package edu.dcu.moheng.springtest1.config;

import edu.dcu.moheng.springtest1.jwt.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration  // SpringBoot의 설정 클래스
public class SecurityConfig {

    private final JwtFilter jwtFilter;              // JWT 필터 주입

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean   // spring에 bean으로 등록
    public PasswordEncoder passwordEncoder() {  // 비밀번호 단방향 암호화
        return new BCryptPasswordEncoder();
    }

    @Bean   // spring에 bean으로 등록
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {    // URL별 요청 허용 제한
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/signup").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/images/upload").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                // ✅ JwtFilter를 UsernamePasswordAuthenticationFilter 앞에 넣기
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
