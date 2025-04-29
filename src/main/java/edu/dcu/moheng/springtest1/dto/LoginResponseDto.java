package edu.dcu.moheng.springtest1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDto { // 로그인 할 때 토큰도 반환
    private String email;
    private String nickname;
    private String birthDate;
    private String token;
}