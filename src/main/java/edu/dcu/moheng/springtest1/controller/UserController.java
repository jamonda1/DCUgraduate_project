package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.dto.LoginRequestDto;
import edu.dcu.moheng.springtest1.dto.SignupRequestDto;
import edu.dcu.moheng.springtest1.dto.UserResponseDto;
import edu.dcu.moheng.springtest1.jwt.JwtUtil;
import edu.dcu.moheng.springtest1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public UserResponseDto signup(@RequestBody SignupRequestDto requestDto) {
        return userService.signup(requestDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto requestDto) {
        // 로그인 성공 여부 확인
        UserResponseDto user = userService.login(requestDto);

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(requestDto.getEmail());

        // 토큰을 응답 헤더에 포함시켜 반환
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body(user); // 사용자 정보도 함께 반환
    }

    @GetMapping("/me")
    public UserResponseDto getMyInfo(@RequestHeader("Authorization") String authHeader) {
        // "Bearer <token>"에서 토큰만 추출
        String token = authHeader.replace("Bearer ", "");

        // 토큰에서 이메일 추출
        String email = jwtUtil.getEmailFromToken(token);

        // 이메일로 사용자 정보 조회
        return userService.getUserInfo(email);
    }
}

/*
[ 클라이언트 ]
   ↓ JSON 요청
[ @RequestBody → DTO 변환 ]
   ↓
[ 컨트롤러 메서드 호출 ]
   ↓
[ 서비스 로직 처리 (회원가입) ]
   ↓
[ UserResponseDto 생성 ]
   ↓
[ 컨트롤러에서 리턴 ]
   ↓
[ JSON 응답 → 클라이언트 ]
*/
