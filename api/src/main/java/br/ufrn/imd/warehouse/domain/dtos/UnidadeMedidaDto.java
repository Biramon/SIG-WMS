package br.ufrn.imd.warehouse.domain.dtos;

import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;

public record UnidadeMedidaDto(String nome) {

    public UnidadeMedida toEnum() {
        return UnidadeMedida.valueOf(this.nome);
    }

    public static UnidadeMedidaDto fromEnum(UnidadeMedida unidade) {
        return new UnidadeMedidaDto(unidade.name());
    }
}