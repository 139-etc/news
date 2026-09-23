package com.news.backend_java.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.news.backend_java.dto.response.SearchResponse;
import com.news.backend_java.model.code.Category;
import com.news.backend_java.model.code.Period;
import com.news.backend_java.repository.CodeRepository;

import java.util.List;

@RestController 
@RequestMapping("/api/response")
public class SearchController {

    private final CodeRepository codeRepository;

    public SearchController(CodeRepository codeRepository){
        this.codeRepository = codeRepository;
    }

    @GetMapping("/search")
    public SearchResponse getSearchResponses() {

        // カテゴリと期間のコードを入手
        List<Category> categoryList = codeRepository.getCategories();
        List<Period> periodList = codeRepository.getPeriods();

        // レスポンスに登録
        return new SearchResponse(categoryList,periodList);
    }    
}
