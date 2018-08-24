package org.ezalori.morph.web.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.ezalori.morph.web.model.DatabaseInstance;
import org.ezalori.morph.web.model.ExtractColumn;
import org.ezalori.morph.web.repository.DatabaseInstanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

@Service
public class ExtractTableService {

  @Autowired
  private DatabaseInstanceRepository instanceRepo;

  /**
   * Get columns list from table.
   */
  public List<ExtractColumn> getColumns(Integer sourceInstance,
      String sourceDatabase, String sourceTable) {

    DatabaseInstance instance = instanceRepo.get(sourceInstance);
    if (instance == null) {
      return Collections.emptyList();
    }

    DriverManagerDataSource ds = new DriverManagerDataSource(
        instance.getUrl(), instance.getUsername(), instance.getPassword());
    JdbcTemplate jt = new JdbcTemplate(ds);
    List<String> columnNames = jt.queryForList("SELECT column_name FROM information_schema.columns"
        + " WHERE table_schema = ? AND table_name = ?",
        String.class, sourceDatabase, sourceTable);

    return columnNames.stream()
        .map(columnName -> new ExtractColumn(columnName, true))
        .collect(Collectors.toList());
  }

}
