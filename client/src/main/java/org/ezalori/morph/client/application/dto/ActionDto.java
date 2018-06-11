package org.ezalori.morph.client.application.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by hey on 23/08/2017.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActionDto {

  private List<ActionInfoDto> actionInfoDtoList;

  private long batchId;

}
