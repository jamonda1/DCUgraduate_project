package edu.dcu.moheng.springtest1.util;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.drew.metadata.exif.ExifSubIFDDirectory;

import java.io.File;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class ImageMetadataExtractor {       // 이미지에서 메타데이터를 추출하기 위한 클래스

    public static class MetadataResult {    // 결과를 저장하기 위한 내부 클래스
        public Double latitude;             // 위도
        public Double longitude;            // 경도
        public LocalDateTime datetime;      // 사진 촬영 시간

        public MetadataResult(Double lat, Double lon, LocalDateTime dt) {   // 위 3개를 초기화
            this.latitude = lat;
            this.longitude = lon;
            this.datetime = dt;
        }
    }

    public static MetadataResult extract(String filepath) { // 이미지 경로(filepath)를 넣고 메타데이터값 반환
        try {
            File imageFile = new File(filepath);            // imageFile에 filepath 저장
            Metadata metadata = ImageMetadataReader.readMetadata(imageFile);    // 이미지 파일을 열어서 촬영 정보 등을 Metadata 객체로 반환

            Double lat = null, lon = null;  // 위도와 경도의 초기값 null
            LocalDateTime datetime = null;  // 촬영 시간 초기값 null

            GpsDirectory gps = metadata.getFirstDirectoryOfType(GpsDirectory.class);    // 이미지의 위치 정보를 추출
            if (gps != null && gps.getGeoLocation() != null) {  // GPS 정보가 있고, GPS 정보에 위도와 경도가 있다면.
                lat = gps.getGeoLocation().getLatitude();       // lat에 위도 좌표 저장
                lon = gps.getGeoLocation().getLongitude();      // lon에 경도 좌표 저장
            }

            ExifSubIFDDirectory exif = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class); // 이미지의 촬영 시간을 추출
            if (exif != null) {                     // 이미지에 촬영 정보가 존재한다면
                Date date = exif.getDateOriginal(); // date에 촬영된 시간을 반환하고
                if (date != null) {                 // 반환된 date에 정보가 존재 한다면
                    datetime = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();   // date를 LocalDateTime으로 변환하여 datetime에 저장
                }
            }

            return new MetadataResult(lat, lon, datetime);  // 결과를 객체로 묶어서 return

        } catch (Exception e) { // 예외 발생의 경우, 오류 출력 및 null 반환
            System.err.println("EXIF 추출 오류: " + e.getMessage());
            return null;
        }
    }
}
