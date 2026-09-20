package com.news.backend_java.dto.response;

// パスワードリセット画面への送信（Next.js←Spring Boot）
public record ResetResponse(
    boolean result,
    String reason
) {
}