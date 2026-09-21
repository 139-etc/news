package com.news.backend_java.service;

import com.news.backend_java.dto.request.ResetRequest;
import com.news.backend_java.dto.response.ResetResponse;
import com.news.backend_java.model.UserAccount;
import com.news.backend_java.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ResetService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public ResetService(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResetResponse reset(ResetRequest request) {
        UserAccount user = userAccountRepository
                .findByUserId(request.resetUserId());

        // 登録されているユーザがいるかチェック
        if (user == null) {
            return new ResetResponse(
                    false,
                    "そのユーザIDは存在しません"
            );
        // 2つのパスワードが同じかチェック
        } else if (request.resetPassword1().equals(request.resetPassword2())) {
            return new ResetResponse(
                    false,
                    "新しいパスワードと新しいパスワード(確認用)が異なります。"
            );
        // そうでなければパスワードを更新する
        } else {
            userAccountRepository.resetPassword
                (request.resetUserId(), request.resetPassword1());

            return new ResetResponse(
                true,
                null
            );
        }

    }
}
