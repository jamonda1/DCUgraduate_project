package edu.dcu.moheng.springtest1.repository;

import edu.dcu.moheng.springtest1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 유저 정보를 DB에서 저장/조회/수정이 가능하게 하는 레포지토리 인터페이스
    // Spring Data JPA가 제공하는 JpaRepository를 상속해서, User 엔티티를 기본 키 타입이 Long인 테이블로 다룰 수 있게 한다.
    // JpaRepository를 상속하면 CRUD 메서드 자동 생성된다.
    Optional<User> findByEmail(String email);   // 이메일을 기반으로 User를 조회
}
