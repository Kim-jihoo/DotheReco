package com.dothereco.DotheReco.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_code")
    private long userCode;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_nickname", nullable = false)
    private String userNickName;

    @OneToMany (mappedBy = "userList2")
    private List<Connection2> connections2 = new ArrayList<>();

    @OneToMany(mappedBy = "userList1")
    private List<Connection1> connections1 = new ArrayList<>();

    @OneToMany(mappedBy = "userList3")
    private List<Connection3> connections3 = new ArrayList<>();

    @OneToMany (mappedBy = "userList4")
    private List<Connection4> connection4 = new ArrayList<>();

    @OneToMany (mappedBy = "userList5")
    private List<Connection5> connection5 = new ArrayList<>();

}
