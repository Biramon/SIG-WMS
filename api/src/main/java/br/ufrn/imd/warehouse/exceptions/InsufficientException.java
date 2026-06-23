package br.ufrn.imd.warehouse.exceptions;

public class InsufficientException extends BusinessException {
  public InsufficientException(Object... args) {
    super("insufficient", args);
  }
}
