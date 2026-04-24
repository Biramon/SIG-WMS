package br.ufrn.imd.warehouse.domain.converters;

import br.ufrn.imd.warehouse.domain.dtos.TipoProdutoDto;
import br.ufrn.imd.warehouse.domain.dtos.UnidadeMedidaDto;
import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;
import org.springframework.stereotype.Component;

@Component
public class SigWmsConverter {

    public TipoProduto toEntity(TipoProdutoDto dto) {
        return dto == null ? null : dto.toEnum();
    }

    public TipoProdutoDto toDto(TipoProduto tipo) {
        return tipo == null ? null : TipoProdutoDto.fromEnum(tipo);
    }

    public UnidadeMedida toEntity(UnidadeMedidaDto dto) {
        return dto == null ? null : dto.toEnum();
    }

    public UnidadeMedidaDto toDto(UnidadeMedida unidade) {
        return unidade == null ? null : UnidadeMedidaDto.fromEnum(unidade);
    }
}