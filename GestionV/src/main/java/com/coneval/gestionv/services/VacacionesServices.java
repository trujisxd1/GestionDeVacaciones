package com.coneval.gestionv.services;

import com.coneval.gestionv.entity.Vacaciones;
import com.coneval.gestionv.repository.VacasionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public class VacacionesServices {



    @Autowired
    private VacasionesRepository vacasionesRepository;


    public List<Vacaciones> getVacaciones(){

        return this.vacasionesRepository.findAll();
    }


    public void save(Vacaciones vacaciones){

        this.vacasionesRepository.save(vacaciones);

    }

    public void delete(Integer id){
        this.vacasionesRepository.deleteById(id);
    }


    public Vacaciones buscarPorId(Integer id){

        Optional<Vacaciones> optional= this.vacasionesRepository.findById(id);

        if (optional.isPresent()){
            optional.get();
        }
            return null;

    }
}
