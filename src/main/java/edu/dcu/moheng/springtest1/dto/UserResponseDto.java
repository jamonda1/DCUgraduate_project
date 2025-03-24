package edu.dcu.moheng.springtest1.dto;

import edu.dcu.moheng.springtest1.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {
    // 유저가 자신의 정보를 조회할 때 리턴되는 정보들, 비밀번호는 암호화되어 있기 떄문에 개인정보 조회에 리턴x
    private String email;       // 이메일을 아이디로 사용
    private String nickname;    // 닉네임
    private String birthDate;   // 생년월일

    public static UserResponseDto from(User user) {
        return UserResponseDto.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .birthDate(user.getBirthDate())
                .build();
    }
}
