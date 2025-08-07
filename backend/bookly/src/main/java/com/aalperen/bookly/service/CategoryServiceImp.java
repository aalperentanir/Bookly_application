package com.aalperen.bookly.service;

import com.aalperen.bookly.dto.CategoryRequest;
import com.aalperen.bookly.entity.Category;
import com.aalperen.bookly.entity.generic.ReturnCodes;
import com.aalperen.bookly.exception.BusinessException;
import com.aalperen.bookly.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImp implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() ->
                new BusinessException(
                        "Category not found",
                        ReturnCodes.CATEGORY_NOT_FOUND.intValue(),
                        "Category not found with ID: " + id
                ));
    }

    @Override
    @Transactional
    public Category createCategory(CategoryRequest req) {
        Category category = new Category();
        category.setName(req.getName());
        category.setDescription(req.getDescription());

        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public Category updateCategory(Long id, CategoryRequest categoryDetails) {
        Category category = categoryRepository.findById(id).orElseThrow(() ->
                new BusinessException(
                        "Category not found",
                        ReturnCodes.CATEGORY_NOT_FOUND.intValue(),
                        "Category not found with ID: " + id
                ));

        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());

        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() ->
                new BusinessException(
                        "Category not found",
                        ReturnCodes.CATEGORY_NOT_FOUND.intValue(),
                        "Category not found with ID: " + id
                ));

        categoryRepository.delete(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getCategoriesByName(String name) {
        return categoryRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return categoryRepository.existsById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getMostPopularCategories() {
        return categoryRepository.findMostPopularCategories();
    }
}
