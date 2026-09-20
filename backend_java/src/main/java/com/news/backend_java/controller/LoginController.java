package com.news.backend_java.controller;

import com.news.backend_java.dto.request.LoginRequest;
import com.news.backend_java.dto.response.LoginResponse;
import com.news.backend_java.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.news.backend_java.security.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import java.time.Duration;


@RestController
@RequestMapping("/api/request")
public class LoginController {

    private final LoginService loginService;
    private final JwtUtil jwtUtil;

    public LoginController(
            LoginService loginService,
            JwtUtil jwtUtil
    ) {

        this.loginService = loginService;
        this.jwtUtil = jwtUtil;
    }

    // ログインリクエストを用いてログイン処理を行う
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {
        LoginResponse response = loginService.login(request);

        // ログイン失敗時のレスポンス
        if (!response.result()) {
            return ResponseEntity
                    .status(401)
                    .body(new LoginResponse(false,
                            "IDまたはパスワードが違います"));
        }

        // JWT生成
        String jwt = jwtUtil.generateToken(request.userId());

        // HttpOnly Cookie作成
        ResponseCookie cookie = ResponseCookie.from(
                        "accessToken",
                        jwt
                )
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        return ResponseEntity.ok()

                // Cookieをブラウザへ送る
                .header(HttpHeaders.SET_COOKIE, cookie.toString())

                .body(new LoginResponse(true, "ログイン成功"));

    }

}

