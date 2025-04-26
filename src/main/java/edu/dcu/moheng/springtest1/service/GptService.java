package edu.dcu.moheng.springtest1.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GptService {   // GPT를 이용해 장소를 추천받는 클래스

    @Value("${openai.api-key}")
    private String openaiApiKey;    // 여기에 키값 저장

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateScheduleFromPlaces(String query, String placesJson) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // 컨텐트 타입 설정
        headers.setBearerAuth(openaiApiKey);                // 토큰 인증 방식 설정

        String prompt = String.format("""
            사용자가 '%s'을(를) 검색했어.
            이 주변을 기반으로 다음과 같은 3가지 분류로 각각 1곳씩 추천해줘:
            1. 가볼만한 명소
            2. 유명한 음식점
            3. 기타 편의 시설 또는 장소
            
            각 항목은 이름과 간단한 설명을 포함해서 아래 JSON 형식으로 반환해줘:

            {
              "places": [ { "name": "", "description": "" } ],
              "foods": [ { "name": "", "description": "" } ],
              "etc": [ { "name": "", "description": "" } ]
            }
            """, query);    // 해당 프롬프트를 GPT에 전달. query에는 사용자가 입력한 장소가 들어간다.

        Map<String, Object> message = new HashMap<>();  // GPT에 보낼 메시지 구성
        message.put("role", "user");                    // 유저가
        message.put("content", prompt);                 // 이런 내용의 말을 했다

        Map<String, Object> requestBody = new HashMap<>();  // 요청에 보낼 제약 사항들
        requestBody.put("model", "gpt-3.5-turbo");          // 사용할 모델 이름
        requestBody.put("messages", List.of(message));      // 보낼 메시지
        requestBody.put("temperature", 0.7);                // 답변 다양성 조절 (0=고정, 1=랜덤)
        requestBody.put("max_tokens", 1024);                // 생성될 최대 글자 수 제한

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);   // 요청 본문과 헤더를 합쳐서 객체 생성

        ResponseEntity<String> response = restTemplate.postForEntity(   // 요청 보내기
                "https://api.openai.com/v1/chat/completions",
                request,
                String.class
        );

        return response.getBody();  // 결과값을 받음
    }
}
