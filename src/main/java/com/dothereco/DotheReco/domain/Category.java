package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Category_code")
    private Long categoryCode;

    @Column(name = "Category_name")
    private String categoryName;

    @Column(name = "Category_color")
    private String categoryColor;
}
