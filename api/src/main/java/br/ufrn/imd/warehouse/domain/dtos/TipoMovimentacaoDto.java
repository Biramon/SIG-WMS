package br.ufrn.imd.warehouse.domain.dtos;

import br.ufrn.imd.warehouse.domain.entities.TipoMovimentacao;

public record TipoMovimentacaoDto(String nome) {

    public TipoMovimentacao toEnum() {
        return TipoMovimentacao.valueOf(this.nome);
    }

    public static TipoMovimentacaoDto fromEnum(TipoMovimentacao tipoMovimentacao) {
        return new TipoMovimentacaoDto(tipoMovimentacao.name());
    }

}
