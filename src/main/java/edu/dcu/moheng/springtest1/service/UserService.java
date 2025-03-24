package edu.dcu.moheng.springtest1.service;

import edu.dcu.moheng.springtest1.dto.LoginRequestDto;
import edu.dcu.moheng.springtest1.dto.SignupRequestDto;
import edu.dcu.moheng.springtest1.dto.UserResponseDto;
import edu.dcu.moheng.springtest1.entity.User;
import edu.dcu.moheng.springtest1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service    // 비즈니스 로직을 처리하는 비즈니스 게층, 이 클래스는 빈이 되어 스프링 컨테이너가 생성/관리/주입
public class UserService {
    // 회원가입, 로그인, 정보 조회를 담당하는 서비스 클래스, DTO를 생성하는 클래스

    @Autowired
    private UserRepository userRepository;      // DB에서 유저 데이터를 조회/저장/삭제하는 객체

    @Autowired
    private PasswordEncoder passwordEncoder;    // 비밀번호를 암호화하거나 비교할 때 사용

    public UserResponseDto signup(SignupRequestDto request) {               // 회원가입(이 메서드 내에서 SignupRequestDto는 request로 사용)
        if (!request.getPassword().equals(request.getPasswordConfirm())) {  // 회원가입 시 입력하는 "비밀번호"와 "비밀번호 확인" 비교
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {   // UserRepository를 통해 이미 가입된 사용자의 이메일을 조회하여 중복을 확인
            throw new IllegalArgumentException("이미 사용되고 있는 이메일입니다.");
        }

        User user = User.builder()  // SignupRequestDto 객체 의 필드를 꺼내서 User 객체를 채운다.
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))    // 입력한 비밀번호는 단방향으로 압호화하여 저장
                .nickname(request.getNickname())
                .birthDate(request.getBirthDate())
                .build();           // 위의 필드들을 바탕으로 User 객체를 생성해준다.

        userRepository.save(user);  // 생성된 user의 값을 DB에 저장한다.

        return UserResponseDto.from(user);  // 각 정보를 리턴할 준비 완료. 코드의 중복을 제거하기 위해 변환
        /*return UserResponseDto.builder()        // Build 객체 생성, 비밀번호는 리턴하지 않음
                .email(user.getEmail())         // user에 저장된 이메일 리턴
                .nickname(user.getNickname())   // user에 저장된 닉네임 리턴
                .birthDate(user.getBirthDate()) // user에 저장된 생년월일 리턴
                .build();*/
    }

    public UserResponseDto login(LoginRequestDto request) { // 로그인
        User user = userRepository.findByEmail(request.getEmail())  // UserRepository에서 입력한 이메일을 가진 User를 찾는다.
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {  // matches()를 통해 암호화된 비밀번호를 비교
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        return UserResponseDto.from(user);  // 회원가입, 로그인에도 메인 화면 등에서 내 정보가 바로 필요할 때가 있다.
    }

    public UserResponseDto getUserInfo(String email) {  // 조회
        User user = userRepository.findByEmail(email)   // 이메일로 유저를 찾아서 확인
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        return UserResponseDto.from(user);
    }
}
