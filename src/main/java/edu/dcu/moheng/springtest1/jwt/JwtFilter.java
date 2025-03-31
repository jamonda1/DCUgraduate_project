package edu.dcu.moheng.springtest1.jwt;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;


@Component
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil;

    // JwtUtil은 생성자로 주입받아 사용
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String authorizationHeader = httpRequest.getHeader("Authorization");

        // Authorization: Bearer <token> 형태여야 함
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // "Bearer " 이후 문자열만 추출

            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.getEmailFromToken(token);

                //  Spring Security에게 인증 정보 세팅
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                email, // principal (우리는 email)
                                null,  // credentials (암호 필요 없음)
                                List.of(new SimpleGrantedAuthority("USER")) // 권한 (임시로 USER)
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
                return;
            }
        }

        // 다음 필터로 요청 계속 전달
        chain.doFilter(request, response);
    }

}

