package br.ufrn.imd.warehouse.persistence;

import br.ufrn.imd.warehouse.domain.entities.AbstractModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface AbstractRepository<T extends AbstractModel> extends JpaRepository<T, Long> {

    @Query("SELECT e FROM #{#entityName} e WHERE e.id = :id AND e.active = true")
    T getById(Long id);

    @Query("SELECT e FROM #{#entityName} e WHERE e.active = true")
    List<T> findAll();

    @Modifying
    @Query("UPDATE #{#entityName} e SET e.active = false WHERE e.id = :id")
    void delete(Long id);
}
