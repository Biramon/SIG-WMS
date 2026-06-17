package br.ufrn.imd.warehouse.business;

import br.ufrn.imd.warehouse.domain.entities.TipoProduto;
import br.ufrn.imd.warehouse.exceptions.AlreadyExistsException;
import br.ufrn.imd.warehouse.exceptions.BusinessException;
import br.ufrn.imd.warehouse.persistence.TipoProdutoRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoProdutoService {

    @Autowired
    private TipoProdutoRepository tipoProdutoRepository;

    public TipoProduto salvar(TipoProduto tipoProduto) {
        if (tipoProdutoRepository.findByDenominacao(tipoProduto.getDenominacao()) != null
                && !tipoProdutoRepository.findByDenominacao(tipoProduto.getDenominacao()).getId().equals(tipoProduto.getId())) {
            throw new AlreadyExistsException("Tipo de Produto");
        }

        return tipoProdutoRepository.save(tipoProduto);
    }

    public List<TipoProduto> listar() {
        return tipoProdutoRepository.findAll();
    }
    
}
