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
public class MysqlInfo {

  private int id;

  private String address;

  private String username;

  private String password;

  private int port;

  public List<String> dbname;

}
