package edu.dcu.moheng.springtest1.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity // 이 클래스는 JPA 엔티티, 즉 DB 테이블과 매핑된다.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")  // users로 하지 않으면 403 Forbidden error 발생, user 라는 이름은 MySQL과 H2에서 예약어로 사용되고 있기 때문
public class User {
    // 유저가 가지고 있어야 하는 정보들
    @Id                                                 // 기본 키 (Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Id를 DB에서 자동으로 1씩 늘려준다. 이 Id를 통해 회원 정보를 조회하는 것이 가능
    private Long id;

    @Column(nullable = false, unique = true)    // null 불가능, 중복 불가능
    private String email;

    @Column(nullable = false)                   // null 불가능
    private String password;

    private String nickname;

    private String birthDate;
}
