package br.ufrn.imd.warehouse.business;

import br.ufrn.imd.warehouse.domain.entities.Movimentacao;
import br.ufrn.imd.warehouse.domain.entities.Product;
import br.ufrn.imd.warehouse.domain.entities.TipoMovimentacao;
import br.ufrn.imd.warehouse.domain.entities.UnidadeMedida;
import br.ufrn.imd.warehouse.exceptions.InsufficientException;
import br.ufrn.imd.warehouse.persistence.MovimentacaoRepository;
import br.ufrn.imd.warehouse.persistence.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MovimentacaoService {

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Movimentacao salvar(Movimentacao movimentacao) {
        Product product = movimentacao.getProduct();

        atualizarSaldo(product, movimentacao);

        productRepository.save(product);

        movimentacao.setProduct(product);
        return movimentacaoRepository.save(movimentacao);
    }

    public List<Movimentacao> listar(){
        return movimentacaoRepository.findAll();
    }

    public List<TipoMovimentacao> tiposMovimentacao() {
        return Arrays.asList(TipoMovimentacao.values());
    }

    private void atualizarSaldo(Product product, Movimentacao movimentacao) {

        int saldoAtual = product.getSaldo();
        int qtdMovimentacao = movimentacao.getQuantidade();
        TipoMovimentacao tipo = movimentacao.getTipoMovimentacao();

        int novoSaldo = tipo == TipoMovimentacao.SAIDA
                ? saldoAtual - qtdMovimentacao
                : saldoAtual + qtdMovimentacao;


        if (novoSaldo < 0) {
            throw new InsufficientException("Saldo do produto");
        }

        product.setSaldo(novoSaldo);

    }
}