package com.news.backend_java.dto.response;

import java.util.List;
import com.news.backend_java.model.code.Category;
import com.news.backend_java.model.code.Period;

public record SearchResponse(
    List<Category> categoryList,
    List<Period> periodList
) {
}
