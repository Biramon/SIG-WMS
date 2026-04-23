package br.ufrn.imd.warehouse.domain.dtos;

import lombok.Data;

@Data
public class ProductDto {
    private String sku;
    private String nome;
    private String descricao;
    private UnidadeMedidaDto unidadeMedida;
    private Integer saldo;
}
