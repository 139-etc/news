package com.news.backend_java.dto.response;

// ユーザ登録画面への送信（Next.js←Spring Boot）
public record RegistResponse(
    boolean result,
    String reason
) {
}