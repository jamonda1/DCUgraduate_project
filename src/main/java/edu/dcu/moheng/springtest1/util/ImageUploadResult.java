package edu.dcu.moheng.springtest1.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ImageUploadResult {
    private final String filename;
    private final String weather; // 예: "맑음 (18.3°C)"
}
