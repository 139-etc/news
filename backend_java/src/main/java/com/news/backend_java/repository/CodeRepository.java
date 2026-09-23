package com.news.backend_java.repository;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.news.backend_java.model.code.Category;
import com.news.backend_java.model.code.Period;

@Mapper 
public interface CodeRepository {
    // ニュース検索画面のカテゴリのコードを取得
    List<Category> getCategories();

    // ニュース検索画面の期間のコードを取得
    List<Period> getPeriods();
    
}