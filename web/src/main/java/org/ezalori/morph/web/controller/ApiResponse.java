package org.ezalori.morph.web.controller;

public class ApiResponse {
  private int code = 200;
  private Object payload = null;

  ApiResponse(Object payload) {
    this.payload = payload;
  }

  public int getCode() {
    return code;
  }

  public void setCode(int code) {
    this.code = code;
  }

  public Object getPayload() {
    return payload;
  }

  public void setPayload(Object payload) {
    this.payload = payload;
  }
}
