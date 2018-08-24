package org.ezalori.morph.web.controller;

import lombok.Data;

@Data
public class ApiResponse {
  private int code = 200;
  private Object payload = null;

  ApiResponse(Object payload) {
    this.payload = payload;
  }
}
