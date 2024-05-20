package com.coneval.gestionv.repository;

import com.coneval.gestionv.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {
}
