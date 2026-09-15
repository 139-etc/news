package com.news.backend_java.service;

import com.news.backend_java.dto.request.LoginRequest;
import com.news.backend_java.dto.response.LoginResponse;
import com.news.backend_java.model.UserAccount;
import com.news.backend_java.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        UserAccount user = userAccountRepository
                .findByUserId(request.userId());

        if (user == null) {
            return new LoginResponse(
                    false,
                    "ユーザ名またはパスワードが正しくありません。"
            );
        }

        boolean passwordMatches = passwordEncoder.matches(
                request.password(),
                user.getPassword()
        );

        if (!passwordMatches) {
            return new LoginResponse(
                    false,
                    "ユーザ名またはパスワードが正しくありません。"
            );
        }

        return new LoginResponse(true, null);
    }
}
