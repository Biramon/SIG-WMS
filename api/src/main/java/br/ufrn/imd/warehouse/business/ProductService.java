package br.ufrn.imd.warehouse.business;

import br.ufrn.imd.warehouse.domain.entities.Product;
import br.ufrn.imd.warehouse.exceptions.NotFoundException;
import br.ufrn.imd.warehouse.persistence.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product cadastrar(Product product) {
        product.setSku(generate(product));
        product.setSaldo(0);
        return productRepository.save(product);
    }

    public Product getById(Long id) {
        Product product = productRepository.getById(id);

        if(product == null){
             throw new NotFoundException("Produto");
        }
        return product;
    }

    public void desativar(Long id){
        productRepository.desativar(id);
    }

    //Método para gerar o SKU
    private String generate(Product product) {
        String denominacao = product.getTipoProduto().getDenominacao().toUpperCase().replaceAll("[^A-Z0-9]", "");
        String tipo = denominacao.substring(0, Math.min(4, denominacao.length()));

        String nomeClean = product.getNome().trim().toUpperCase().replaceAll("[^A-Z0-9]", "");
        String nomeAbrev = nomeClean.substring(0, Math.min(4, nomeClean.length()));

        String prefix = tipo + "-" + nomeAbrev + "-";
        String sequencial = String.format("%04d", productRepository.countBySkuStartingWith(prefix) + 1);
        return prefix + sequencial;
    }
}
