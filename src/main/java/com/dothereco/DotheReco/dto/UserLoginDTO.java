package com.dothereco.DotheReco.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDTO {
    @NotEmpty(message = "아이디는 필수 항목입니다.")
    @Email
    private String userid;

    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    private String userpassword;
}
