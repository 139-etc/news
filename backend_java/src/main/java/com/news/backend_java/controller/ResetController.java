package com.news.backend_java.controller;

import com.news.backend_java.dto.request.ResetRequest;
import com.news.backend_java.dto.response.ResetResponse;
import com.news.backend_java.service.ResetService;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/request")
public class ResetController {

    private final ResetService ResetService;

    public ResetController(
            ResetService ResetService
    ) {
        this.ResetService = ResetService;
    }

    // ユーザ登録リクエストを用いてユーザ登録処理を行う
    @PostMapping("/reset")
    public ResponseEntity<ResetResponse> Reset(
            @Valid @RequestBody ResetRequest request
    ) {
        ResetResponse response = ResetService.reset(request);

        // パスワードリセット失敗時のレスポンス
        // if (!response.result()) {
        //     return ResponseEntity
        //             .status(409)
        //             .body(new ResetResponse(false,
        //                     ""));
        // }

        return ResponseEntity.ok()
                .body(new ResetResponse(true, "パスワードリセット成功"));

    }
}


