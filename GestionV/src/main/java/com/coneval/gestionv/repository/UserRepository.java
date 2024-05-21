package com.coneval.gestionv.repository;

import com.coneval.gestionv.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {



    Optional<User>findByEmail(String email);

}
