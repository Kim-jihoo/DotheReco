package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.User;
import com.dothereco.DotheReco.repository.UserRepository;



import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


@Transactional
    public User create(String userid, String username, String userpassword1, String usernickname) {
        User user = new User();
        user.setUserId(userid);
        user.setUserName(username);
        user.setUserPassword(passwordEncoder.encode(userpassword1));
        user.setUserNickName(usernickname);
        this.userRepository.save(user);
        return user;

    }
//입력된 아이디가 데이터베이스에 존재하는지 확인
    public boolean isUserExists(String userId) {
        return userRepository.existsByUserId(userId);
    }
}
