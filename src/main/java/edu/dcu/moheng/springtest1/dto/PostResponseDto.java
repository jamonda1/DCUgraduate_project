package edu.dcu.moheng.springtest1.dto;

import edu.dcu.moheng.springtest1.entity.Post;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class PostResponseDto {
    private Long id;
    private String title;
    private String content;
    private List<String> keywords;
    private String style;
    private List<String> hashtags;
    private String imageUrl;
    private String weather;
    private LocalDateTime uploadDate;
    private String authorNickname;

    public PostResponseDto(Post post) { // Post 객체를 받아서 PostResponseDto에 저장
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.keywords = post.getKeywords();
        this.style = post.getStyle();
        this.hashtags = post.getHashtags();
        this.imageUrl = post.getImageUrl();
        this.weather = post.getWeather();
        this.uploadDate = post.getUploadDate();
        this.authorNickname = post.getAuthor().getNickname();
    }

    public static PostResponseDto from(Post post) {
        return new PostResponseDto(post);
    }
}

