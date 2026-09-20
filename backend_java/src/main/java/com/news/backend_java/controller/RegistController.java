package com.news.backend_java.controller;

import com.news.backend_java.dto.request.RegistRequest;
import com.news.backend_java.dto.response.RegistResponse;
import com.news.backend_java.service.RegistService;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/request")
public class RegistController {

    private final RegistService registService;

    public RegistController(
            RegistService registService
    ) {
        this.registService = registService;
    }

    // ユーザ登録リクエストを用いてユーザ登録処理を行う
    @PostMapping("/regist")
    public ResponseEntity<RegistResponse> regist(
            @Valid @RequestBody RegistRequest request
    ) {
        RegistResponse response = registService.regist(request);

        // ユーザ登録失敗時のレスポンス
        if (!response.result()) {
            return ResponseEntity
                    .status(409)
                    .body(new RegistResponse(false,
                            "IDが重複しています"));
        }

        return ResponseEntity.ok()
                .body(new RegistResponse(true, "ユーザ登録成功"));

    }
}


