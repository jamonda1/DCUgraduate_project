package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.dto.LoginRequestDto;
import edu.dcu.moheng.springtest1.dto.SignupRequestDto;
import edu.dcu.moheng.springtest1.dto.UserResponseDto;
import edu.dcu.moheng.springtest1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController                 // 이 클래스는 REST API이고, 클라이언트에 JSON 형식으로 응답.
@RequestMapping("/api/user")
public class UserController {   // 클라이언트의 요청에 맞는 메서드를 실행
// DTO를 클라이언트에 전달하는 클래스
    @Autowired
    private UserService userService;

    @PostMapping("/signup") // HTTP 요청 중 POST /api/user/signup 요청이 들어왔을 때 실행
    // 메서드가 실행되면 UserResponseDto 값을 클라이언트에 JSON 형태로 리턴
    // HTTP를 통해 받은 JSON 형태의 내용을 @RequestBody가 SignupRequestDto에 맞게 JAVA 형태로 변환
    public UserResponseDto signup(@RequestBody SignupRequestDto requestDto) {
        return userService.signup(requestDto);
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody LoginRequestDto requestDto) {
        return userService.login(requestDto);
    }

    @GetMapping("/me")
    public UserResponseDto getMyInfo(@RequestParam String email) {
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
