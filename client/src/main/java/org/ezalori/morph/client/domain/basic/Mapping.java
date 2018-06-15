package org.ezalori.morph.client.domain.basic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by hey on 20/05/2018.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Mapping {

  private int sourceRdsId;

  private String sourceSchema;

  private String sourceTable;

  private String sourcePk;

}
