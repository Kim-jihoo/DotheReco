package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.dto.CategoryColorDTO;
import com.dothereco.DotheReco.repository.CategoryRepository;
import com.dothereco.DotheReco.domain.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories(){

        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id){

        return categoryRepository.findById(id).orElse(null);
    }
    public Category createCategory(Category category){

        return categoryRepository.save(category);
    }
    public Category updateCategory(Long id, Category categoryDetails){
        Category category = categoryRepository.findById(id).orElse(null);
        if(category != null){
            if(categoryDetails.getCategoryName() !=null){
                category.setCategoryName((categoryDetails.getCategoryName()));
            }
            if (categoryDetails.getColor() != null) {
                category.setColor(categoryDetails.getColor());
            }
            return categoryRepository.save(category);
        }
        return null;
    }
    public Category selectColor(CategoryColorDTO request) {
        Category category = new Category();
        category.setCategoryName(request.getCategoryName());
        category.setColor(request.getSelectedColor());
        return categoryRepository.save(category);
    }
    public boolean deleteCategoryById(Long id){
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if(optionalCategory.isPresent()){
            categoryRepository.delete(optionalCategory.get());
            return true;
        }else {
            return false;
        }
    }
}
