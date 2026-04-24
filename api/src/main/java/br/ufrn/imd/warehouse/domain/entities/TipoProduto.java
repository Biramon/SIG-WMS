package br.ufrn.imd.warehouse.domain.entities;

public enum TipoProduto {

    ALIMENTO("Alimento"),
    BEBIDA("Bebida"),
    LIMPEZA("Limpeza"),
    HIGIENE("Higiene"),
    ELETRONICO("Eletrônico"),
    VESTUARIO("Vestuário"),
    MOVEL("Móvel"),
    FERRAMENTA("Ferramenta"),
    MEDICAMENTO("Medicamento"),
    OUTRO("Outro");

    private final String nome;

    TipoProduto(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}