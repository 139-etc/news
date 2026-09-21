package com.news.backend_java.repository;

import com.news.backend_java.model.UserAccount;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserAccountRepository {

        // ユーザIDからユーザ情報を取得する 
    UserAccount findByUserId(
            @Param("userId") String userId
    );

        // 新しいユーザを追加する
    void insertUser(
            @Param("userId") String userId,
            @Param("password") String password,
            @Param("role") String role
    );

        // パスワードを更新する
    void resetPassword(
        @Param("userId") String resetUserId,
        @Param("password") String resetPassword1
    );
}