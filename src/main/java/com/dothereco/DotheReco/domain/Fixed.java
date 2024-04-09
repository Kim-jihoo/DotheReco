package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "fixed")
public class Fixed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fixed_code")
    private Long fixedCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_code")
    private User user;

    @Column(name = "Fixed_title")
    private String fixedTitle;

    @Column(name = "Fixed_startDay")
    private LocalDate fixedStartDay;

    @Column(name = "fixed_endDay")
    private LocalDate fixedEndDay;

    @Column(name = "fixed_startTime")
    private LocalTime fixedStartTime;

    @Column(name = "fixed_endTime")
    private LocalTime fixedEndTime;

    @Lob
    @Column(name = "fixed_memo", columnDefinition = "text")
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
