package com.coneval.gestionv.services;

import com.coneval.gestionv.dto.ReporteVacacionesDTO;
import net.sf.jasperreports.engine.JRException;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

public interface ReporteVacacionesServiceAPI {

    ReporteVacacionesDTO obtenerReporteVentas(Map<String, Object> params) throws JRException, IOException, SQLException;

}
