package edu.dcu.moheng.springtest1.service;

import edu.dcu.moheng.springtest1.util.ImageMetadataExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService { // 이미지를 저장하는 class

    // user.dir은 현재 프로젝트의 경로를 의미. user.dir + /uploads/는 ~Java/Springboot/SpringTest1/uploads
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    private final WeatherService weatherService;

    public ImageService(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    public static class ImageResult {
        public final String filename;
        public final String weather;

        public ImageResult(String filename, String weather) {
            this.filename = filename;
            this.weather = weather;
        }
    }

    public ImageResult saveImage(MultipartFile file) throws IOException {    // 클라이언트가 업로드한 파일을 받는 메서드
        // 확장자 추출
        String originalFilename = file.getOriginalFilename();           // 파일 명을 찾아서
        String ext = originalFilename.substring(originalFilename.lastIndexOf(".")); // .을 찾고 그 뒤의 확장자만 추출

        // 고유한 파일명 생성
        String filename = UUID.randomUUID() + ext;  // UUID로 랜덤 문자열 생성 후 확장자(.jpg 등)를 붙임
        String filepath = UPLOAD_DIR + filename;    // 전체 파일 경로 구성

        // 저장
        File dest = new File(filepath);             // 파일 경로를 dest에 저장하는 객체 생성
        file.transferTo(dest);                      // 클라이언트가 전송한 파일을 실제 dest 경로에 저장하는 역할

        String weatherStr = null;

        ImageMetadataExtractor.MetadataResult meta = ImageMetadataExtractor.extract(filepath);
        if (meta != null && meta.latitude != null && meta.longitude != null && meta.datetime != null) {
            WeatherService.WeatherResult weather = weatherService.getWeather(
                    meta.latitude, meta.longitude, meta.datetime
            );

            weatherStr = weather.weatherText + " (" + Math.round(weather.temperature) + "°C)";
            System.out.println("🌤️ 날씨: " + weatherStr);
        } else {
            weatherStr = "정보 없음";
        }

        return new ImageResult(filename, weatherStr);
    }
}
