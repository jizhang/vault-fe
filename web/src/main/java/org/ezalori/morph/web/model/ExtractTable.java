package org.ezalori.morph.web.model;

import java.util.List;
import lombok.Data;
import org.joda.time.DateTime;

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
  private DateTime createTime;
  private DateTime updateTime;
}
