/**
 * GPT API를 통해 사용자가 검색한 장소 주변의
 * 가볼만한 명소, 음식점, 기타 장소를 추천받는 서비스
 */
package com.example.mohangpj.scheduleapp.service;

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
public class GptService {

    @Value("${openai.api-key}")
    private String openaiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateScheduleFromPlaces(String query, String placesJson) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

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
            """, query);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(message));
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 1024);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://api.openai.com/v1/chat/completions",
                request,
                String.class
        );

        return response.getBody();
    }
}
