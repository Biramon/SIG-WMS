package br.ufrn.imd.warehouse.exceptions;

public class NotFoundException extends BusinessException {
    public NotFoundException(Object... args) {
        super("not.found", args);
    }
}