package com.coneval.gestionv.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.sql.DataSource;

import com.coneval.gestionv.communs.JasperReportManager;
import com.coneval.gestionv.dto.ReporteVacacionesDTO;
import com.coneval.gestionv.enums.TipoReporteEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import net.sf.jasperreports.engine.JRException;
@Service
public class ReporteVacacionesServiceImpl implements ReporteVacacionesServiceAPI {
    @Autowired
    private JasperReportManager reportManager;

    @Autowired
    private DataSource dataSource;


    @Override
    public ReporteVacacionesDTO obtenerReporteVentas(Map<String, Object> params)
            throws JRException, IOException, SQLException {
        String fileName = "reporte_de_vacaciones";
        ReporteVacacionesDTO dto = new ReporteVacacionesDTO();
        String extension = params.get("tipo").toString().equalsIgnoreCase(TipoReporteEnum.EXCEL.name()) ? ".xlsx"
                : ".pdf";
        dto.setFileName(fileName + extension);

        ByteArrayOutputStream stream = reportManager.export(fileName, params.get("tipo").toString(), params,
                dataSource.getConnection());

        byte[] bs = stream.toByteArray();
        dto.setStream(new ByteArrayInputStream(bs));
        dto.setLength(bs.length);

        return dto;
    }
}
