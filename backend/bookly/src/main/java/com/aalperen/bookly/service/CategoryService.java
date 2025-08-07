package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.CategoryRequest;
import com.aalperen.bookly.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {


    Category getCategoryById(Long id);

    List<Category> getAllCategories();

    Category createCategory(CategoryRequest req);

    Category updateCategory(Long id, CategoryRequest categoryDetails);

    void deleteCategory(Long id);

    List<Category> getCategoriesByName(String name);

    boolean existsById(Long id);

    List<Category> getMostPopularCategories();



}
