package org.ezalori.morph.web.model;

import lombok.Data;

@Data
public class DatabaseInstance {
  private Integer id;
  private String url;
  private String username;
  private String password;
}
