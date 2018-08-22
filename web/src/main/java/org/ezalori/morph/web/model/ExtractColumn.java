package org.ezalori.morph.web.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExtractColumn {
  private String name;
  private Boolean extract;
}
