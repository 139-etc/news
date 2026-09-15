package com.news.backend_java.repository;

import com.news.backend_java.model.UserAccount;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserAccountRepository {

    UserAccount findByUserId(
            @Param("userId") String userId
    );

    void insertUser(
            @Param("userId") String userId,
            @Param("password") String password,
            @Param("userName") String userName,
            @Param("role") String role
    );
}