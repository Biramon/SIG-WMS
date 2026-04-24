package br.ufrn.imd.warehouse.domain.dtos;

import br.ufrn.imd.warehouse.domain.entities.TipoProduto;

public record TipoProdutoDto(String nome) {

    public TipoProduto toEnum() {
        return TipoProduto.valueOf(this.nome);
    }

    public static TipoProdutoDto fromEnum(TipoProduto tipo) {
        return new TipoProdutoDto(tipo.name());
    }
}