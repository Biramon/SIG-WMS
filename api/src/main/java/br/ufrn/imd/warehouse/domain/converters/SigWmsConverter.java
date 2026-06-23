package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.UnidadeMedidaDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoMovimentacaoDto;
import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;
import br.ufrn.imd.warehouse.domain.entities.TipoMovimentacao;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SigWmsConverter {

    @Named("toEntityUnidadeMedida")
    public UnidadeMedida toEntity(UnidadeMedidaDto dto) {
        return dto == null ? null : dto.toEnum();
    }

    @Named("toDtoUnidadeMedida")
    public UnidadeMedidaDto toDto(UnidadeMedida unidade) {
        return unidade == null ? null : UnidadeMedidaDto.fromEnum(unidade);
    }

    public List<UnidadeMedidaDto> toDtoList(List<UnidadeMedida> unidades) {
        return unidades.stream()
                .map(UnidadeMedidaDto::fromEnum)
                .toList();
    }

    @Named("toEntityTipoMovimentacao")
    public TipoMovimentacao toEntity(TipoMovimentacaoDto dto) {
        return dto == null ? null : dto.toEnum();
    }

    @Named("toDtoTipoMovimentacao")
    public TipoMovimentacaoDto toDto(TipoMovimentacao tipo) {
        return tipo == null ? null : TipoMovimentacaoDto.fromEnum(tipo);
    }
}