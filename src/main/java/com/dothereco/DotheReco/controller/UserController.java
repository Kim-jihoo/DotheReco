package com.dothereco.DotheReco.controller;

import com.dothereco.DotheReco.service.UserLoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


import com.dothereco.DotheReco.dto.UserFormDTO;
import com.dothereco.DotheReco.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private AuthenticationManager authenticationManager;
    private UserLoginService userLoginService;

    //회원가입 페이지 띄워줌.
    @GetMapping("/signup")

    public String signup(UserFormDTO userFormDto) {
        return "signup";

    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    //회원가입 처리 해주는 메서드
    /* @PostMapping("/signup")
    public String signup(@Valid MemberFormDto memberFormDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return "signup_form";
        }

        if(!memberFormDto.getUserpassword1().equals(memberFormDto.getUserpassword2())){
            bindingResult.rejectValue("userpassword2", "passwordInCorrect", "비밀번호가 일치하지 않습니다.");
            return "signup_form";
        }

        try {
            userService.create(memberFormDto.getUserid(), memberFormDto.getUsername(), memberFormDto.getUserpassword1(), memberFormDto.getUsernickname());
        }
        catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed","이미 등록된 사용자입니다.");
            return "signup_form";
        }catch (Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return "signup_form";
        }
        return "회원가입이 완료되었습니다."; /*"redirect:/";
    } */

    @PostMapping("/signup/json")
    public ResponseEntity<String> signupJson(@RequestBody @Valid UserFormDTO userFormDto, BindingResult bindingResult) {
      /*  if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력한 정보가 올바르지 않습니다.");
        /*회원가입 화면 다시 보여주려면 : return "signup_form";
        }
        // 1. 아이디 중복 체크
        if (userService.isUserExists(memberFormDto.getUserid())) {
            return ResponseEntity.badRequest().body("이미 사용 중인 아이디입니다.");
        }

        if(!memberFormDto.getUserpassword1().equals(memberFormDto.getUserpassword2())){
            bindingResult.rejectValue("userpassword2", "passwordInCorrect", "비밀번호가 일치하지 않습니다.");
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
            /*회원가입 화면 다시 보여주려면 : return "signup_form";*/
       // }*/

      //  try {
            userService.create(userFormDto.getUserid(), userFormDto.getUserpassword1(), userFormDto.getUsernickname());
            return ResponseEntity.ok("회원가입이 완료되었습니다.");
      /*  } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("이미 등록된 사용자입니다.");
        /* bindingResult.reject("signupFailed","이미 등록된 사용자입니다.");
            return "signup_form";
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("회원가입에 실패하였습니다.");
        }*/
    }
}
