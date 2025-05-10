package edu.dcu.moheng.springtest1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // "file:uploads/"는 실제 저장 경로와 맞춰야 합니다 (예: 프로젝트 루트/폴더)
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/Users/parkseungjin/Desktop/Programming/Java/Springboot/SpringTest1/uploads/"); // ← 여기를 실제 경로에 맞게 조정
    }
}
