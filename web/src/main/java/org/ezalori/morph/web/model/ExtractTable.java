package org.ezalori.morph.web.model;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class ExtractTable {
  private Integer id;
  private Integer sourceInstance;
  private String sourceDatabase;
  private String sourceTable;
  private Integer targetInstance;
  private String targetDatabase;
  private String targetTable;
  private List<ExtractColumn> columns;
  private Date createTime;
  private Date updateTime;
}
