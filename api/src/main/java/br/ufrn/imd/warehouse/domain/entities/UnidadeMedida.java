package br.ufrn.imd.warehouse.domain.entities;

public enum UnidadeMedida {

    UNIDADE("Unidade"),
    CAIXA("Caixa"),
    PACOTE("Pacote"),
    ROLO("Rolo"),
    SACO("Saco"),
    FARDO("Fardo"),
    PAR("Par"),
    CONJUNTO("Conjunto"),
    LITRO("Litro"),
    MILILITRO("Mililitro"),
    QUILOGRAMA("Quilograma"),
    GRAMA("Grama"),
    METRO("Metro"),
    CENTIMETRO("Centímetro");

    private final String nome;

    UnidadeMedida(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}