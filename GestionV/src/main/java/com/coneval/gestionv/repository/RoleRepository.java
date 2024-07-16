package com.coneval.gestionv.repository;

import com.coneval.gestionv.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {


    Optional<Role> findByNombre(String nombre);
}
