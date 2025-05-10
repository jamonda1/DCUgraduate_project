package edu.dcu.moheng.springtest1.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AiPostRequestDto {     // 라마에 전달할 내용들
    private String title;           // 제목
    private List<String> keywords;  // 키워드
    private String writingStyle;    // 본문의 스타일
}
