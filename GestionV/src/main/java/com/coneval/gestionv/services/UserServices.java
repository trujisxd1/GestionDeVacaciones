package com.coneval.gestionv.services;


import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class UserServices {

    @Autowired

    private UserRepository userRepository;


    @Transactional(readOnly = true)
    public List<User>listar(){

        return this.userRepository.findAll();
    }
}
