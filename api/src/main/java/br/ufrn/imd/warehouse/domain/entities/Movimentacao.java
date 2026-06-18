package br.ufrn.imd.warehouse.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Movimentacao extends AbstractModel {

    private int quantidade;
    private String observacao;
    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipoMovimentacao;

}
