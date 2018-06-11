package org.ezalori.morph.client.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by hey on 17-6-15.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActionInfoDto {

  private String sourceRdsName;

  private String sourceSchema;

  private String sourceTable;

  private long binlogTime;

}
