package br.ufrn.imd.warehouse.persistence;

import br.ufrn.imd.warehouse.domain.entities.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends AbstractRepository<Product> {
}
