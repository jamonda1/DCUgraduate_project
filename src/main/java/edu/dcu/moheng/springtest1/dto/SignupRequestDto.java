package edu.dcu.moheng.springtest1.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    // 회원가입에 필요한 정보들
    private String email;           // 이메일(아이디로 사용)
    private String password;        // 비밀번호
    private String passwordConfirm; // 비밀번호 확인
    private String nickname;        // 앱에서 사용할 닉네임
    private String birthDate;       // 연령별 선호 여행지 조회를 위한 생년월일
}
