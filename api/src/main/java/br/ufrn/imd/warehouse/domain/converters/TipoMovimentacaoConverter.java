package br.ufrn.imd.warehouse.domain.converters;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import br.ufrn.imd.warehouse.domain.dtos.TipoMovimentacaoDto;
import br.ufrn.imd.warehouse.domain.entities.TipoMovimentacao;

@Component
public class TipoMovimentacaoConverter {

    @Named("toEntityTipoMovimentacao")
    public TipoMovimentacao toEntity(TipoMovimentacaoDto dto) {
        return dto == null ? null : dto.toEnum();
    }

    @Named("toDtoTipoMovimentacao")
    public TipoMovimentacaoDto toDto(TipoMovimentacao tipoMovimentacao) {
        return tipoMovimentacao == null ? null : TipoMovimentacaoDto.fromEnum(tipoMovimentacao);
    }
    
}