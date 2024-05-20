package com.coneval.gestionv.services;


import com.coneval.gestionv.entity.Departamento;
import com.coneval.gestionv.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartamentoServices {


    @Autowired
    private DepartamentoRepository departamentoRepository;

    public void save(Departamento departamento){

        this.departamentoRepository.save(departamento);
    }

}
