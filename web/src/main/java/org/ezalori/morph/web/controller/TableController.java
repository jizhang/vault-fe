package org.ezalori.morph.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import java.util.Arrays;
import java.util.Optional;
import org.ezalori.morph.web.form.ExtractTableForm;
import org.ezalori.morph.web.model.ExtractColumn;
import org.ezalori.morph.web.model.ExtractTable;
import org.ezalori.morph.web.repository.ExtractTableRepository;
import org.ezalori.morph.web.service.ExtractTableService;
import org.joda.time.DateTime;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/table")
public class TableController {

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ExtractTableRepository repo;

  @Autowired
  private ExtractTableService service;

  @GetMapping("/list")
  public ApiResponse list() {
    return new ApiResponse(repo.getList());
  }

  /**
   * Get table.
   */
  @GetMapping("/get")
  public ApiResponse get(@RequestParam("id") Integer id) {
    Optional<ExtractTable> row = repo.get(id);
    if (!row.isPresent()) {
      throw new ApiException("id not found");
    }
    return new ApiResponse(row.get());
  }

  /**
   * Save table.
   */
  @PostMapping("/save")
  public ApiResponse save(@ModelAttribute ExtractTableForm form) {
    ExtractTable row;
    if (form.getId() != null) {
      row = repo.get(form.getId()).orElseThrow(() -> new ApiException("id not found"));
    } else {
      row = new ExtractTable();
    }

    BeanUtils.copyProperties(form, row, "columns");

    ExtractColumn[] columns;
    try {
      columns = objectMapper.readValue(form.getColumns(), ExtractColumn[].class);
    } catch (Exception e) {
      throw new ApiException("invalid columns");
    }
    row.setColumns(Arrays.asList(columns));

    DateTime now = DateTime.now();
    row.setUpdateTime(now);

    if (form.getId() == null) {
      row.setCreateTime(now);
      row.setId(repo.insert(row).orElseThrow(() -> new ApiException("fail to save table")));
    } else {
      repo.update(row);
    }

    return new ApiResponse(ImmutableMap.of("id", row.getId()));
  }

  @GetMapping("/columns")
  public ApiResponse columns(@RequestParam("sourceInstance") Integer sourceInstance,
      @RequestParam("sourceDatabase") String sourceDatabase,
      @RequestParam("sourceTable") String sourceTable) {
    return new ApiResponse(service.getColumns(sourceInstance, sourceDatabase, sourceTable));
  }

}
