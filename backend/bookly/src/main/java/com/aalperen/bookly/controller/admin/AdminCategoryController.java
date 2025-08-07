package com.aalperen.bookly.controller.admin;


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

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Category API",description ="Category controller for Admin")
public class AdminCategoryController {

    private final CategoryService categoryService;

    @PostMapping("/categories")
    @Operation(summary = "Create Category Request", description = "Only admin role can create new category")
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest req) {
        Category createdCategory = categoryService.createCategory(req);
        return new ResponseEntity<>(mapToCategoryResponse(createdCategory), HttpStatus.CREATED);

    }

    @PutMapping("/categories/{id}")
    @Operation(summary = "Update Category Request", description = "Only admin role can update category")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id, @RequestBody CategoryRequest categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
        return new ResponseEntity<>(mapToCategoryResponse(updatedCategory), HttpStatus.OK);
    }

    @DeleteMapping("/categories/{id}")
    @Operation(summary = "Delete Category Request", description = "Only admin role can delete category")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    private CategoryResponse mapToCategoryResponse(Category category){
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setDescription(category.getDescription());

        return categoryResponse;


    }
}
