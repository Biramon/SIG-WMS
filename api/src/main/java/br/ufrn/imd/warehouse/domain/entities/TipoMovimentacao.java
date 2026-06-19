package br.ufrn.imd.warehouse.domain.entities;

public enum TipoMovimentacao {
    
    ENTRADA("Entrada"),
    SAIDA("Saída");

    private final String nome;

    TipoMovimentacao(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}
