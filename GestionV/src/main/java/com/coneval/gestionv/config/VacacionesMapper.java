package com.coneval.gestionv.config;

import com.coneval.gestionv.dto.VacacionesDTO;
import com.coneval.gestionv.entity.Vacaciones;
import org.springframework.stereotype.Component;

@Component
public class VacacionesMapper {

    public VacacionesDTO toDTO(Vacaciones vacaciones) {
        VacacionesDTO dto = new VacacionesDTO();
        dto.setId(vacaciones.getId());
        dto.setFechaInicio(vacaciones.getFechaInicio());
        dto.setFechaFin(vacaciones.getFechaFin());
        dto.setEstado(vacaciones.getEstado());
        dto.setPeriodo(vacaciones.getPeriodo());
        dto.setDiasSolicitados(vacaciones.getDiasSolicitados());
        dto.setDiasRestantes(vacaciones.getDiasRestantes());
        dto.setUserId(vacaciones.getUser().getId());
        dto.setNombreP(vacaciones.getUser().getNombre());
        dto.setApellidoP(vacaciones.getUser().getApellidoP());
        dto.setApellidoM(vacaciones.getUser().getApellidoM());
        dto.setCorreo(vacaciones.getUser().getEmail());
        return dto;
    }
}