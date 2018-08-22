package org.ezalori.morph.web.form;

import lombok.Data;

@Data
public class ExtractTableForm {
  private Integer id;
  private Integer sourceInstance;
  private String sourceDatabase;
  private String sourceTable;
  private Integer targetInstance;
  private String targetDatabase;
  private String targetTable;
  private String columns;
}
