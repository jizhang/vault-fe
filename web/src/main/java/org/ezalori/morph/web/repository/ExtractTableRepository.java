package org.ezalori.morph.web.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import org.ezalori.morph.web.model.ExtractColumn;
import org.ezalori.morph.web.model.ExtractTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class ExtractTableRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Autowired
  private ObjectMapper objectMapper;

  private RowMapper<ExtractTable> rowMapper = (rs, rowNum) -> {
    ExtractTable row = new ExtractTable();
    row.setId(rs.getInt("id"));
    row.setSourceInstance(rs.getInt("source_instance"));
    row.setSourceDatabase(rs.getString("source_database"));
    row.setSourceTable(rs.getString("source_table"));
    row.setTargetInstance(rs.getInt("target_instance"));
    row.setTargetDatabase(rs.getString("target_database"));
    row.setTargetTable(rs.getString("target_table"));

    List<ExtractColumn> columns;
    try {
      columns = objectMapper.readValue(rs.getString("columns"),
          new TypeReference<List<ExtractColumn>>() {
          });
    } catch (Exception e) {
      throw new SQLException("fail to parse columns", e);
    }

    row.setColumns(columns);
    row.setCreateTime(rs.getTimestamp("create_time"));
    row.setUpdateTime(rs.getTimestamp("update_time"));
    return row;
  };

  public List<ExtractTable> getList() {
    return jdbcTemplate.query("SELECT * FROM extract_table ORDER BY id DESC", rowMapper);
  }

  /**
   * Get table.
   */
  public Optional<ExtractTable> get(Integer id) {
    List<ExtractTable> rows = jdbcTemplate.query("SELECT * FROM extract_table WHERE id = ?",
        rowMapper, id);
    if (rows.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(rows.get(0));
  }

  /**
   * Insert new table.
   */
  public int insert(ExtractTable row) {
    KeyHolder keyHolder = new GeneratedKeyHolder();
    int affectedRows = jdbcTemplate.update(connection -> {
      PreparedStatement ps = connection.prepareStatement("INSERT INTO extract_table ("
          + " source_instance, source_database, source_table,"
          + " target_instance, target_database, target_table,"
          + " columns, create_time, update_time"
          + ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", new String[] { "id" });
      ps.setInt(1, row.getSourceInstance());
      ps.setString(2, row.getSourceDatabase());
      ps.setString(3, row.getSourceTable());
      ps.setInt(4, row.getTargetInstance());
      ps.setString(5, row.getTargetDatabase());
      ps.setString(6, row.getTargetTable());

      String columns;
      try {
        columns = objectMapper.writeValueAsString(row.getColumns());
      } catch (Exception e) {
        throw new SQLException("fail to serialize columns", e);
      }

      ps.setString(7, columns);
      ps.setTimestamp(8, new Timestamp(row.getCreateTime().getTime()));
      ps.setTimestamp(9, new Timestamp(row.getUpdateTime().getTime()));
      return ps;
    }, keyHolder);

    return affectedRows > 0 ? keyHolder.getKey().intValue() : 0;
  }

  /**
   * Update table.
   */
  public int update(ExtractTable row) {
    return jdbcTemplate.update("UPDATE extract_table SET"
        + " source_instance = ?, source_database = ?, source_table = ?,"
        + " target_instance = ?, target_database = ?, target_table = ?,"
        + " columns = ?, update_time = ?"
        + " WHERE id = ?", ps -> {
          ps.setInt(1, row.getSourceInstance());
          ps.setString(2, row.getSourceDatabase());
          ps.setString(3, row.getSourceTable());
          ps.setInt(4, row.getTargetInstance());
          ps.setString(5, row.getTargetDatabase());
          ps.setString(6, row.getTargetTable());

          String columns;
          try {
            columns = objectMapper.writeValueAsString(row.getColumns());
          } catch (Exception e) {
            throw new SQLException("fail to serialize columns", e);
          }

          ps.setString(7, columns);
          ps.setTimestamp(8, new Timestamp(row.getUpdateTime().getTime()));
          ps.setInt(9, row.getId());
        });
  }

}
