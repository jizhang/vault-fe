package org.ezalori.morph.web.controller;

import org.ezalori.morph.web.repository.ExtractTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by hey on 26/04/2018.
 */
@Controller
public class BasicController {

  @Autowired
  private ExtractTableRepository repo;

  @RequestMapping(value = "/", method = RequestMethod.GET)
  @ResponseBody
  public String printHello() throws Exception {
    return "Get some fun\n";
  }

  @RequestMapping(value = "/api/ping")
  @ResponseBody
  public Object ping() {
    return new ApiResponse("pong");
  }

  @RequestMapping(value = "/api/table/list")
  @ResponseBody
  public ApiResponse tableList() {
    return new ApiResponse(repo.getList());
  }

}
