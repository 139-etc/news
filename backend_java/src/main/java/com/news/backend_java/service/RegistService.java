package com.news.backend_java.service;

import com.news.backend_java.dto.request.RegistRequest;
import com.news.backend_java.dto.response.RegistResponse;
import com.news.backend_java.model.UserAccount;
import com.news.backend_java.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistService(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegistResponse regist(RegistRequest request) {
        UserAccount user = userAccountRepository
                .findByUserId(request.registUserId());

        // 登録されているユーザがいるかチェック
        if (user == null) {
            userAccountRepository.insertUser(
                request.registUserId(),
                passwordEncoder.encode(request.registPassword()),
                "ROLE_USER"
            );

            return new RegistResponse(true, null);
        } else {
            return new RegistResponse(
                    false,
                    "既に登録されています。"
            );
        }

    }
}
