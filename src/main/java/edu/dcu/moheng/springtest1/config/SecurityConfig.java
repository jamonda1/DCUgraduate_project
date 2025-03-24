package edu.dcu.moheng.springtest1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@Configuration  // 이 클래스는 설정 클래스라임을 나타내는 어노테이션
public class SecurityConfig {

    @Bean       // 이것을 사용해야 다른 클래스에서 @Autowired를 통해 주입을 할 수 있다.
    public PasswordEncoder passwordEncoder() {  // 비밀번호를 단방향 암호화
        return new BCryptPasswordEncoder();     // 다른 메서드에서 passwordEncoder()를 호출하면 BCryt~~를 리턴
    }

    @Bean   // 스프링에 bean으로 등록되어서 다른 곳에서 사용 가능
    // SecurityFilterChain에서 spring security의 핵심 보안 규칙들을 설정
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {    // 요청에 따라 인증 필요 유무 구분
        http
                .csrf(csrf -> csrf.disable())   // 사용자가 의도하지 않은 요청을 서버에 보내는 것을 보호 (여기서는 해제)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // permitAll()은 인증 없이 요청을 허용
                        .requestMatchers(HttpMethod.POST, "/api/user/signup").permitAll() //
                        .requestMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated()   // 위의 요청 외의 요청은 모두 인증이 필요
                )
                .headers(headers -> headers // h2-console이 iframe을 사용하는데, 보안상 막혀있음. 이것을 풀어야 /h2-console에 접속 가능
                        .frameOptions(frame -> frame.disable())
                );

        return http.build();
    }
}
