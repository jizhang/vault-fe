package org.ezalori.morph.client.application.service;

import java.util.List;

/**
 * Created by hey on 24/08/2017.
 */
public interface ActionService {

  void batchIdAck(List<Long> batchIdList, CanalService canalService);


}
