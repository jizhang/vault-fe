package org.ezalori.morph.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ApiException extends RuntimeException {
  private static final long serialVersionUID = 8741530383116835378L;

  public ApiException(String message) {
    super(message);
  }
}
