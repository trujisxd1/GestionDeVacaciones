package com.coneval.gestionv.services;

import com.coneval.gestionv.entity.Cordinaciones;
import com.coneval.gestionv.repository.CordinacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public class CordinacionServices {

    @Autowired
    private CordinacionRepository cordinacionRepository;


    public List<Cordinaciones>listar(){

        return this.cordinacionRepository.findAll();
    }


    public Cordinaciones BuscarCordinacion(Integer id){

        Optional<Cordinaciones>optional= this.cordinacionRepository.findById(id);

        if (optional.isPresent()){
            return optional.get();
        }
        return null;

    }

    public void eliminarCordinacion(Integer id){

        this.cordinacionRepository.deleteById(id);
    }

    public void agregarCordinacion(Cordinaciones cordinacion){

        this.cordinacionRepository.save(cordinacion);
    }


    public Cordinaciones editarCordinacion(Cordinaciones cordinacion,Integer id){

        Optional<Cordinaciones>optional= this.cordinacionRepository.findById(id);

        if (optional.isPresent()){

            Cordinaciones cordinaciones=optional.get();

            cordinaciones.setNombre(cordinacion.getNombre());

            this.cordinacionRepository.save(cordinaciones);
        }

        return null;
    }
}
