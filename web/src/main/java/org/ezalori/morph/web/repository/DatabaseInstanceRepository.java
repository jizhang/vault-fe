package org.ezalori.morph.web.repository;

import java.util.Optional;
import org.ezalori.morph.web.model.DatabaseInstance;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class DatabaseInstanceRepository {

  @Value("${spring.datasource.url}")
  private String datasourceUrl;

  /**
   * Get instance.
   */
  public Optional<DatabaseInstance> get(Integer id) {
    DatabaseInstance row = new DatabaseInstance();
    row.setId(id);
    row.setUrl(datasourceUrl);
    row.setUsername("sa");
    row.setPassword("");
    return Optional.of(row);
  }

}
