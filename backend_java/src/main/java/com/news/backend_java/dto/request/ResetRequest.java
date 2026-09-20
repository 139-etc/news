package com.news.backend_java.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

// パスワードリセット画面からの受信（Next.js→Spring Boot）
public record ResetRequest(
    @NotBlank(message = "ユーザIDは必須です")
    @Size(min = 8, max = 16,message = "ユーザIDは8文字以上16文字以内で入力してください")
    @Pattern(regexp = "[!-~]{8,16}$",
     message = "ユーザIDは半角英数字と記号のみ使用可能です")
    String resetUserId,
    @NotBlank(message = "パスワードは必須です")
    @Size(min = 8, max = 16,message = "パスワードは8文字以上16文字以内で入力してください")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$",
     message = "パスワードは半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります")
    String resetPassword1,
    @NotBlank(message = "パスワードは必須です")
    @Size(min = 8, max = 16,message = "パスワードは8文字以上16文字以内で入力してください")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$",
     message = "パスワードは半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります")
    String resetPassword2,
    @NotBlank(message = "Emailは必須です")
    String email
) {
}