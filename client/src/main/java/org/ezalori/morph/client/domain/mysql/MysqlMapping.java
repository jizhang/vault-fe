package org.ezalori.morph.client.domain.mysql;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.ezalori.morph.client.domain.basic.Mapping;



/**
 * Created by hey on 20/05/2018.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MysqlMapping extends Mapping {

  private int targetRdsId;

  private String targetSchema;

  private String targetTable;

  private Set<String> fields;

}
