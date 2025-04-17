package edu.dcu.moheng.springtest1.service;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class OllamaService {    // ollama API와 통신하는 클래스

    public String generateText(String prompt) { // PostService의 프롬프트를 전달받음
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();            // HTTP 헤더를 생성하는데 그것을
        headers.setContentType(MediaType.APPLICATION_JSON); // APPLICATION_JSON 형식으로 생성한다.

        Map<String, Object> body = Map.of(  // 요청 본문 데이터 구성
                "model", "mistral",     // 사용할 모델
                "stream", false,        // 응답은 실시간이 아닌 본문 내용을 한번에 리턴
                "messages", new Object[] {
                        Map.of("role", "system", "content", "너는 여행 블로거야."), // 시스템에게 역할을 부여
                        Map.of("role", "user", "content", prompt)   // 그 역할에 맞게 pormpt의 내용을 참고하여 글 작성
                }
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);   // 본문 데이터와 헤더를 합쳐서 하나의 객체로 만듦

        ResponseEntity<Map> response = restTemplate.postForEntity(      // POST 요청으로 entity를 전달
                "http://localhost:11434/api/chat", entity, Map.class    // 요청한 데이터를 Map 형태로 받는다(Json 형태로 파싱 가능)
        );

        Map<String, Object> responseBody = response.getBody();  // 응답에서 본문 텍스트 추출
        Map<String, Object> message = (Map<String, Object>) responseBody.get("message");
        return (String) message.get("content");
    }
}
