package com.dothereco.DotheReco.dto;

import com.dothereco.DotheReco.domain.Color;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryColorDTO {
    private String categoryName;
    private Color selectedColor;
}
