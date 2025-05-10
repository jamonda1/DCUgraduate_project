package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.dto.AiPostRequestDto;
import edu.dcu.moheng.springtest1.service.OllamaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final OllamaService ollamaService;

    public AiController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @PostMapping("/generate-post")
    public Map<String, String> generatePost(@RequestBody AiPostRequestDto dto) {
        String title = dto.getTitle();
        List<String> keywords = dto.getKeywords();
        String style = dto.getWritingStyle();

        String prompt = String.format("""
            네가 여행 블로그를 작성한다고 생각하고 Title과 Keywords, Style을 참고해서 100 글자 정도의 본문을 작성해줘. 최대한 자연스러운 한국어로 부탁해
            
            Title: %s
            Keywords: %s
            Style: %s

        """, title, String.join(", ", keywords), style);

        String content = ollamaService.generateText(prompt);
        return Map.of("content", content);
    }
}
