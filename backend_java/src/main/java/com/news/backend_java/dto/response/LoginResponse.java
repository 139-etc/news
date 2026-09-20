package com.news.backend_java.dto.response;

// ログイン画面への送信（Next.js←Spring Boot）
public record LoginResponse(
    boolean result,
    String reason
) {
}