package com.dothereco.DotheReco.domain;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "user")
@ToString
public class User{

    @Id
    @Column(name = "user_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCode;

    @Column(name = "user_id", nullable = false, unique = true) //unique 필요할 것 같아서 추가
    private String userId;

    @Column(name = "user_name", nullable = false)
    private String userName; //이거 필요 한가??우리 이름 안 받지 않어?

    @Column(name = "user_nickname", nullable = false)
    private String userNickName;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    //@OneToMany(mappedBy = "userList2")
    //private List<Connection2> connections2 = new ArrayList<>();

    //@OneToMany(mappedBy = "userList1")
    //private List<Connection1> connections1 = new ArrayList<>();

   // @OneToMany(mappedBy = "userList3")
    //private List<Connection3> connections3 = new ArrayList<>();

   // @OneToMany(mappedBy = "userList4")
   // private List<Connection4> connection4 = new ArrayList<>();

    //@OneToMany(mappedBy = "userList5")
   // private List<Connection5> connection5 = new ArrayList<>();

}
