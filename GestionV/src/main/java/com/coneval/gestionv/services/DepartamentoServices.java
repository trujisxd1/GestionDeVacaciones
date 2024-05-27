package com.coneval.gestionv.services;


import com.coneval.gestionv.entity.Departamento;
import com.coneval.gestionv.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartamentoServices {


    @Autowired
    private DepartamentoRepository departamentoRepository;

    public void save(Departamento departamento){

        this.departamentoRepository.save(departamento);
    }

    public  List<Departamento>listar(){

        return this.departamentoRepository.findAll();
    }

    public Departamento buscarPorId(Integer id){

        Optional<Departamento>optional=this.departamentoRepository.findById(id);

        if(optional.isPresent()){

            return optional.get();
        }
        return null;
    }

}
