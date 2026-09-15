package com.news.backend_java.dto.request;

public record LoginRequest(
    String userId,
    String password
) {
}