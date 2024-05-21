package com.coneval.gestionv.services;


import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public class UserServices {

    @Autowired
    private UserRepository repository;




    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List) this.repository.findAll();
    }

    @Transactional(readOnly = true)

    public Optional<User> findById(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public User save(User user) {
        return repository.save(user);
    }

    @Transactional

    public void deleteById(Integer id) {

        repository.deleteById(id);
    }
}
