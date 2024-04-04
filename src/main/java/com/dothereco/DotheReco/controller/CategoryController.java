package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.domain.Category;
import com.dothereco.DotheReco.dto.CategoryColorRequest;
import com.dothereco.DotheReco.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        Category category = categoryService.getCategoryById(id);
        if(category !=null){
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }
    @PostMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails){
        Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
        if(updatedCategory !=null){
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/select-color")
    public ResponseEntity<Category> selectColor(@RequestBody CategoryColorRequest request){
        Category createdCategory = categoryService.selectColor(request);
        if (createdCategory != null) {
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id){
        boolean deleted = categoryService.deleteCategoryById(id);
        if(deleted){
            return new ResponseEntity<>((HttpStatus.NO_CONTENT));
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
