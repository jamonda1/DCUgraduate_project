package edu.dcu.moheng.springtest1.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity // 이 클래스는 JPA 엔티티, 즉 DB 테이블과 매핑된다.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id // 기본키 지정(Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 값이 추가될 때마다 1씩 자동으로 증가
    private Long id;                // 게시글의 고유 ID 저장

    private String title;           // 게시글 제목 저장

    @Column(columnDefinition = "TEXT")  // DB에 TEXT 타입으로 저장됨(내용이 많을 수 있기 때문)
    private String content;         // 게시글 본문 저장

    @ElementCollection              // Post Entity 안에 Post_keywords 리스트를 만들기 위한 어노테이션
    private List<String> keywords;  // 사용자가 입력한 키워드를 리스트로 저장

    private String style;           // 글 작성 스타일을 저장

    @ElementCollection              // 마찬가지로 해시태그도 여러개이므로 리스트를 만들기 위함
    private List<String> hashtags;  // 해시태그 저장

    private String imageUrl;        // 사진 파일의 저장 경로를 저장

    private String weather;         // 사진을 찍은 날짜와 장소의 날씨 저장

    @CreationTimestamp                  // 엔티티가 DB에 저장될 떄의 시간을 자동으로 기록
    private LocalDateTime uploadDate;   // 게시글 업로드 시간 저장

    @ManyToOne(fetch = FetchType.LAZY)  // 1 : n 관계, 하나의 유저가 여러 게시글을 작성할 수 있다.
    private User author;                // 게시글의 작성자를 저장
}
