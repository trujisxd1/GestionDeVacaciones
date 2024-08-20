package com.coneval.gestionv.services;

import com.coneval.gestionv.config.VacacionesMapper;
import com.coneval.gestionv.dto.VacacionesDTO;
import com.coneval.gestionv.entity.User;
import com.coneval.gestionv.entity.Vacaciones;
import com.coneval.gestionv.repository.UserRepository;
import com.coneval.gestionv.repository.VacasionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Primary
public class VacacionesServices {



    @Autowired
    private VacasionesRepository vacasionesRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VacacionesMapper vacacionesMapper;


    public List<VacacionesDTO> findAll() {
        return vacasionesRepository.findAll().stream()
                .map(vacacionesMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<VacacionesDTO> findByEmail(String email) {
        return vacasionesRepository.findByUserEmail(email).stream()
                .map(vacacionesMapper::toDTO)
                .collect(Collectors.toList());
    }
    public List<Vacaciones> getVacaciones(){

        return this.vacasionesRepository.findAll();
    }


    public void save(Vacaciones vacaciones){

        this.vacasionesRepository.save(vacaciones);

    }

    public void delete(Integer id){
        this.vacasionesRepository.deleteById(id);
    }

    public Optional<Vacaciones>actualizar(Vacaciones vacaciones,Integer id){

        Optional<Vacaciones> vacacionesAux = this.vacasionesRepository.findById(id);

        if(vacacionesAux.isPresent()){
            Vacaciones vacaDb=vacacionesAux.get();
            vacaDb.setEstado(vacaciones.getEstado());
            vacaDb.setDiasRestantes(vacaciones.getDiasRestantes());
            vacaDb.setDiasSolicitados(vacaciones.getDiasSolicitados());
            vacaDb.setPeriodo(vacaciones.getPeriodo());
            vacaDb.setFechaInicio(vacaciones.getFechaInicio());
            vacaDb.setFechaFin(vacaciones.getFechaFin());


            return Optional.of(vacasionesRepository.save(vacaDb));
        }
        return Optional.empty();

    }


    public Optional<Vacaciones> findById(Integer id) {
        return vacasionesRepository.findById(id);
    }

    @Transactional
    public void agregarVacaciones(String email, Vacaciones vacaciones) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            int diasSolicitados = vacaciones.getDiasSolicitados();
            int diasDisponibles = user.getDiasDisponibles();
            if (diasDisponibles >= diasSolicitados) {
                int diasRestantes = diasDisponibles - diasSolicitados;
                user.setDiasDisponibles(diasRestantes); // Actualizar días disponibles del usuario
                vacaciones.setUser(user);
                vacaciones.setDiasRestantes(diasRestantes);
                vacasionesRepository.save(vacaciones);
                userRepository.save(user);  // Guardar cambios en el usuario
            } else {
                throw new IllegalArgumentException("No tienes suficientes días disponibles.");
            }
        } else {
            throw new IllegalArgumentException("Usuario no encontrado.");
        }
    }


}
