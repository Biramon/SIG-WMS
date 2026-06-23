package br.ufrn.imd.warehouse.controllers;

import br.ufrn.imd.warehouse.business.MessageUtils;
import br.ufrn.imd.warehouse.business.MovimentacaoService;
import br.ufrn.imd.warehouse.domain.converters.MovimentacaoConverter;
import br.ufrn.imd.warehouse.domain.converters.SigWmsConverter;
import br.ufrn.imd.warehouse.domain.dtos.MessageDto;
import br.ufrn.imd.warehouse.domain.dtos.MovimentacaoDto;
import br.ufrn.imd.warehouse.domain.dtos.TipoMovimentacaoDto;
import br.ufrn.imd.warehouse.domain.entities.Movimentacao;
import br.ufrn.imd.warehouse.domain.entities.TipoMovimentacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacoes")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;

    @Autowired
    private MovimentacaoConverter movimentacaoConverter;

    @Autowired
    private MessageUtils messageUtils;
    @Autowired
    private SigWmsConverter sigWmsConverter;

    @PostMapping("/salvar")
    public ResponseEntity<MessageDto> salvar(@RequestBody MovimentacaoDto movimentacaoDto) {
        Movimentacao movimentacao = movimentacaoConverter.toEntity(movimentacaoDto);
        movimentacaoService.salvar(movimentacao);
        return ResponseEntity.ok(messageUtils.getMessage("success.saved", "Movimentação de Produto"));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<MovimentacaoDto>> listar(){
        List<Movimentacao> movimentacoes = movimentacaoService.listar();
        return ResponseEntity.ok(movimentacaoConverter.toListDto(movimentacoes));
    }

    @GetMapping("/tipos-movimentacao")
    public ResponseEntity<List<TipoMovimentacaoDto>> listarTipoMovimentacao(){
        List<TipoMovimentacao> tiposMovimentacao = movimentacaoService.tiposMovimentacao();
        return ResponseEntity.ok(sigWmsConverter.toTipoMovimentacaoDtoList(tiposMovimentacao));
    }
}
