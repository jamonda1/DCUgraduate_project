package edu.dcu.moheng.springtest1.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    // 로그인에 필요한 정보들
    private String email;       // 이메일이 아이디로 사용
    private String password;    // Signup에서 입력한 비밀번호
}
