package edu.dcu.moheng.springtest1.dto;

import edu.dcu.moheng.springtest1.entity.Post;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class PostResponseDto {          // 클라이언트에게 응답할 때 사용하는 DTO (Data Transfer Object)
    private Long id;
    private String title;
    private String nickname;
    private String style;
    private List<String> keywords;      // 사용자가 입력한 키워드 리스트
    private List<String> hashtags;      // 사용자가 입력한 해시태그 리스트
    private LocalDateTime uploadDate;   // 게시글 업로드 날짜

    public static PostResponseDto from(Post post) { // Post 객체를 받아서 PostResponseDto로 변환해주는 메소드
        return PostResponseDto.builder()            // Post 전체를 넘기면 DB 정보 등이 포함될 수 있으므로 DTO로 변환해야 함
                .id(post.getId())
                .title(post.getTitle())
                .nickname(post.getAuthor().getNickname())
                .style(post.getStyle())
                .keywords(post.getKeywords())
                .hashtags(post.getHashtags())
                .uploadDate(post.getUploadDate())
                .build();
    }
}
