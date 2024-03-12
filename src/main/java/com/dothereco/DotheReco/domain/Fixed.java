package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "Fixed")
public class Fixed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fixed_code")
    private Long fixedCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code")
    private User user;

    @Column(name = "Fixed_title")
    private String fixedTitle;

    @Column(name = "Fixed_startDay")
    private Date fixedStartDay;

    @Column(name = "Fixed_endDay")
    private Date fixedEndDay;

    @Column(name = "Fixed_startTime")
    private Time fixedStartTime;

    @Column(name = "Fixed_endTime")
    private Time fixedEndTime;

    @Lob
    @Column(name = "Fixed_memo", columnDefinition = "text")
    private String fixedMemo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Category_Code")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Place_Code")
    private Place place;

    @OneToMany (mappedBy = "fixedList2")
    private List<Connection2> connections2 = new ArrayList<>();

    @OneToMany (mappedBy = "fixedList4")
    private List<Connection4> connection4 = new ArrayList<>();

}
