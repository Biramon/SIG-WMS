package br.ufrn.imd.warehouse.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipoProduto extends AbstractModel {

    private String denominacao;

    @OneToMany(mappedBy = "tipoProduto")
    private List<Product> produtos = new ArrayList<>();

}
