package com.coneval.gestionv.services;


import com.coneval.gestionv.dto.UserRequest;
import com.coneval.gestionv.entity.Cordinaciones;
import com.coneval.gestionv.entity.Departamento;
import com.coneval.gestionv.entity.Role;
import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.repository.DepartamentoRepository;
import com.coneval.gestionv.repository.RoleRepository;
import com.coneval.gestionv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Primary
public class UserServices {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private RoleRepository roleRepository;


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

        List<Role>roles= new ArrayList<>();

        Optional<Role> optionalRoles=this.roleRepository.findByNombre("ROLE_USER");

        optionalRoles.ifPresent(roles::add);

        user.setRoles(roles);

    user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repository.save(user);
    }

    @Transactional

    public void deleteById(Integer id) {

        repository.deleteById(id);
    }

    @Transactional
    public Optional<User>actualizar(UserRequest userRequest, Integer id){

        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isPresent()) {
            User userDb = userOptional.get();
            userDb.setEmail(userRequest.getEmail());
            userDb.setApellidoM(userRequest.getApellidoM());
            userDb.setApellidoP(userRequest.getApellidoP());
            userDb.setNombre(userRequest.getNombre());
            userDb.setRfc(userRequest.getRfc());
            userDb.setFechaDeIngreso(userRequest.getFechaDeIngreso());

            // Set Departamento
            if (userRequest.getPuestoId() != null) {
                Optional<Departamento> departamentoOptional = departamentoRepository.findById(userRequest.getPuestoId());
                departamentoOptional.ifPresent(userDb::setPuesto);
            }

////             Set Cordinaciones
//            if (userRequest.getCordinacionId() != null) {
//                Optional<Cordinaciones> cordinacionesOptional = cordinacionesRepository.findById(userRequest.getCordinacionId());
//                cordinacionesOptional.ifPresent(userDb::setCordinacion);
//            }

            return Optional.of(repository.save(userDb));
        }
        return Optional.empty();
    }
}
