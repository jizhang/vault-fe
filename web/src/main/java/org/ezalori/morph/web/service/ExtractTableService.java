package org.ezalori.morph.web.service;

import com.google.common.collect.ImmutableList;
import java.util.List;
import org.ezalori.morph.web.model.ExtractColumn;
import org.springframework.stereotype.Service;

@Service
public class ExtractTableService {

  /**
   * Get columns list from table.
   */
  public List<ExtractColumn> getColumns(Integer sourceInstance,
      String sourceDatabase, String sourceTable) {
    return ImmutableList.of(
        new ExtractColumn("id", true),
        new ExtractColumn("create_day", true));
  }

}
