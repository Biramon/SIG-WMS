package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.UnidadeMedidaDto;
import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;
import org.springframework.stereotype.Component;

@Component
public class SigWmsConverter {

    public UnidadeMedida toEntity(UnidadeMedidaDto dto) {
        return dto == null ? null : dto.toEnum();
    }

    public UnidadeMedidaDto toDto(UnidadeMedida unidade) {
        return unidade == null ? null : UnidadeMedidaDto.fromEnum(unidade);
    }
}