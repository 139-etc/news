package com.news.backend_java.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // JWT署名用の秘密鍵（後でapplication.propertiesへ移動予定）
    private static final String SECRET =
            "12345678901234567890123456789012";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // JWTを生成する
    public String generateToken(String userId) {

        return Jwts.builder()

                // JWTにユーザーIDを保存
                .subject(userId)

                // 発行時刻
                .issuedAt(new Date())

                // 1時間後に期限切れ
                .expiration(new Date(System.currentTimeMillis() + 3600000))

                // 秘密鍵で署名
                .signWith(secretKey)

                .compact();
    }

        // JWTからユーザーIDを取得する
        public String getUserId(String token) {

        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
        }

        // JWTが有効か判定する
public boolean validateToken(String token) {

    try {
        Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);

        return true;

    } catch (Exception e) {
        return false;
    }
}
}