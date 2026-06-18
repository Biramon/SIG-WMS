package br.ufrn.imd.warehouse.persistence;

import br.ufrn.imd.warehouse.domain.entities.AbstractModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface AbstractRepository<T extends AbstractModel> extends JpaRepository<T, Long> {

    @Query("SELECT e FROM #{#entityName} e WHERE e.id = :id AND e.ativo = true")
    T getById(Long id);

    @Query("SELECT e FROM #{#entityName} e WHERE e.ativo = true")
    List<T> findAll();

    @Modifying
    @Transactional
    @Query("UPDATE #{#entityName} e SET e.ativo = false WHERE e.id = :id")
    void desativar(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE #{#entityName} e SET e.ativo = NOT e.ativo WHERE e.id = :id")
    void toggleAtivo(Long id);
}
