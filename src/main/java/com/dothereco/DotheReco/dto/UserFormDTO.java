package com.dothereco.DotheReco.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserFormDTO { //UserCreateForm과 동일

    @NotEmpty(message = "아이디는 필수 항목입니다.")
    @Email //이메일 형식 맞는지 확인함.
    private String userid;

    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    @Length(min = 8, max = 16)
    private String userpassword1;

    @NotEmpty(message = "비밀번호 확인은 필수 항목입니다.")
    private String userpassword2;

    @NotEmpty(message = "닉네임은 필수 항목입니다.")
    private String usernickname;

}
