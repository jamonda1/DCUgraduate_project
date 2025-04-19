package edu.dcu.moheng.springtest1.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostRequestDto {   // DTO = Data Transfer Object(데이터를 전달하기 위한 객체)
    private String title;
    private String content;
    private List<String> keywords;
    private String style;
    private List<String> hashtags;
}