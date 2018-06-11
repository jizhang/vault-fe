package org.ezalori.morph.client.domain.mysql;

import java.util.List;
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
public class MysqlMappingTable {

  private List<MysqlMapping> mysqlMappings;

}
