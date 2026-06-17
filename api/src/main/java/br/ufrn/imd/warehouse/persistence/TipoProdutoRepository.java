package br.ufrn.imd.warehouse.persistence;

import br.ufrn.imd.warehouse.domain.entities.TipoProduto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoProdutoRepository extends AbstractRepository<TipoProduto> {

    @Query("SELECT t FROM TipoProduto t WHERE t.ativo = true AND t.denominacao = :denominacao")
    TipoProduto findByDenominacao(@Param("denominacao") String denominacao);
}
