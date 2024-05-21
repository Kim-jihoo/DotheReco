package com.dothereco.DotheReco.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "Unfixed")
public class Unfixed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Unfixed_code")
    private Long unfixedCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_code")
    private User user;

    @Column(name = "Unfixed_title")
    private String unfixedTitle;

    @Column(name = "Schedule_date")
    private LocalDate scheduleDate;

    @Column(name = "Unfixed_time")
    private LocalTime unfixedTime;

    @Column(name = "Unfixed_deadline")
    private LocalDate unfixedDeadline;

    @Column(name = "Unfixed_importance")
    private Integer unfixedImportance;

    @Lob
    @Column(name = "Unfixed_memo", columnDefinition = "text")
    private String unfixedMemo;

    @Column(name = "Unfixed_completed")
    private Boolean unfixedCompleted;

    @Column(name = "Unfixed_recommended")
    private Boolean unfixedRecommended;

    @Column(name = "Reminder_mark")
    private Boolean ReminderMark;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Category_Code")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Place_Code")
    private Place place;

    @OneToMany(mappedBy = "unfixedList1")
    private List<Connection1> connections1 = new ArrayList<>();

    public boolean isUnfixedCompleted() {
        return Boolean.TRUE.equals(unfixedCompleted); // Null-safe check
    }
}
