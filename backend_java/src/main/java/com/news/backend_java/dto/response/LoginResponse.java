package com.news.backend_java.dto.response;

public record LoginResponse(
    boolean result,
    String reason
) {
}