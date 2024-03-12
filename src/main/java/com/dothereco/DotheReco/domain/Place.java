package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Entity
@Setter
@Getter
@Table(name = "Place")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Place_code")
    private Long placeCode;

    @Column(name = "Street_building")
    private String streetBuilding;

    @Column(name = "Place_name")
    private String placeName;

    @Column(name = "Place_bookmarks")
    private Boolean placeBookmarks;

}
