package com.coneval.gestionv.repository;

import com.coneval.gestionv.entity.Vacaciones;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VacasionesRepository extends JpaRepository<Vacaciones,Integer> {
    List<Vacaciones> findByUserEmail(String email);
}
