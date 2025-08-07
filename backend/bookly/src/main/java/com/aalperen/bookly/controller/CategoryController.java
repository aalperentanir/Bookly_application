package com.aalperen.bookly.controller;

import com.aalperen.bookly.dto.CategoryRequest;
import com.aalperen.bookly.dto.CategoryResponse;
import com.aalperen.bookly.entity.Category;
import com.aalperen.bookly.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Category API", description = "Category controller")
public class CategoryController {


    private final CategoryService categoryService;

    @GetMapping
    @Operation(summary = "Get All Categories Request")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(mapToCategoryResponseList(categories), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Category By Id Request")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);

            return new ResponseEntity<>(mapToCategoryResponse(category), HttpStatus.OK);

    }

    @GetMapping("/search")
    @Operation(summary = "Search Category Request")
    public ResponseEntity<List<CategoryResponse>> searchCategoriesByName(@RequestParam String name) {
        List<Category> categories = categoryService.getCategoriesByName(name);
        return new ResponseEntity<>(mapToCategoryResponseList(categories), HttpStatus.OK);
    }

    @GetMapping("/{id}/exists")
    @Operation(summary = "Chech Category Exist Request")
    public ResponseEntity<Boolean> checkCategoryExists(@PathVariable Long id) {
        boolean exists = categoryService.existsById(id);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @GetMapping("/popular")
    @Operation(summary = "Get Most Popular Categories Request")
    public ResponseEntity<List<CategoryResponse>> getMostPopularCategories() {
        List<Category> categories = categoryService.getMostPopularCategories();

        return new ResponseEntity<>(mapToCategoryResponseList(categories), HttpStatus.OK);
    }

    private CategoryResponse mapToCategoryResponse(Category category){
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setDescription(category.getDescription());

        return categoryResponse;


    }

    private List<CategoryResponse> mapToCategoryResponseList(List<Category> categories){
        return categories.stream()
                .map(this::mapToCategoryResponse)
                .collect(Collectors.toList());
    }
}