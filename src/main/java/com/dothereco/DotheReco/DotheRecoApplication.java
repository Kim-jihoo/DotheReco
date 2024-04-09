package com.dothereco.DotheReco;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.dothereco.DotheReco.repository")
public class DotheRecoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DotheRecoApplication.class, args);
	}

}
