package br.ufrn.imd.warehouse.domain.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProductDto {
    private Long id;
    private String sku;
    private String nome;
    private String descricao;
    private UnidadeMedidaDto unidadeMedida;
    private TipoProdutoDto tipoProduto;
    private Integer saldo;
    private Boolean ativo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}