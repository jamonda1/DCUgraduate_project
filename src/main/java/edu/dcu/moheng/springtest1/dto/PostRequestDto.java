package edu.dcu.moheng.springtest1.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class PostRequestDto {
    private String title;
    private String content;
    private List<String> keywords;
    private String style;
    private List<String> hashtags;
}
