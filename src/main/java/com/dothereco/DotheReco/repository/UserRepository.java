package com.dothereco.DotheReco.repository;

import com.dothereco.DotheReco.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; //로그인 때문에 추가

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserId(String userId);
    Optional<User> findByUserId(String userid); //로그인 부분
}

