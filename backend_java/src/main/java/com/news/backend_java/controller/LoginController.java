package com.news.backend_java.controller;

import com.news.backend_java.dto.request.LoginRequest;
import com.news.backend_java.dto.response.LoginResponse;
import com.news.backend_java.repository.UserAccountRepository;
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
    private final UserAccountRepository userAccountRepository;

    public LoginController(
            LoginService loginService,
            JwtUtil jwtUtil,
            UserAccountRepository userAccountRepository
    ) {

        this.loginService = loginService;
        this.jwtUtil = jwtUtil;
        this.userAccountRepository = userAccountRepository;
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
                    .body(response);
        }

        // 権限を取得
        String role = userAccountRepository.findByUserId(request.userId()).getRole();

        // JWT生成
        String jwt = jwtUtil.generateToken(request.userId(),role);

        // HttpOnly Cookie作成(accessTokenという名前でJWTをもとにCookieを作成)
        ResponseCookie cookie = ResponseCookie.from(
                        "accessToken",
                        jwt
                )
                // JavaScriptからCookieを読み取れなくなる
                .httpOnly(true)
                // HTTPS通信でのみCookieを送るかどうか(falseだとHTTPでも送ることになる)
                // 現在は開発環境のためfalseで使用
                .secure(false)
                // 別サイトからCookieを送るかを制御(Laxだと通常利用なら送ることになる)
                .sameSite("Lax")
                // Cookieが有効な範囲を設定(全体で使うため、/を指定)
                .path("/")
                // Cookieの寿命を設定(1時間)
                .maxAge(Duration.ofHours(1))
                // 上記設定でCookieを生成
                .build();

        return ResponseEntity.ok()

                // Cookieをブラウザへ送る
                .header(HttpHeaders.SET_COOKIE, cookie.toString())

                .body(new LoginResponse(true, "ログイン成功"));
    }
}

