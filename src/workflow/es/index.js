import Vue$1 from 'vue';
import { Prop, Component, Vue, Emit, Watch } from 'vue-property-decorator';
import axios from 'axios';
import MintUI, { MessageBox, Toast, Indicator } from 'mint-ui';
import { Base64 } from 'js-base64';
import moment from 'moment';
import BScroll from 'better-scroll';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var address = {
  modeler_base: '',
  flow_process_base: ''
};

function getModelerBase() {
  console.log('getModelerBase', address.modeler_base);
  return address.modeler_base;
}

function getFlowCenterBase() {
  return address.flow_process_base;
}

var Config =
/** @class */
function () {
  function Config() {
    this._userCode = '';
    this._authToken = '';
    this._debug = false; // 应用编辑

    this._appCode = '';
    this._rgCode = '';
    this._data = {};
  }

  Object.defineProperty(Config.prototype, "userCode", {
    get: function get() {
      return this._userCode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "appCode", {
    get: function get() {
      return this._appCode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "rgCode", {
    get: function get() {
      return this._rgCode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "authToken", {
    get: function get() {
      return this._authToken;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "debug", {
    get: function get() {
      return this._debug;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * 组件全局配置
   */

  Config.prototype.WORKFLOW_GLOBAL_CONFIG_URL = function () {
    return getModelerBase() + "/config/components.json";
  }; // 判断流程是否启动


  Config.prototype.WORKFLOW_IS_STARTED_URL = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/process-isstart/" + businessKey);
  };

  Config.prototype.WORKFLOW_IS_ENDED_URL = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/process-isend-new/" + businessKey);
  };

  Object.defineProperty(Config.prototype, "WORKFLOW_START_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/runtime/fbpm-process-instances";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "WORKFLOW_SUSPEND_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/runtime/fbpm-process-instances/suspend";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "WORKFLOW_RESUME_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/runtime/fbpm-process-instances/active";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "WORKFLOW_TASKS_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/runtime/fbpm-user-task/taskList";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_INFO_URL", {
    get: function get() {
      return getModelerBase() + "/api/flowNode/getNodeInfo";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_STEPS_URL", {
    get: function get() {
      return getModelerBase() + "/api/flowNode/getNextNodes";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_CANCEL_START_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/cancelTask/getCancelStartNodes";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_TYPES_URL", {
    get: function get() {
      return getModelerBase() + "/api/identity/identityTypeNew";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_CATALOG_URL", {
    get: function get() {
      return getModelerBase() + "/api/identity/identityType/listNew";
    },
    enumerable: true,
    configurable: true
  });

  Config.prototype.APPROVE_BY_TASKID_URL = function (taskId) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-approve-tasks-new/" + taskId);
  };

  Config.prototype.APPROVE_BY_BUSSINESSKEY_URL = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-approve-tasks-form-new/" + businessKey);
  };

  Object.defineProperty(Config.prototype, "NODE_USER_LIST_URL", {
    get: function get() {
      return getModelerBase() + "/api/identity/identityListNew";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_BACK_NODE_INFO_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/back/getBackToNodeInfo";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_BACK_NODE_LIST_URL", {
    get: function get() {
      return getFlowCenterBase() + "/api/back/getBackToAnyNodeInfos";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_CAN_REVOKE_URL", {
    // 是否可撤销
    get: function get() {
      return getFlowCenterBase() + "/api/cancelTask/isPermitCancelTask";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "NODE_CAN_REVOKE_BUSINESSKEY_URL", {
    // 是否可撤销BusinessKey
    get: function get() {
      return getFlowCenterBase() + "/api/cancelTask/isPermitCancelTaskByBusinessKeyAndTaskId";
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Config.prototype, "WORKFLOW_REMARK_LIST_URL", {
    // 是否可驳回
    // get NODE_CAN_BACK_URL() {
    //     return getFlowCenterBase() + "/api/back/isPermitBackTaskByBusinessKey";
    // }
    // 批语列表
    get: function get() {
      return getFlowCenterBase() + "/api/runtime/comlang";
    },
    enumerable: true,
    configurable: true
  }); // 保存批语

  Config.prototype.WORKFLOW_REMARK_SAVE_URL = function () {
    return getFlowCenterBase() + "/api/runtime/comlang/save";
  }; // 检查批语是否重复


  Config.prototype.WORKFLOW_IS_REMARK_DUP_URL = function () {
    return getFlowCenterBase() + "/api/runtime/comlang/querycomlang";
  }; // 删除批语


  Config.prototype.WORKFLOW_REMARK_DELETE_URL = function (id) {
    return getFlowCenterBase() + ("/api/runtime/comlang/delete/" + id);
  }; // 星标批语


  Config.prototype.WORKFLOW_REMARK_STAR_URL = function () {
    return getFlowCenterBase() + "/api/runtime/comlang/setstar";
  }; // 驳回url
  // getNodeBackActionUrl(businessKey: string) {
  //     return getFlowCenterBase() + `/api/runtime/fbpm-tasks-businesskey-back/${businessKey}`;
  // }


  Config.prototype.getNodeBackActionUrl = function (taskId) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-tasks-back-taskId/" + taskId);
  }; // 撤销url


  Config.prototype.getNodeCancelActionWithBusinessKeyUrl = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-tasks-businesskey-cancel/" + businessKey);
  };

  Config.prototype.getNodeCancelActionUrl = function (procInstId) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-tasks-cancel/" + procInstId);
  };
  /**
   *  获取流程首节点信息
   */


  Config.prototype.getFirstNodeInfoUrl = function () {
    return getFlowCenterBase() + "/api/runtime/proc-node/getFirstNodesByBizRgUnitCode";
  }; // 流程跟踪：workflow-trace-simple接口


  Config.prototype.getNodeTraceSimpleUrl = function (procInstId) {
    return getFlowCenterBase() + ("/api/query/track-tasks-new/" + procInstId);
  }; // 流程跟踪：workflow-trace-full接口


  Config.prototype.getNodeTraceFullUrl = function (procInstId) {
    return getFlowCenterBase() + ("/api/query/track-all-tasks/" + procInstId);
  }; // 流程跟踪：workflow-trace-form接口


  Config.prototype.getNodeTraceFormUrl = function () {
    return getFlowCenterBase() + "/api/query/track-tasks/bills";
  }; // 流程跟踪：workflow-trace-list接口


  Config.prototype.getNodeTraceListUrl = function (procInstId) {
    return getFlowCenterBase() + ("/api/query/track-tasks-list/" + procInstId);
  }; // 流程跟踪：workflow-trace-flowchart


  Config.prototype.getNodeTraceFlowchartUrl = function (procInstId) {
    return getFlowCenterBase() + ("/api/query/track-tasks-vector/" + procInstId);
  }; // 用户信息url


  Config.prototype.WORKFLOW_USER_INFO_URL = function () {
    return getFlowCenterBase() + "/api/identity/userinfo";
  };
  /**
   * 获取流程信息及当前NodeId
   * @param businessKey
   */


  Config.prototype.WORKFLOW_INFO = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/processQueryBybusinessKey/" + businessKey);
  };
  /**
   * 获取工作流image url
   * @param procDefId
   */


  Config.prototype.WORKFLOW_INFO_IMAGE_URL = function (procDefId) {
    return getModelerBase() + ("/showImage?procDefId=" + procDefId);
  };

  Config.prototype.WORKFLOW_USER_INFO_LIST_URL = function () {
    return getModelerBase() + "/api/identity/userinfo";
  }; // 激活流程url


  Config.prototype.WORKFLOW_ACTIVATE_URL = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-process-instances/reactive/" + businessKey);
  };
  /**
   * 获取工作流单位树url
   */


  Config.prototype.WORKFLOW_UNITS_URL = function () {
    return getModelerBase() + "/api/identity/flowUnitTreeNew";
  };
  /**
   * 获取部门树url
   */


  Config.prototype.WORKFLOW_DEPTS_URL = function () {
    return getModelerBase() + "/api/identity/flowDeptTreeNew";
  };
  /**
   * 获取部门下用户url
   */


  Config.prototype.WORKFLOW_DEPT_USERS_URL = function () {
    return getModelerBase() + "/api/identity/identityList";
  };
  /**
   * 保存签章
   */


  Config.prototype.SIGN_SAVE_URL = function () {
    return getFlowCenterBase() + "/signature/save";
  };
  /**
   * 获取签章数据
   */


  Config.prototype.SIGN_QUERY_URL = function (procInstId) {
    return getFlowCenterBase() + ("/signature/query/" + procInstId);
  };
  /**
   * 获取审批要点列表
   * @param procInstId
   */


  Config.prototype.APPROVE_ELEMENTS_QUERY_URL = function (procInstId) {
    return getFlowCenterBase() + ("/api/runtime/element/query/" + procInstId);
  };
  /**
   * 批量送审url
   * @param tasids
   */


  Config.prototype.WORKFLOW_BATCH_APPROVE_URL = function (tasids) {
    return getFlowCenterBase() + ("/api/runtime/approve-batch-tasks/" + tasids);
  };
  /**
   * 是否支持直接送审
   * @param taskId
   */


  Config.prototype.WORKFLOW_IS_DIRECT_APPROVE_URL = function (taskId) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-task-isback/" + taskId);
  };
  /**
   * 根据taskId直接送审
   * @param taskId
   */


  Config.prototype.WORKFLOW_DIRECT_APPROVE_TASKID_URL = function (taskId) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-tasks-directsubmit-taskId/" + taskId);
  };
  /**
   * 根据businessKey直接送审
   */


  Config.prototype.WORKFLOW_DIRECT_APPROVE_BUSINESSKEY_URL = function (businessKey) {
    return getFlowCenterBase() + ("/api/runtime/fbpm-tasks-directsubmit-businesskey/" + businessKey);
  };

  Config.prototype.setBaseAddress = function (flowModelerBaseUrl, flowProcessBaseUrl) {
    console.log('setBaseAddress', flowModelerBaseUrl, flowProcessBaseUrl);
    address.flow_process_base = flowProcessBaseUrl;
    address.modeler_base = flowModelerBaseUrl;
  };
  /**
   * 设置UserCode
   * @param code
   */


  Config.prototype.setUserCode = function (code) {
    this._userCode = code;
  };
  /**
   * 调协应用Code
   * @param code
   */


  Config.prototype.setAppCode = function (code) {
    this._appCode = code;
  };
  /**
   * 区划code
   */


  Config.prototype.setRegionCode = function (code) {
    this._rgCode = code;
  };

  Config.prototype.setAuthToken = function (token) {
    this._authToken = token;
  };

  Config.prototype.setDebug = function (debug) {
    this._debug = debug;
  };
  /**
   * 获取配置数据
   */


  Config.prototype.getData = function (key) {
    var keys = key.split(".");
    var data = this._data;

    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
      var k = keys_1[_i];

      if (data[k]) {
        data = data[k];
      } else {
        return undefined;
      }
    }

    return data;
  };

  Config.prototype.setData = function (data) {
    this._data = data;
  };
  /**
   * 配置管理(后期调整到数据中)
   */


  Config.prototype.WORKFLOW_ADMIN_CONFIG_URL = function () {
    return getModelerBase() + "/api/proc/config/readFile/admin-config";
  }; // 获取委托人code


  Config.prototype.WORKFLOW_USER_DELEGATE_URL = function () {
    return getFlowCenterBase() + "/api/query/track-tasks-taskdelegate";
  };
  /**
   * 任务中心
   */
  // 获取待办任务列表


  Config.prototype.TASK_TODO_LIST_URL = function () {
    return getFlowCenterBase() + '/center/task/app/todo';
  }; // 获取已办任务列表


  Config.prototype.TASK_DONE_LIST_URL = function () {
    return getFlowCenterBase() + '/center/task/app/done';
  }; // 获取任务变量


  Config.prototype.TASK_CENTER_VARIABLES_REQUEST = function () {
    return getFlowCenterBase() + '/api/runtime/task/variables';
  };

  return Config;
}();
var config = new Config();

var Api =
/** @class */
function () {
  function Api() {
    this._beforeRequest = function () {};

    this._afterRequest = function () {};

    this._onError = function (url, e) {
      return false;
    };
  }

  Api.prototype.onBeforeRequest = function (cb) {
    this._beforeRequest = cb;
  };

  Api.prototype.onAfterRequest = function (cb) {
    this._afterRequest = cb;
  };

  Api.prototype.onError = function (cb) {
    this._onError = cb;
  }; // public get_old(url: string, data: any) {
  //     console.log('get', url);
  //     if(config.authToken) {
  //         axios.defaults.headers.common['Authorization'] = config.authToken;
  //     }
  //     return axios.get(url, {
  //         params: { ...data, userCode: config.userCode }
  //     })
  //     .then(resp => {
  //         this._afterRequest();
  //         if(resp.data.code) {
  //             if(resp.data.code == 200) {
  //                 return resp.data.data;
  //             } else {
  //                 throw resp.data;
  //             }
  //         }
  //         return resp.data;
  //     })
  //     .catch(err => {
  //         this._onError(url, err);
  //         throw err;
  //     });
  // }


  Api.prototype.delete = function (url) {
    var _this = this;

    this._beforeRequest();

    if (config.authToken) {
      axios.defaults.headers.common['Authorization'] = config.authToken;
    }

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return axios.delete(url).then(function (resp) {
      if (resp.data.code == 100200 || resp.data.code == 100201) {
        return resp.data.data;
      } else {
        throw resp.data;
      }

      _this._afterRequest();
    }).catch(function (err) {
      if (_this._onError) {
        _this._onError(url, err);
      }

      throw err;
    });
  };

  Api.prototype.post = function (url, data, json) {
    var _this = this;

    if (data === void 0) {
      data = {};
    }

    if (json === void 0) {
      json = true;
    }

    this._beforeRequest();

    if (config.authToken) {
      axios.defaults.headers.common['Authorization'] = config.authToken;
    }

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return axios.post(url, __assign({}, data)).then(function (resp) {
      _this._afterRequest();

      if (resp.data.code == 100200 || resp.data.code == 100201) {
        return resp.data.data;
      } else {
        throw resp.data;
      } //return resp.data;
      // if(!resp.ok) {
      //     throw new Error(resp.status + ":" + resp.statusText)
      // }
      // if(json) return resp.json();
      // return resp;

    }).catch(function (err) {
      if (_this._onError) {
        _this._onError(url, err);
      }

      throw err;
    }); // return fetch(url, {
    //     method: "post",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": 'application/json'
    //     },
    //     body: JSON.stringify({ userCode: config.userCode, ...data })
    // })
    //     .then(resp => {
    //         this._afterRequest();
    //         console.log('resp', resp);
    //         if(!resp.ok) {
    //             throw new Error(resp.status + ":" + resp.statusText)
    //         }
    //         if(json) return resp.json();
    //         return resp;
    //     })
    //     .catch(err => {
    //         console.log('error', err);
    //         this.onError(err);
    //         throw err;
    //     });
  };

  Api.prototype.get = function (url, data, throwWhenError) {
    var _this = this;

    if (throwWhenError === void 0) {
      throwWhenError = true;
    }

    if (config.authToken) {
      axios.defaults.headers.common['Authorization'] = config.authToken;
    }

    return axios.get(url, {
      params: __assign({}, data)
    }).then(function (resp) {
      _this._afterRequest(); // resp.data.status 处理平台适配层的接口规范


      if (resp.data.code == 100200 || resp.data.code == 200 || resp.data.code == 100201 || resp.data.status === 'success') {
        return resp.data.data;
      } else {
        throw resp.data;
      }
    }).catch(function (err) {
      if (throwWhenError && _this._onError) {
        _this._onError(url, err);
      }

      throw err;
    });
  };

  Api.prototype.getJson = function (url, data, throwWhenError) {
    var _this = this;

    if (throwWhenError === void 0) {
      throwWhenError = true;
    }

    if (config.authToken) {
      axios.defaults.headers.common['Authorization'] = config.authToken;
    }

    return axios.get(url, {
      params: __assign({}, data)
    }).then(function (resp) {
      _this._afterRequest();

      return resp.data;
    }).catch(function (err) {
      if (throwWhenError && _this._onError) {
        _this._onError(url, err);
      }

      throw err;
    });
  };

  Api.prototype.getOld = function (url, data, throwWhenError) {
    var _this = this;

    if (throwWhenError === void 0) {
      throwWhenError = true;
    }

    return axios.get(url, {
      params: __assign({}, data)
    }).then(function (resp) {
      _this._afterRequest();

      return resp.data;
    }).catch(function (err) {
      if (throwWhenError && _this._onError) {
        _this._onError(url, err);
      }

      throw err;
    });
  };

  return Api;
}();

var api = new Api();

/**
 * 判断流程是否启动
 * @param businessKey 单据id
 */

function isWorkflowStarted(businessKey) {
  return api.get(config.WORKFLOW_IS_STARTED_URL(businessKey), {});
}
/**
 * 判断流程是否结束
 * @param businessKey
 */

function isWorkflowEnded(businessKey) {
  return api.get(config.WORKFLOW_IS_ENDED_URL(businessKey), {});
}
/**
 * 获取流程信息
 * @param businessKey
 */

function getWorkflowInfo(businessKey) {
  return api.get(config.WORKFLOW_INFO(businessKey), {
    userCode: config.userCode
  });
}
/**
 * 启动流程
 * @param req
 *  userCode ：流程发起人（必须项）
    processDefinitionId：流程定义Id（可选项）
    processDefinitionKey：流程定义key（可选项）
    message：消息（可选项）
    bizTypeCode：单据类型code
    rgCode：区划code （必须项）
    unitCode：单位code
    businessKey：业务Id（必须项）
 */

function startWorkflow(req) {
  return api.post(config.WORKFLOW_START_URL, req, false);
}
/**
 * 挂起流程
 * @param businessKey
 */

function suspendWorkflow(businessKey) {
  return api.post(config.WORKFLOW_SUSPEND_URL + "/" + businessKey, {}, false);
}
/**
 * 恢复流程
 * @param businessKey
 */

function resumeWorkflow(businessKey) {
  return api.post(config.WORKFLOW_RESUME_URL + "/" + businessKey, {}, false);
}
/**
 * 获取节点属性
 * url: localhost:8082/fbpm-modeler/api/flowNode/getNodeInfo
   请求方式：GET
   请求参数： procDefId(流程定义Id)  nodeId(节点Id)
   响应:
   {
     "code":200,
     "data":{
       "procDefId":"",
       "nodeId":"",
       "nodeName":"",
       "isMultiinstance":"",
       "isPreemptMode":"", //1：抢占   0：非抢占
       "isCheckUsers":"", //1：指派  0:非指派
       "isReject":""      //1：设置驳回  0:无
     }
   }
 */

function getNodeInfo(req) {
  return api.get(config.NODE_INFO_URL, req);
}
/**
 * 获取流程首节点info
 * @param req
 *  bizTypeCode
 *  rgCode
 *  unitCode
 *  userCode
 *  variables
 * @returns
 *  NodeInfo
 */

function getFirstNodeInfo(req) {
  return api.post(config.getFirstNodeInfoUrl(), req);
}
/**
 * 获取当前节点的下一节点列表
 * @param req
 */

function getNodeNextSteps(req) {
  return api.get(config.NODE_STEPS_URL, req);
}
/**
 * 执行撤销操作时，返回撤销操作的源节点
 * @param req
*  procDefId(流程定义Id)
*  nodeId(执行撤销操作的节点Id)
*  procInstId(流程实例Id)
*/

function getNodeCancelStartNodes(req) {
  return api.get(config.NODE_CANCEL_START_URL, req);
}
/**
 * 获取参与人类型
 * @param req
 */

function getNodeParticipantTypes(req) {
  return api.get(config.NODE_TYPES_URL, req);
}
/**
 * 根据参与人类型获取树状目录
 * @param req
 */

function getParticipantCatalog(req) {
  return api.post(config.NODE_CATALOG_URL, __assign(__assign({}, req), {
    userCode: config.userCode
  }));
}
/**
 * 获取参与人分页列表
 * @param req
 */

function getParticipantList(req) {
  return api.get(config.NODE_USER_LIST_URL, req);
}
/**
 * 获取全流程跟踪数据
 * @param req
 */

function getWorkflowTraceFullData(req) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      //return import('./data/trace-data.json').then( data => data.default.data);
      return [2
      /*return*/
      , api.post(config.getNodeTraceFullUrl(req.procInstId), {
        variables: req.variables
      })];
    });
  });
}
/**
 * 获取流程审批列表
 * @param req
 *      procInstId
 *      sort
 */

function getWorkflowTraceListData(req) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // return import('./data/trace-list.json').then( data => data.default.data);
      return [2
      /*return*/
      , api.get(config.getNodeTraceListUrl(req.procInstId), {
        sort: req.sort
      })];
    });
  });
}
/**
 * 审批
 * @param taskId 任务id
 * @param req
 */

function approveByTaskId(taskId, req) {
  return api.post(config.APPROVE_BY_TASKID_URL(taskId), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
}
/**
 * 审批
 * @param businessKey 单据key
 * @param req
 */

function approveByBusinessKey(businessKey, req) {
  return api.post(config.APPROVE_BY_BUSSINESSKEY_URL(businessKey), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
}
/**
 * 获取上一节点，或其它节点的信息
 * @param req
 */

function getBackNodeInfo(req) {
  return api.get("" + config.NODE_BACK_NODE_INFO_URL, req);
}
/**
 * 获取可以驳回的节点列表
 * @param req
 *        procInstId(流程实例Id)
 *        nodeId(当前节点Id)
 */

function getAvaliableBackNodeList(req) {
  return api.get("" + config.NODE_BACK_NODE_LIST_URL, req);
}
/**
 * 撤销
 * @param procInstId 流程实例id
 * @param req
 */

function cancel(procInstId, req) {
  return api.post(config.getNodeCancelActionUrl(procInstId), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
}
/**
 * 撤销
 * @param businessKey 流程实例id
 * @param req
 */

function cancelByBusinessKey(businessKey, req) {
  return api.post(config.getNodeCancelActionWithBusinessKeyUrl(businessKey), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
} // export function back(businessKey: string, req: any) {
//     return api.post(config.getNodeBackActionUrl(businessKey), req, false);
// }

function back(taskId, req) {
  return api.post(config.getNodeBackActionUrl(taskId), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
}
/**
 * 是否可撤销
 * @param procInstId
 * @param req
 */
// export function canTaskRevoke(req: any) {
//     return api.get_old(config.NODE_CAN_REVOKE_URL, req);
// }

/**
 * 是否可撤销
 * @param businessKey
 */

function canTaskRevokeByBusinessKey(businessKey, taskId) {
  try {
    return api.get(config.NODE_CAN_REVOKE_BUSINESSKEY_URL, {
      businessKey: businessKey,
      taskId: taskId
    }, false);
  } catch (e) {
    return false;
  }
}
/**
 * 是否可驳回
 * @param businessKey
 */
// export function canTaskBackByBusinessKey(businessKey: string) {
//     try {
//         return api.get(config.NODE_CAN_BACK_URL, { businessKey }, false);
//     }catch(e) {
//         return false;
//     }
// }

/**
 * 获取待办列表
 * @param req
 *        appCode	应用编码
 *         userCode	用户编码
 *         roleId	角色ID
 *         pageNum	页码
 *         pageSize	每页条数
 *         bizTypeCode	单据类型code
 *
 */

function getTasks(req) {
  return api.get(config.WORKFLOW_TASKS_URL, req);
}
/**
 * 获取用户信息列表
 * @param req
 *        ids  type
 *        基中type:user | role
 */

function getUserInfoList(req) {
  return api.post(config.WORKFLOW_USER_INFO_LIST_URL(), __assign(__assign({}, req), {
    appCode: config.appCode,
    rgCode: config.rgCode
  }));
}
/**
 * 激活流程
 * @param options

 */

function activateWorkflow(businessKey) {
  return api.post(config.WORKFLOW_ACTIVATE_URL(businessKey), {
    businessKey: businessKey,
    userCode: config.userCode
  });
}
/**
 * 批量送审
 * @param taskIds
 * @param data
 *   userCode: 用户Code
    "taskFormRequests": [
        {"businessKey":"单据Id",
        "variables": 单据变量集合 如:[ {"name":"money","type":"integer","value":100}]
    }]
 */

function batchApprove(taskIds, data) {
  return api.post(config.WORKFLOW_BATCH_APPROVE_URL(taskIds), data);
}
/**
 * 根据taskId直接送审
 * @param taskId
 * @param data
 *        userCode: 用户code
 */

function directApproveByTaskId(taskId, data) {
  return api.post(config.WORKFLOW_DIRECT_APPROVE_TASKID_URL(taskId), data);
}
/** 不支持
 * 根据businessKey直接送审
 * @param businessKet
 * @param data
 *        userCode: 用户code
 *        menuId: 菜单Id
 */
// export function directApproveByBusinessKey(businessKet: string, data: any) {
//     return api.post(config.WORKFLOW_DIRECT_APPROVE_BUSINESSKEY_URL(businessKet), data);
// }

/**
 * 是否任务支持直接送审
 * 只有被驳回后才支持
 * @param taskId
 */

function isTaskDirectApprove(taskId) {
  return api.get(config.WORKFLOW_IS_DIRECT_APPROVE_URL(taskId), {}, false);
}
/**
 * 获取配置管理
 */

function getAdminConfig() {
  return __awaiter(this, void 0, void 0, function () {
    var data, e_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2,, 3]);

          return [4
          /*yield*/
          , api.getOld(config.WORKFLOW_ADMIN_CONFIG_URL(), {})];

        case 1:
          data = _a.sent();
          return [2
          /*return*/
          , data];

        case 2:
          e_1 = _a.sent();
          return [3
          /*break*/
          , 3];

        case 3:
          return [2
          /*return*/
          , null];
      }
    });
  });
}
/**
 * 获取用户角色信息
 * @param platAdapterBaseUrl
 * @param req
 */

function getRoleInfoListByUrl(platAdapterBaseUrl, req) {
  // 直接调用适配层地址
  var url = platAdapterBaseUrl + '/fbpm/adapter/findRoleByRoleIds';
  return api.get(url, req);
}
/**
 * 获取任务委托用户code
 * @param taskId
 */

function getTaskDelegateUsers(taskIds) {
  //api/query/track-tasks-taskdelegate
  // return import('./data/delegatedUsers.json').then( data => data.data);
  return api.get("" + config.WORKFLOW_USER_DELEGATE_URL(), {
    taskIds: taskIds || ''
  });
}

/**
 * 批语
 */
/**
 * 请求批语列表
 * @param req
 *        appCode
 *        userCode
 *        size
 */

function getRemarkList(req) {
  return api.get(config.WORKFLOW_REMARK_LIST_URL, __assign(__assign({}, req), {
    userCode: config.userCode
  }));
}
/**
 * 保存批语
 * @param req
 *       text
 *       userCode
 */

function saveRemark(req) {
  return api.post(config.WORKFLOW_REMARK_SAVE_URL(), __assign(__assign({}, req), {
    userCode: config.userCode
  }));
}
/**
 * 是否批语重复
 * @param req
 */

function isRemarkDup(req) {
  return api.get(config.WORKFLOW_IS_REMARK_DUP_URL(), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
}
/**
 * 设置星标
 * @param req
 *         id   批语id
 *         flag   标记 0 | 1
 */

function starRemark(req) {
  return api.post(config.WORKFLOW_REMARK_STAR_URL(), __assign(__assign({}, req), {
    userCode: config.userCode
  }));
}

function formatMillonSecondsToDays(millonSeconds) {
  var days = Math.round(millonSeconds / 1000 / (3600 * 24) * 10) / 10;
  var intPart = parseInt(days.toString());
  var decimalPart = days - intPart; // 小于0.5不显示

  if (days < 0.5) return ""; // 如果小数部分　<0.5 显示为0.5,  > 0.5直接进位

  if (decimalPart < 0.5) return intPart + "\u5929";
  if (decimalPart > 0.5) return intPart + 1 + "\u5929";
  return days + "\u5929";
}

/**
 * 检查输入参数
 * @param arr
 * @param input
 */

function check(name, arr, input) {
  var errCount = 0;
  var params = [];
  arr.forEach(function (v) {
    if (!input[v]) {
      console.error("[" + name + "] \u7F3A\u5C11\u53C2\u6570" + v);
      params.push(v);
      errCount++;
    }
  });

  if (errCount > 0) {
    console.log("[" + name + "]", input);
    error("[" + name + "] \u7F3A\u5C11\u53C2\u6570" + params.join(','));
  }

  return errCount == 0;
}
function checkOr(name, arr1, arr2, input) {
  var errCount1 = 0;
  var errCount2 = 0;
  var params1 = [];
  var params2 = [];
  arr1.forEach(function (v) {
    if (!input[v]) {
      //console.error(`[workflow] ${name} ${v} is required`);
      params1.push(v);
      errCount1++;
    }
  });
  arr2.forEach(function (v) {
    if (!input[v]) {
      //console.error(`[workflow] ${name} ${v} is required`);
      params2.push(v);
      errCount2++;
    }
  });

  if (errCount1 > 0 && errCount2 > 0) {
    error("[" + name + "]\u7F3A\u5C11\u53C2\u6570: " + params1.join(',') + "\u6216" + params2.join(','));
  }

  return errCount1 == 0 || errCount2 == 0;
}
function checkTriple(name, arr1, arr2, arr3, input) {
  var errCount1 = 0;
  var errCount2 = 0;
  var errCount3 = 0;
  var params1 = [];
  var params2 = [];
  arr1.forEach(function (v) {
    if (!input[v]) {
      //console.error(`[workflow] ${name} ${v} is required`);
      params1.push(v);
      errCount1++;
    }
  });
  arr2.forEach(function (v) {
    if (!input[v]) {
      //console.error(`[workflow] ${name} ${v} is required`);
      params2.push(v);
      errCount2++;
    }
  });
  arr3.forEach(function (v) {
    if (!input[v]) {
      errCount3++;
    }
  });

  if (errCount1 > 0 && errCount2 > 0 && errCount3 > 0) {
    error("[" + name + "]\u7F3A\u5C11\u53C2\u6570: " + params1.join(',') + "\u6216" + params2.join(','));
  }

  return errCount1 == 0 || errCount2 == 0 || errCount3 == 0;
}
function error(message, foreShowing) {
  if (foreShowing === void 0) {
    foreShowing = false;
  }

  console.log("[workflow] " + message);

  if (config.debug || foreShowing) {
    MessageBox(config.debug ? 'DEBUG ' : '提示', message);
  }
}

function getConfig(options, defaultOptions) {
  if (defaultOptions === void 0) {
    defaultOptions = {};
  }

  return __awaiter(this, void 0, void 0, function () {
    var mergeOptions, info, opt;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          mergeOptions = __assign(__assign({}, defaultOptions), options);
          if (!(options.businessKey && !options.taskId)) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , getWorkflowInfo(options.businessKey)];

        case 1:
          info = _a.sent();
          info.businessKey = options.businessKey;
          return [2
          /*return*/
          , __assign(__assign({}, mergeOptions), info)];

        case 2:
          opt = {
            businessKey: options.businessKey || '',
            taskId: options.taskId || '',
            procDefId: options.procDefId || '',
            procInstId: options.procInstId || '',
            nodeId: options.nodeId || '',
            appCode: ''
          };
          return [2
          /*return*/
          , __assign(__assign({}, mergeOptions), opt)];
      }
    });
  });
}
function buildTreeNode(list, filter, key) {
  if (filter === void 0) {
    filter = '';
  }

  if (key === void 0) {
    key = 'id';
  }

  var temp = {};
  var tree = [];

  for (var i in list) {
    if (list[i][key]) {
      list[i].value = list[i][key];
      list[i].title = list[i].name;
      temp[list[i].id] = list[i];
    }
  }

  for (var i in temp) {
    if (temp[i].pId && temp[temp[i].pId]) {
      if (!temp[temp[i].pId].children) {
        temp[temp[i].pId].children = [];
      }

      temp[temp[i].pId].children.push(temp[i]);
    } else {
      if (temp[i]) {
        tree.push(temp[i]);
      }
    }
  }

  if (filter) {
    var hit_1 = function hit_1(list) {
      if (!list) return [];
      return list.filter(function (o) {
        var hitted = o.title ? o.title.indexOf(filter) != -1 : false;
        var children = undefined;

        if (o.children) {
          children = hit_1(o.children);
        }

        o.children = children;
        return hitted || (children ? children.length > 0 : false);
      });
    };

    tree = hit_1(tree);
  }

  return tree;
}
function getErrorInfo(e) {
  console.log('getErrorInfo', e);
  var ret = {};
  ret.error = e.code || 1;
  ret.message = e.msg || e.message;

  if (e.response && e.response.data) {
    ret.message = e.response.data.message;
  }

  if (ret.message == "Network Error") {
    ret.message = "网络错误，请检查网络后重试";
  } // if (e.code) {
  //   ret.message = e.msg;
  // }


  return ret;
}
function decodeBase64(str) {
  if (!str) return '';
  return Base64.decode(str);
}

function parseQueryString(url) {
  var obj = {};

  if (url) {
    var params = url.split('?')[1];
    params && params.split('&').forEach(function (val) {
      obj[val.split('=')[0]] = val.split('=')[1];
    });
  }

  return obj;
}

var colorArr = [{
  textColor: '#4A90E2',
  bgColor: '#ECF3FC'
}, {
  textColor: '#99CC00',
  bgColor: '#F4F9E5'
}, {
  textColor: '#FF9900',
  bgColor: '#FFF4E5'
}, {
  textColor: '#99CC00',
  bgColor: '#F4F9E5'
}, {
  textColor: 'orange',
  bgColor: 'yellow'
}, {
  textColor: 'black',
  bgColor: '#ccc'
}];
function matchColor(data) {
  var newData = [];
  var m = 0;
  data.map(function (res) {
    var bizTypeCode = res.bizTypeCode;
    var i = newData.findIndex(function (item) {
      return item.bizTypeCode == bizTypeCode;
    });

    if (i >= 0) {
      //已存在
      newData.push(__assign(__assign({}, newData[i]), res));
    } else {
      //不存在
      newData.push(__assign(__assign({}, res), colorArr[m]));
      m = m + 1;
    }
  });
  return newData;
}

function getUnits(unitCode, name) {
  return __awaiter(this, void 0, void 0, function () {
    var req;
    return __generator(this, function (_a) {
      req = {
        name: '',
        appCode: config.appCode,
        rgCode: config.rgCode,
        unitCode: unitCode
      };
      return [2
      /*return*/
      , api.get(config.WORKFLOW_UNITS_URL(), req).then(function (data) {
        return buildTreeNode(data, name);
      })];
    });
  });
}
function getOrgs(unitCode, name, containUnit) {
  // 服务端不支持关键字搜索
  var req = {
    name: '',
    containUnit: containUnit ? 'Y' : 'N',
    appCode: config.appCode,
    rgCode: config.rgCode,
    unitCode: unitCode
  };
  return api.get(config.WORKFLOW_DEPTS_URL(), req).then(function (data) {
    return buildTreeNode(data, name);
  });
}
/**
 * 获取用部门用户列表
 * @param name
 * @param type
 * @param unitCode
 * @param id
 * @param pageNum
 * @param pageSize
 */

function getOrgUsers(name, type, // 'dept' | 'role',
unitCode, id, pageNum, pageSize) {
  return __awaiter(this, void 0, void 0, function () {
    var req;
    return __generator(this, function (_a) {
      req = {
        type: type,
        name: name,
        id: id,
        pageNum: pageNum,
        pageSize: pageSize,
        appCode: config.appCode,
        rgCode: config.rgCode,
        unitCode: unitCode
      };
      return [2
      /*return*/
      , api.get(config.WORKFLOW_DEPT_USERS_URL(), req)];
    });
  });
}

/**
 * 签名
 */
/**
 * 保存签章
 * @param req
 */

function saveSignData(req) {
  return api.post(config.SIGN_SAVE_URL(), __assign(__assign({}, req), {
    userCode: config.userCode
  }), false);
}
function getSignList(procInstId) {
  return api.get(config.SIGN_QUERY_URL(procInstId), {}, false);
}
function getConfig$1() {
  return api.getJson(config.WORKFLOW_GLOBAL_CONFIG_URL() + '?v=' + Date.now(), {}, false);
}

/**
 * 审批要点
 */
function getApproveElementsList(procInstId) {
  return api.get(config.APPROVE_ELEMENTS_QUERY_URL(procInstId), {}, false);
}

function getTaskTodoList(req) {
  return api.get(config.TASK_TODO_LIST_URL(), req);
}
function getTaskDoneList(req) {
  if (process.env.NODE_ENV == 'development') {
    req = __assign(__assign({}, req), {
      userCode: '200899'
    });
  }

  return api.get(config.TASK_DONE_LIST_URL(), req);
}
function advanceAsk(url, req) {
  return api.post(url, req);
}
function getCenterTaskVariables(req) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , api.get("" + config.TASK_CENTER_VARIABLES_REQUEST(), req)];
    });
  });
}

/**
 * fbpm工作流状态
 */
var FbpmStatus;

(function (FbpmStatus) {
  /**
   * 启动流程
   */
  FbpmStatus["ACTION_INPUT"] = "input";
  /**
   * 审核中
   */

  FbpmStatus["ACTION_COMPLETE"] = "complete";
  /**
   * 回退到上一个任务节点
   */

  FbpmStatus["ACTION_BACK_PREV"] = "back_prev";
  /**
   * 回退到第一个任务节点
   */

  FbpmStatus["ACTION_BACK_FIRST"] = "back_first";
  /**
   * 回退到任一个任务节点
   */

  FbpmStatus["ACTION_BACK_ANY"] = "back_any";
  /**
   * 撤回 或者 收回 或者撤销
   */

  FbpmStatus["ACTION_RECALL"] = "cancel";
  /**
   * 认领
   */

  FbpmStatus["ACTION_CLAIM"] = "claim";
  /**
   * 委托
   */

  FbpmStatus["ACTION_DELEGATE"] = "delegate";
  /**
   * 审核中（委托任务）
   */

  FbpmStatus["ACTION_RESOLVE"] = "resolve";
  /**
   * 自由跳转
   */

  FbpmStatus["ACTION_JUMP"] = "jump";
  /**
   * 传阅
   */

  FbpmStatus["ACTION_CIRCULATE"] = "circulate";
})(FbpmStatus || (FbpmStatus = {}));

var TaskState;

(function (TaskState) {
  /**
   * 未开始
   */
  TaskState[TaskState["NotStart"] = 0] = "NotStart";
  /**
   * 已审核
   */

  TaskState[TaskState["Approved"] = 1] = "Approved";
  /**
   * 审核中
   */

  TaskState[TaskState["Process"] = 2] = "Process";
  /**
   * 驳回
   */

  TaskState[TaskState["Back"] = 3] = "Back";
  /**
   * 被驳回
   */

  TaskState[TaskState["Backed"] = 4] = "Backed";
  /**
   * 撤销
   */

  TaskState[TaskState["Cancel"] = 5] = "Cancel";
  /**
   * 已提交
   */

  TaskState[TaskState["Submitted"] = 6] = "Submitted";
  /**
   * 待提交
   */

  TaskState[TaskState["Submitting"] = 7] = "Submitting";
})(TaskState || (TaskState = {}));

/**
 * 审批流
 */
var ApproveFlows;

(function (ApproveFlows) {
  /**
   * 审批要点
   */
  ApproveFlows[ApproveFlows["ApproveElements"] = 1] = "ApproveElements";
  /**
   * 审批意见
   */

  ApproveFlows[ApproveFlows["Messge"] = 2] = "Messge";
  /**
   * 下一步参与人
   */

  ApproveFlows[ApproveFlows["Users"] = 3] = "Users";
  /**
   * 确认
   */

  ApproveFlows[ApproveFlows["Confirm"] = 4] = "Confirm";
})(ApproveFlows || (ApproveFlows = {}));

var Icon =
/** @class */
function (_super) {
  __extends(Icon, _super);

  function Icon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Icon.prototype.render = function (h) {
    return h("div", {
      "class": "workflow-icon",
      style: "" + (this.primary ? 'workflow-icon-primary' : '')
    });
  };

  __decorate([Prop()], Icon.prototype, "primary", void 0);

  Icon = __decorate([Component], Icon);
  return Icon;
}(Vue);

var Empty =
/** @class */
function (_super) {
  __extends(Empty, _super);

  function Empty() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Empty.prototype.render = function (h) {
    return h("div", {
      "class": "workflow-empty",
      style: {
        height: "" + this.height
      }
    }, [h("div", [h("w-icon", {
      "class": "workflow-nodata"
    })]), h("div", ["\u6CA1\u6709\u627E\u5230\u6570\u636E"])]);
  };

  __decorate([Prop({
    default: "100%"
  })], Empty.prototype, "height", void 0);

  Empty = __decorate([Component({
    components: {
      'w-icon': Icon
    }
  })], Empty);
  return Empty;
}(Vue);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

//import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
// @Component({
//     components: {
//         'w-node': {
//             functional: true,
//             render: (h, ctx) => ctx.props.vnode
//         },
//     }
// })
var Checklist = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      ref: "wrapper",
      staticClass: "workflow-checklist",
      style: {
        height: _vm.wrapperHeight + 'px',
        overflow: 'auto'
      }
    }, [_c('div', {
      directives: [{
        name: "infinite-scroll",
        rawName: "v-infinite-scroll",
        value: _vm.loadMore,
        expression: "loadMore"
      }],
      staticClass: "mint-checklist",
      attrs: {
        "infinite-scroll-immediate-check": "false",
        "infinite-scroll-disabled": "loading",
        "infinite-scroll-distance": "50"
      }
    }, _vm._l(_vm.options, function (option) {
      return _c('mt-cell', {
        key: option.id
      }, [_c('label', {
        staticClass: "mint-checklist-label",
        style: {
          textAlign: 'left'
        },
        attrs: {
          "slot": "title"
        },
        slot: "title"
      }, [_c('span', {
        staticClass: "mint-checkbox is-right"
      }, [_c('input', {
        staticClass: "mint-checkbox-input",
        attrs: {
          "type": "checkbox",
          "disabled": option.disabled
        },
        domProps: {
          "value": option.value,
          "checked": option.selected
        },
        on: {
          "change": function change($event) {
            return _vm.onChange($event, option);
          }
        }
      }), _vm._v(" "), _c('span', {
        staticClass: "mint-checkbox-core"
      })]), _vm._v(" "), _c('span', {
        staticClass: "mint-checkbox-label"
      }, [_c('w-node', {
        attrs: {
          "vnode": option.label
        }
      })], 1)])]);
    }), 1), _vm._v(" "), _vm.loading ? _c('p', {
      staticClass: "workflow-loading"
    }, [_c('mt-spinner', {
      attrs: {
        "type": "fading-circle"
      }
    }), _vm._v("加载中...\n    ")], 1) : _vm._e(), _vm._v(" "), _vm.finished ? _c('p', {
      staticClass: "workflow-finished"
    }, [_vm._v("\n        没有数据了\n    ")]) : _vm._e()]);
  },
  staticRenderFns: [],
  name: 'w-checklist',
  components: {
    'w-node': {
      functional: true,
      render: function render(h, ctx) {
        return ctx.props.vnode;
      }
    }
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    options: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      wrapperHeight: 0,
      hasMore: false
    };
  },
  // get myOptions() {
  //     return this.options || [];
  // }
  // @Emit('change')
  // change(values) {
  // }
  // @Emit('more')
  // async onMore() :Promise<boolean>{
  //     return false;
  // }
  mounted: function mounted() {
    var wrapper = this.$refs.wrapper;

    if (wrapper) {
      this.wrapperHeight = document.documentElement.clientHeight - wrapper.getBoundingClientRect().top;
    }
  },
  methods: {
    loadMore: function loadMore() {
      var _this = this;

      setTimeout(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.$emit('more'); //await this.onMore();


              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), 100);
    },
    onChange: function onChange(e, option) {
      var selected = e.target.checked; //let id = e.target.value;

      option.selected = selected;
      var values = this.options.filter(function (option) {
        return option.selected;
      }).map(function (option) {
        return option.value;
      }); //this.change(values)

      this.$emit('change', values);
    }
  }
};

//import { Cell } from 'mint-ui';

var List =
/** @class */
function (_super) {
  __extends(List, _super);

  function List() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  List.prototype.change = function (value, item) {};

  List.prototype.render = function (h) {
    var _this = this;

    var source = this.dataSource || [];
    return h("ul", {
      "class": "workflow-list"
    }, [source.map(function (item) {
      return h("li", {
        key: item.value,
        on: {
          "click": function click() {
            _this.change(item.value, item);
          }
        }
      }, [h("div", [item.label])]);
    })]);
  };

  __decorate([Prop()], List.prototype, "dataSource", void 0);

  __decorate([Emit('change')], List.prototype, "change", null);

  List = __decorate([Component], List);
  return List;
}(Vue);

var Search =
/** @class */
function (_super) {
  __extends(Search, _super);

  function Search() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.input = '';
    return _this;
  }

  Search.prototype.onSearch = function (text) {};

  Search.prototype.render = function (h) {
    var placeholder = this.placeholder || '搜索';
    return h("div", {
      "class": "workflow-search"
    }, [h("div", {
      "class": "workflow-searchbar"
    }, [h("div", {
      "class": "workflow-searchbar-inner"
    }, [h("i", {
      "class": "mintui mintui-search"
    }), h("input", {
      ref: "input",
      domProps: {
        "value": this.input
      },
      attrs: {
        type: "search",
        placeholder: placeholder
      },
      on: {
        "keyup": this.enter,
        "input": this.onInput
      },
      "class": "workflow-searchbar-core"
    })])])]);
  };

  Search.prototype.onInput = function (e) {
    this.input = e.target.value;
  };

  Search.prototype.enter = function (e) {
    if (e.key === 'Enter') {
      this.onSearch(this.input);
    }
  };

  __decorate([Prop()], Search.prototype, "placeholder", void 0);

  __decorate([Emit('search')], Search.prototype, "onSearch", null);

  Search = __decorate([Component], Search);
  return Search;
}(Vue);

var PAGE_SIZE = 8;

var SelectUsers =
/** @class */
function (_super) {
  __extends(SelectUsers, _super);

  function SelectUsers() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.searchText = '';
    _this.selectedUsersInPopup = []; // 是否显示下一步骤popup

    _this.isNextStepsPopup = false; // 参与人类型popup

    _this.isParticipantTypePopup = false; // 参与人目录popup

    _this.isParticipantCatalogPopup = false; // 用户列表popup

    _this.isUsersPopup = false;
    _this.currentPage = 0;
    _this.userPageCount = 1;
    _this.pageTotal = 0;
    _this.steps = [];
    _this.selectedNodeId = "";
    _this.selectedNodeName = "";
    _this.type = {}; // 参与人类型列表

    _this.types = []; // 参与人类型目录列表

    _this.catalogList = [];
    _this.catalog = {}; // 用户列表

    _this.userList = [];
    _this.nodeDataMap = new Map();
    _this.userMap = new Map();
    _this.selectedUsers = []; // 加载用户列表

    _this.loadingUserList = false;
    _this.loadAllFinished = false; // 抢占

    _this.nextIsPreemptMode = false; // 会签

    _this.nextNodeIsMultiple = false;
    return _this;
  }

  SelectUsers.prototype.back = function () {};

  SelectUsers.prototype.ok = function () {
    //return this.selectedUsers;
    return {
      users: this.selectedUsers,
      selectedNodeId: this.selectedNodeId,
      nextIsPreemptMode: this.nextIsPreemptMode,
      nextNodeIsMultiple: this.nextNodeIsMultiple
    };
  };

  SelectUsers.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, node, _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            // 获取节点步骤
            _a = this;
            return [4
            /*yield*/
            , getNodeNextSteps({
              //procInstId: this.workflowInfo.procInstId,
              procDefId: this.extra.procDefId,
              nodeId: this.extra.nodeId,
              appCode: this.extra.appCode
            })];

          case 1:
            // 获取节点步骤
            _a.steps = _c.sent();
            if (!(this.steps && this.steps.length > 0)) return [3
            /*break*/
            , 3];
            node = this.steps[0];
            this.selectedNodeId = node.nodeId;
            this.selectedNodeName = node.nodeName;
            console.log('next', node);
            this.nextIsPreemptMode = node.isPreemptMode == "1";
            this.nextNodeIsMultiple = node.isMultiinstance == "1";
            console.log('selectedNodeId', this.selectedNodeId);
            _b = this;
            return [4
            /*yield*/
            , getNodeParticipantTypes({
              procDefId: this.extra.procDefId,
              nodeId: this.selectedNodeId,
              appCode: this.extra.appCode,
              creatorCode: this.extra.creatorCode
            })];

          case 2:
            _b.types = _c.sent() || [];

            if (this.types && this.types.length > 0) {
              this.type = this.types[0];
              this.handleTypeChange(this.type);
            }

            _c.label = 3;

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  SelectUsers.prototype.render = function (h) {
    var _this = this;

    return h("div", [h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.visible
      }
    }, [h("mt-header", {
      attrs: {
        title: "审批流程",
        isLink: true
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": this.back
      }
    }, ["\u8FD4\u56DE"])]), h("mt-cell", {
      attrs: {
        title: "下一步骤",
        value: this.selectedNodeName,
        to: null,
        isLink: true
      },
      nativeOn: {
        "click": function click() {
          _this.isNextStepsPopup = true;
        }
      }
    }), h("mt-cell", {
      attrs: {
        title: "参与人类型",
        isLink: true,
        value: this.type.name
      },
      nativeOn: {
        "click": function click() {
          _this.isParticipantTypePopup = true;
        }
      }
    }), h("mt-cell", {
      attrs: {
        title: "角色列表/部门列表",
        isLink: true,
        value: this.catalog.name
      },
      nativeOn: {
        "click": function click() {
          _this.isParticipantCatalogPopup = true;
        }
      }
    }), h("mt-cell", {
      attrs: {
        title: "人员列表",
        value: this.renderUserNames(),
        isLink: true
      },
      nativeOn: {
        "click": function click() {
          _this.isUsersPopup = true;

          _this.onSearch('');
        }
      }
    }), h("div", {
      "class": "workflow-page-actions"
    }, [h("mt-button", {
      attrs: {
        type: "primary"
      },
      on: {
        "click": function click() {
          if (_this.selectedUsers && _this.selectedUsers.length == 0) {
            Toast('请选择下一步骤人员');
            return;
          }

          _this.ok();
        }
      }
    }, [this.okText])])]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isNextStepsPopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "选择下一步骤"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isNextStepsPopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          _this.isNextStepsPopup = false;
          _this.selectedNodeId = v;
          _this.selectedNodeName = item.label;

          _this.onNodeStepChange(v);
        }
      },
      attrs: {
        dataSource: this.steps.map(function (step) {
          return {
            value: step.nodeId,
            label: step.nodeName
          };
        })
      }
    })]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isParticipantTypePopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "选择参与人类型"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isParticipantTypePopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          _this.isParticipantTypePopup = false;
          console.log('type', item);
          _this.type = {
            type: item.value,
            name: item.label
          };

          _this.handleTypeChange(_this.type);
        }
      },
      attrs: {
        dataSource: this.types.map(function (type) {
          return {
            value: type.type,
            label: type.name
          };
        })
      }
    })]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isParticipantCatalogPopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "选择参与人目录"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isParticipantCatalogPopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          _this.isParticipantCatalogPopup = false;
          console.log('catalog', item);
          _this.catalog.id = item.value;
          _this.catalog.name = item.label;
        }
      },
      attrs: {
        dataSource: this.catalogList.map(function (catalog) {
          return {
            value: catalog.id,
            label: catalog.name
          };
        })
      }
    })]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isUsersPopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "选择人员"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isUsersPopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-search", {
      attrs: {
        value: this.searchText
      },
      on: {
        "search": function search(key) {
          return _this.onSearch(key);
        }
      }
    }), this.userList && this.userList.length > 0 ? h("w-checklist", {
      attrs: {
        loading: this.loadingUserList,
        finished: this.loadAllFinished,
        align: "right",
        options: this.userList.map(function (u) {
          return {
            label: h("span", [h("div", [h("span", {
              "class": "workflow-user-code"
            }, [u.userCode]), h("span", {
              "class": "workflow-user-name"
            }, [u.userName])]), h("div", [h("span", {
              "class": "workflow-unit-name"
            }, [u.unitName]), h("span", {
              "class": "workflow-dept-name"
            }, [u.deptName])])]),
            selected: false,
            value: u.userCode
          };
        })
      },
      on: {
        "more": function more() {
          return __awaiter(_this, void 0, void 0, function () {
            var _this = this;

            return __generator(this, function (_a) {
              return [2
              /*return*/
              , new Promise(function (resolve, reject) {
                if (_this.currentPage < _this.pageTotal) {
                  _this.searchUserList(_this.type.type, _this.catalog.id, _this.currentPage + 1, _this.searchText);

                  resolve(true);
                } else {
                  resolve(false);
                }
              })];
            });
          });
        },
        "change": function change(values) {
          console.log(values);

          var users = _this.userList.filter(function (u) {
            return values.includes(u.userCode);
          });

          _this.selectedUsersInPopup = users;
        }
      }
    }) : h("w-empty"), h("div", {
      "class": "workflow-page-actions"
    }, [h("mt-button", {
      attrs: {
        type: "primary"
      },
      on: {
        "click": function click() {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              this.isUsersPopup = false;
              this.selectedUsers = this.selectedUsersInPopup;
              return [2
              /*return*/
              ];
            });
          });
        }
      }
    }, ["\u786E\u5B9A"])])])]);
  };

  SelectUsers.prototype.renderUserNames = function () {
    var ret = '请选择';

    if (this.selectedUsers.length > 0) {
      ret = this.selectedUsers.map(function (u) {
        return u.userName;
      }).join(', ');

      if (ret.length > 12) {
        ret = ret.substr(0, 12) + '...';
      }
    }

    return ret;
  };
  /**
   * 选择下一步节点
   */


  SelectUsers.prototype.onNodeStepChange = function (v) {
    return __awaiter(this, void 0, void 0, function () {
      var node, _a;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            this.nodeDataMap.set(this.selectedNodeId, this.selectedUsers);
            this.selectedNodeId = v;
            node = this.steps.find(function (n) {
              return n.nodeId == _this.selectedNodeId;
            });
            console.log('next', node);
            this.nextIsPreemptMode = node.isPreemptMode == "1";
            this.nextNodeIsMultiple = node.isMultiinstance == "1";
            this.selectedUsers = this.nodeDataMap.get(this.selectedNodeId) || [];
            _a = this;
            return [4
            /*yield*/
            , getNodeParticipantTypes({
              procDefId: this.extra.procDefId,
              nodeId: v,
              appCode: this.extra && this.extra.appCode,
              rgCode: this.extra && this.extra.rgCode,
              unitCode: this.extra && this.extra.unitCode
            })];

          case 1:
            _a.types = _b.sent();

            if (this.types && this.types.length > 0) {
              this.type = this.types[0];
              this.handleTypeChange(this.type);
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * 选择参与人类型
   */


  SelectUsers.prototype.handleTypeChange = function (t) {
    return __awaiter(this, void 0, void 0, function () {
      var variables, data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log("handleTypeChange", t);
            this.type = t;
            variables = this.extra.variables.map(function (v) {
              return __assign(__assign({}, v), {
                name: v.name.replace('$_', 'fvar_')
              });
            });
            console.log('variables', variables);
            return [4
            /*yield*/
            , getParticipantCatalog({
              procDefId: this.extra.procDefId,
              nodeId: this.selectedNodeId,
              appCode: this.extra && this.extra.appCode,
              rgCode: this.extra && this.extra.rgCode,
              unitCode: this.extra && this.extra.unitCode,
              type: t.type,
              businessKey: this.extra.businessKey,
              creatorCode: this.extra.creatorCode,
              variables: variables
            })];

          case 1:
            data = _a.sent();
            this.catalogList = this.buildTreeNode(data);

            if (this.catalogList && this.catalogList.length > 0) {
              this.catalog = this.catalogList[0];
              this.searchUserList(t.type, this.catalog.id, 1, '');
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * 搜索参与人
   */


  SelectUsers.prototype.onSearch = function (v) {
    console.log("search", v);
    this.userList = [];
    this.searchText = v;
    this.searchUserList(this.type.type, this.catalog.id, 1, v);
  };

  SelectUsers.prototype.searchUserList = function (type, key, pageNum, name) {
    return __awaiter(this, void 0, void 0, function () {
      var param, data, list;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            param = {
              type: this.type.type,
              id: key,
              name: name,
              pageNum: pageNum,
              pageSize: PAGE_SIZE,
              appCode: this.extra && this.extra.appCode || '',
              rgCode: this.extra && this.extra.rgCode || '',
              unitCode: this.extra && this.extra.unitCode || '',
              procDefId: this.extra.procDefId,
              nodeId: this.selectedNodeId
            };
            _b.label = 1;

          case 1:
            _b.trys.push([1,, 3, 4]);

            this.loadingUserList = true;
            return [4
            /*yield*/
            , getParticipantList(param)];

          case 2:
            data = _b.sent();

            if (data) {
              list = data.rows || [];

              (_a = this.userList).push.apply(_a, list);

              console.log('userList', this.userList);
              this.pageTotal = data.total;
              this.currentPage = data.page; // 只有多页时才显示 “没有数据了”提示

              this.loadAllFinished = this.pageTotal > 1 && data.page == data.total;
            }

            return [3
            /*break*/
            , 4];

          case 3:
            this.loadingUserList = false;
            return [7
            /*endfinally*/
            ];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  SelectUsers.prototype.buildTreeNode = function (list) {
    var temp = {};
    var tree = [];

    for (var i in list) {
      temp[list[i].id] = list[i];
    }

    for (var i in temp) {
      if (temp[i].pId) {
        if (!temp[temp[i].pId].children) {
          temp[temp[i].pId].children = [];
        }

        temp[temp[i].pId].children.push(temp[i]);
      } else {
        tree.push(temp[i]);
      }
    }

    return tree;
  };

  __decorate([Prop({
    default: false
  })], SelectUsers.prototype, "visible", void 0);

  __decorate([Prop({
    default: '下一步'
  })], SelectUsers.prototype, "okText", void 0);

  __decorate([Prop()], SelectUsers.prototype, "extra", void 0);

  __decorate([Emit('back')], SelectUsers.prototype, "back", null);

  __decorate([Emit('ok')], SelectUsers.prototype, "ok", null);

  SelectUsers = __decorate([Component({
    components: {
      "w-empty": Empty,
      "w-checklist": Checklist,
      "w-list": List,
      "w-search": Search
    }
  })], SelectUsers);
  return SelectUsers;
}(Vue);

var Sep =
/** @class */
function (_super) {
  __extends(Sep, _super);

  function Sep() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Sep.prototype.render = function (h) {
    return h("div", {
      "class": "workflow-page-sep"
    });
  };

  Sep = __decorate([Component], Sep);
  return Sep;
}(Vue);

var REMARK_TYPE = 'approve';

var Message =
/** @class */
function (_super) {
  __extends(Message, _super);

  function Message() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.isRemarkPopup = false;
    _this.approveText = '';
    _this.remarks = [];
    _this.saveAsRemark = false;
    return _this;
  }

  Message.prototype.back = function () {};

  Message.prototype.ok = function () {
    return this.approveText;
  };

  Message.prototype.mounted = function () {
    // 审核默认意见
    this.approveText = config.getData('approve.text') || '';
  };
  /**
   * 输入批语
   */


  Message.prototype.onInputChange = function (v) {
    this.approveText = v;
  };

  Message.prototype.render = function (h) {
    var _this = this;

    var okText = this.okText || '下一步';
    return h("div", [h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.visible
      }
    }, [h("mt-header", {
      attrs: {
        title: "审批意见"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": this.back
      }
    }, ["\u8FD4\u56DE"])]), h("mt-cell", {
      attrs: {
        title: "常用批语",
        value: "",
        isLink: true
      },
      nativeOn: {
        "click": function click() {
          _this.isRemarkPopup = true;

          _this.getRemarkList();
        }
      }
    }), h("mt-field", {
      attrs: {
        placeholder: "请填写审批意见",
        type: "textarea",
        rows: "4",
        value: this.approveText
      },
      on: {
        "input": this.onInputChange
      }
    }), h("mt-cell", {
      attrs: {
        title: "存为常用批语"
      }
    }, [h("mt-switch", {
      attrs: {
        value: this.saveAsRemark
      },
      on: {
        "input": function input(v) {
          return _this.saveAsRemark = v;
        }
      }
    })]), h("div", {
      "class": "workflow-page-actions"
    }, [h("mt-button", {
      attrs: {
        type: "primary"
      },
      on: {
        "click": function click() {
          return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!this.saveAsRemark) return [3
                  /*break*/
                  , 5];
                  _a.label = 1;

                case 1:
                  _a.trys.push([1, 4,, 5]);

                  return [4
                  /*yield*/
                  , isRemarkDup({
                    appCode: this.appCode,
                    comLang: this.approveText,
                    type: REMARK_TYPE
                  })];

                case 2:
                  _a.sent();

                  return [4
                  /*yield*/
                  , saveRemark({
                    appCode: this.appCode,
                    text: this.approveText,
                    type: REMARK_TYPE
                  })];

                case 3:
                  _a.sent();

                  return [3
                  /*break*/
                  , 5];

                case 4:
                  e_1 = _a.sent();
                  Toast('批语已存在, 不能保存重复批语');
                  return [2
                  /*return*/
                  ];

                case 5:
                  this.ok();
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        }
      }
    }, [okText])])]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isRemarkPopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "常用批语"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isRemarkPopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          _this.isRemarkPopup = false;
          _this.approveText = item.label;
        }
      },
      attrs: {
        dataSource: this.remarks.map(function (remark) {
          return {
            value: remark.id,
            label: remark.text
          };
        })
      }
    })])]);
  }; // 获取批语列表


  Message.prototype.getRemarkList = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this;
            return [4
            /*yield*/
            , getRemarkList({
              appCode: config.appCode,
              userCode: config.userCode,
              size: 10,
              type: REMARK_TYPE
            })];

          case 1:
            _a.remarks = _b.sent();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  __decorate([Prop({
    default: false
  })], Message.prototype, "visible", void 0);

  __decorate([Prop({
    default: ''
  })], Message.prototype, "appCode", void 0);

  __decorate([Prop({
    default: '下一步'
  })], Message.prototype, "okText", void 0);

  __decorate([Emit('back')], Message.prototype, "back", null);

  __decorate([Emit('ok')], Message.prototype, "ok", null);

  Message = __decorate([Component({
    components: {
      "aw-empty": Empty,
      "w-list": List,
      "w-sep": Sep
    }
  })], Message);
  return Message;
}(Vue);

var Elements =
/** @class */
function (_super) {
  __extends(Elements, _super);
  /**
   * 审批要点
   */


  function Elements() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.isRemarkPopup = false;
    _this.approveText = '';
    _this.remarks = [];
    return _this;
  }

  Elements.prototype.back = function () {};

  Elements.prototype.ok = function () {};
  /**
   * 输入批语
   */


  Elements.prototype.onInputChange = function (v) {
    this.approveText = v;
  };

  Elements.prototype.render = function (h) {
    var _this = this;

    var okText = this.okText || '下一步';
    return h("div", [h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.visible
      }
    }, [h("mt-header", {
      attrs: {
        title: "审批要点"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": this.back
      }
    }, ["\u8FD4\u56DE"])]), h("w-checklist", {
      attrs: {
        align: "right",
        options: this.elements.map(function (e) {
          return {
            value: e.id,
            selected: e.selected || false,
            label: h("span", [e.elementName, e.isRequired == '1' && h("span", {
              "class": "element-required"
            })])
          };
        })
      },
      on: {
        "change": function change(values) {
          console.log(values);

          for (var _i = 0, _a = _this.elements; _i < _a.length; _i++) {
            var e = _a[_i];
            e.selected = values.includes(e.id);
          }
        }
      }
    }), h("div", {
      "class": "workflow-page-actions"
    }, [h("mt-button", {
      attrs: {
        type: "primary"
      },
      on: {
        "click": this.ok
      }
    }, [okText])])])]);
  };

  __decorate([Prop({
    default: false
  })], Elements.prototype, "visible", void 0);

  __decorate([Prop({
    default: '下一步'
  })], Elements.prototype, "okText", void 0);

  __decorate([Prop({
    default: []
  })], Elements.prototype, "elements", void 0);

  __decorate([Prop({
    default: false
  })], Elements.prototype, "isBackFromConfrimPage", void 0);

  __decorate([Emit('back')], Elements.prototype, "back", null);

  __decorate([Emit('ok')], Elements.prototype, "ok", null);

  Elements = __decorate([Component({
    components: {
      "aw-empty": Empty,
      "w-checklist": Checklist,
      "w-list": List
    }
  })
  /**
   * 审批要点
   */
  ], Elements);
  return Elements;
}(Vue);

var Confirm =
/** @class */
function (_super) {
  __extends(Confirm, _super);

  function Confirm() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Confirm.prototype.back = function () {};

  Confirm.prototype.move = function (flow) {};

  Confirm.prototype.ok = function () {};
  /**
   * 输入批语
   */


  Confirm.prototype.onInputChange = function (v) {
    this.approveText = v;
  };

  Confirm.prototype.render = function (h) {
    var _this = this;

    var elements = this.elements || [];
    var flows = this.flows || [];
    return h("div", [h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.visible
      }
    }, [h("mt-header", {
      attrs: {
        title: "审批确认",
        isLink: true
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": this.back
      }
    }, ["\u8FD4\u56DE"])]), flows.includes(ApproveFlows.ApproveElements) && h("div", [h("mt-cell", {
      attrs: {
        title: "审批要点",
        isLink: true
      },
      "class": "workflow-cell-title",
      nativeOn: {
        "click": function click() {
          return _this.move(ApproveFlows.ApproveElements);
        }
      }
    }), elements.filter(function (element) {
      return element.selected;
    }).map(function (element, index) {
      return h("mt-cell", {
        attrs: {
          title: index + 1 + ". " + element.elementName
        }
      });
    }), h("w-sep")]), h("mt-cell", {
      attrs: {
        title: "审批意见",
        isLink: true
      },
      "class": "workflow-cell-title",
      nativeOn: {
        "click": function click() {
          return _this.move(ApproveFlows.Messge);
        }
      }
    }), h("mt-cell", {
      attrs: {
        title: this.approveText || ''
      }
    }), h("w-sep"), flows.includes(ApproveFlows.Users) && h("div", [h("mt-cell", {
      attrs: {
        title: "下一岗审批人",
        isLink: true
      },
      "class": "workflow-cell-title",
      nativeOn: {
        "click": function click() {
          return _this.move(ApproveFlows.Users);
        }
      }
    }), h("mt-cell", {
      attrs: {
        title: this.getUsersName()
      }
    })]), h("div", {
      "class": "workflow-page-actions"
    }, [h("mt-button", {
      attrs: {
        type: "primary"
      },
      on: {
        "click": this.ok
      }
    }, [this.okText])])])]);
  };

  Confirm.prototype.getUsersName = function () {
    var users = this.users || [];
    var name = users.map(function (u) {
      return u.userName;
    }).join(',');

    if (name.length > 12) {
      return name.substr(0, 12) + '...';
    }

    return name;
  };

  __decorate([Prop({
    default: false
  })], Confirm.prototype, "visible", void 0);

  __decorate([Prop({
    default: '确定'
  })], Confirm.prototype, "okText", void 0);

  __decorate([Prop({
    default: []
  })], Confirm.prototype, "elements", void 0);

  __decorate([Prop({
    default: ''
  })], Confirm.prototype, "approveText", void 0);

  __decorate([Prop({
    default: []
  })], Confirm.prototype, "users", void 0);

  __decorate([Prop({
    default: []
  })], Confirm.prototype, "flows", void 0);

  __decorate([Emit('back')], Confirm.prototype, "back", null);

  __decorate([Emit('move')], Confirm.prototype, "move", null);

  __decorate([Emit('ok')], Confirm.prototype, "ok", null);

  Confirm = __decorate([Component({
    components: {
      "aw-empty": Empty,
      "w-list": List,
      "w-sep": Sep
    }
  })], Confirm);
  return Confirm;
}(Vue);

var WorkflowApprove =
/** @class */
function (_super) {
  __extends(WorkflowApprove, _super);

  function WorkflowApprove() {
    var _this = _super !== null && _super.apply(this, arguments) || this; // 允许显示的审批流


    _this.allowedFlows = []; // 审批流

    _this.approveFlow = ApproveFlows.ApproveElements; // 是否从确认页返回

    _this.isBackFromConfirm = false; // 审批要点

    _this.elements = []; // 批语

    _this.approveText = '';
    _this.selectedUsers = []; // 下一步骤节点

    _this.selectedNodeId = ""; // 抢占

    _this.nextIsPreemptMode = false; // 会签

    _this.nextNodeIsMultiple = false; // 保存忙碌状态

    _this.saveBusying = false; // 当前节点

    _this.node = {};
    _this.isAllowedUsers = false;
    return _this;
  }

  WorkflowApprove.prototype.onVisibleChanged = function (val, oldVal) {
    if (val) {
      this.reinit(this.options);
    }
  };

  WorkflowApprove.prototype.onOptionsChanged = function (val, oldVal) {
    if (this.visible && val) {
      this.reinit(val);
    }
  };

  WorkflowApprove.prototype.onSelected = function (e) {
    return __awaiter(this, void 0, void 0, function () {
      var ret, users, sel, opts, elements, data, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ret = {
              error: 0,
              message: ''
            };
            this.saveBusying = true;
            this.openLoading();
            users = [];

            if (this.selectedUsers && this.selectedUsers.length > 0) {
              users = this.selectedUsers.map(function (u) {
                return {
                  assignee: u.userCode,
                  assigneeName: u.userName,
                  assigneeType: 'user'
                };
              });
            }

            sel = {
              nextNodeId: this.selectedNodeId,
              nextUsers: users,
              isNextPreemptMode: this.nextIsPreemptMode,
              isNextNodeMultiple: this.nextNodeIsMultiple,
              message: this.approveText
            };
            _a.label = 1;

          case 1:
            _a.trys.push([1, 9, 10, 11]);

            opts = this.options;
            opts.approveFirstNode = opts.approveFirstNode || true;
            elements = this.checkApproveElements();
            return [4
            /*yield*/
            , startWorkflow({
              appCode: config.appCode,
              bizTypeCode: opts.bizTypeCode,
              businessKey: opts.businessKey,
              rgCode: opts.rgCode,
              unitCode: opts.unitCode,
              userCode: opts.userCode,
              // 发起人
              creatorCode: this.node.creatorCode,
              variables: this.variables
            })];

          case 2:
            data = _a.sent();
            if (!sel.isNextPreemptMode) return [3
            /*break*/
            , 4];
            return [4
            /*yield*/
            , approveByTaskId(data.taskId, {
              action: "complete",
              nextNodeId: sel.nextNodeId,
              users: sel.nextUsers || [],
              message: sel.message,
              variables: this.variables,
              signObject: null,
              elements: elements,
              deptCode: opts.deptCode
            })];

          case 3:
            _a.sent();

            return [3
            /*break*/
            , 8];

          case 4:
            if (!sel.isNextNodeMultiple) return [3
            /*break*/
            , 6];
            return [4
            /*yield*/
            , approveByTaskId(data.taskId, {
              action: "complete",
              assignee: "",
              nextNodeId: sel.nextNodeId,
              assignments: sel.nextUsers || [],
              message: sel.message,
              variables: this.variables,
              signObject: null,
              elements: elements,
              deptCode: opts.deptCode
            })];

          case 5:
            _a.sent();

            return [3
            /*break*/
            , 8];

          case 6:
            // 非会签
            return [4
            /*yield*/
            , approveByTaskId(data.taskId, {
              action: "complete",
              nextNodeId: sel.nextNodeId,
              assignment: sel.nextUsers ? sel.nextUsers[0] : null,
              message: sel.message,
              variables: this.variables,
              signObject: null,
              elements: elements,
              deptCode: opts.deptCode
            })];

          case 7:
            _a.sent();

            _a.label = 8;

          case 8:
            ret.extra = {
              procInstId: data.id,
              businessKey: opts.businessKey || '',
              procDefId: data.processDefinitionId,
              nodeId: data.nodeId
            };
            return [3
            /*break*/
            , 11];

          case 9:
            e_1 = _a.sent();
            ret = getErrorInfo(e_1);
            this.saveBusying = false;
            return [3
            /*break*/
            , 11];

          case 10:
            this.closeLoading();
            return [7
            /*endfinally*/
            ];

          case 11:
            return [2
            /*return*/
            , ret];
        }
      });
    });
  };

  WorkflowApprove.prototype.onComplete = function (e) {
    return __awaiter(this, void 0, void 0, function () {
      var ret, elements, id, deptCode, extra, approve, variables, bizTitle, bizUrl, users, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ret = {
              error: 0,
              message: ''
            };
            _a.label = 1;

          case 1:
            _a.trys.push([1, 11, 12, 13]);

            elements = this.checkApproveElements();
            id = this.options.taskId ? this.options.taskId : this.options.businessKey;
            deptCode = this.options.deptCode || '';
            extra = {};

            if (!this.options.taskId) {
              // 如果按businessKey来审核发，则需要有menuId
              extra = {
                menuId: this.options.menuId || ''
              };
            }

            if (!id) {
              if (config.debug) {
                Toast('taskId|businessKey not found');
              }

              throw {
                error: 1,
                message: 'taskId|businessKey not found'
              };
            }

            approve = this.options.taskId ? approveByTaskId : approveByBusinessKey;
            variables = this.variables.map(function (v) {
              return __assign(__assign({}, v), {
                name: v.name.replace('$_', 'fvar_')
              });
            });
            this.saveBusying = true;
            this.openLoading();
            bizTitle = '';
            bizUrl = '';

            if (this.options.bizExtra) {
              bizTitle = this.options.bizExtra.bizTitle || '';
              bizUrl = this.options.bizExtra.bizUrl || '';
            }

            if (!(this.node.isCheckUsers == "1")) return [3
            /*break*/
            , 8];
            users = [];

            if (this.selectedUsers && this.selectedUsers.length > 0) {
              users = this.selectedUsers.map(function (u) {
                return {
                  assignee: u.userCode,
                  assigneeName: u.userName,
                  assigneeType: 'user'
                };
              });
            }

            if (!this.nextIsPreemptMode) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , approve(id, __assign({
              action: "complete",
              nextNodeId: this.selectedNodeId,
              users: users,
              message: this.approveText,
              variables: variables,
              signObject: null,
              elements: elements,
              deptCode: deptCode,
              bizTitle: bizTitle,
              bizUrl: bizUrl
            }, extra))];

          case 2:
            _a.sent();

            return [3
            /*break*/
            , 7];

          case 3:
            if (!this.nextNodeIsMultiple) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , approve(id, __assign({
              action: "complete",
              assignee: "",
              nextNodeId: this.selectedNodeId,
              assignments: users || [],
              message: this.approveText,
              variables: variables,
              signObject: null,
              elements: elements,
              deptCode: deptCode,
              bizTitle: bizTitle,
              bizUrl: bizUrl
            }, extra))];

          case 4:
            _a.sent();

            return [3
            /*break*/
            , 7];

          case 5:
            // 非会签
            return [4
            /*yield*/
            , approve(id, __assign({
              action: "complete",
              nextNodeId: this.selectedNodeId,
              assignment: users ? users[0] : null,
              message: this.approveText,
              variables: variables,
              signObject: null,
              elements: elements,
              deptCode: deptCode,
              bizTitle: bizTitle,
              bizUrl: bizUrl
            }, extra))];

          case 6:
            _a.sent();

            _a.label = 7;

          case 7:
            return [3
            /*break*/
            , 10];

          case 8:
            // 不选人直接送审
            return [4
            /*yield*/
            , approve(id, __assign({
              action: "complete",
              message: this.approveText,
              variables: variables,
              deptCode: deptCode,
              signObject: null,
              elements: elements,
              bizTitle: bizTitle,
              bizUrl: bizUrl
            }, extra))];

          case 9:
            // 不选人直接送审
            _a.sent();

            _a.label = 10;

          case 10:
            return [3
            /*break*/
            , 13];

          case 11:
            e_2 = _a.sent();
            ret = getErrorInfo(e_2);
            return [3
            /*break*/
            , 13];

          case 12:
            this.saveBusying = false;
            this.closeLoading();
            return [7
            /*endfinally*/
            ];

          case 13:
            return [2
            /*return*/
            , ret];
        }
      });
    });
  };

  WorkflowApprove.prototype.onCancel = function (e) {
    return false;
  };

  Object.defineProperty(WorkflowApprove.prototype, "locale", {
    get: function get() {
      return {
        emptyText: '当前没有数据'
      };
    },
    enumerable: true,
    configurable: true
  });

  WorkflowApprove.prototype.openLoading = function () {
    Indicator.open({
      text: '正在处理...',
      spinnerType: 'fading-circle'
    });
  };

  WorkflowApprove.prototype.closeLoading = function () {
    Indicator.close();
  };
  /**
   * 检测审批要点
   */


  WorkflowApprove.prototype.checkApproveElements = function () {
    var ret = [];

    if (this.elements && this.elements.length > 0) {
      console.log('elements', this.elements);
      this.elements.forEach(function (e) {
        if (!e.selected && e.isRequired === "1") {
          throw {
            error: 1,
            message: "\"" + (e.elementName.length > 10 ? e.elementName.substr(0, 10) + "..." : e.elementName) + "\"\u4E3A\u5FC5\u9009\u8981\u70B9"
          };
        }

        ret.push({
          id: e.id,
          name: e.elementName,
          selected: e.selected ? "1" : "0"
        });
      });
    }

    return ret;
  };

  WorkflowApprove.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.visible) {
          this.reinit(this.options);
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowApprove.prototype.destroyed = function () {// 退出签章连接
    //utils.signExit(this.options.signType || '');
  };
  /**
   * 再次修改options后打开组件
   * @param options
   */


  WorkflowApprove.prototype.reinit = function (options) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            this.options = options;

            if (!checkTriple("workflow-approve", ['businessKey', 'taskId', 'procDefId', 'nodeId'], ['businessKey', 'menuId'], ['businessKey', 'procDefId', 'nodeId'], // 启动流程时选择模式，点OK后调用onSelect
            options)) {
              if (options.onComplete) {
                options.onComplete({
                  error: 1,
                  message: '无效的options参数'
                });
              }

              return [2
              /*return*/
              ];
            }

            this.options.mode = options.mode || 'approve'; // 确保deptCode不为undeinfed

            this.options.deptCode = options.deptCode || ''; // 发起人

            this.options.creatorCode = options.creatorCode || '';
            if (!(options.mode == 'approve')) return [3
            /*break*/
            , 2];
            _a = this;
            return [4
            /*yield*/
            , getConfig(options)];

          case 1:
            _a.config = _c.sent();

            if (!this.config) {
              error("\u67E5\u8BE2\u5DE5\u4F5C\u6D41\u4FE1\u606F\u5931\u8D25");

              if (options.onComplete) {
                options.onComplete({
                  error: 1,
                  message: '查询工作流信息失败'
                });
              }

              return [2
              /*return*/
              ];
            }

            return [3
            /*break*/
            , 3];

          case 2:
            this.config = {
              procDefId: options.procDefId,
              nodeId: options.nodeId,
              businessKey: options.businessKey
            };
            _c.label = 3;

          case 3:
            console.log('config', options, this.config); // 获取节点属性

            _b = this;
            return [4
            /*yield*/
            , getNodeInfo({
              procDefId: this.config.procDefId,
              nodeId: this.config.nodeId
            })];

          case 4:
            // 获取节点属性
            _b.node = _c.sent(); // 默认显示审批意见

            this.approveFlow = ApproveFlows.Messge;
            this.allowedFlows.push(ApproveFlows.Messge); // 处理审批要点

            if (this.node && this.node.elements && this.node.elements.length > 0) {
              this.elements = this.node.elements;
              this.approveFlow = ApproveFlows.ApproveElements;
              this.allowedFlows.push(ApproveFlows.ApproveElements);
            } // 只有在当前节点指派人的情况才查nextSteps


            if (this.node && this.node.isCheckUsers == "1") {
              this.isAllowedUsers = true;
              this.allowedFlows.push(ApproveFlows.Users);
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * 选择批语
   */


  WorkflowApprove.prototype.handleWordChange = function (v) {
    console.log("selected", v);
    this.approveText = v;
  };
  /**
   * 删除选择用户
   */


  WorkflowApprove.prototype.onRemoveUser = function (user) {
    console.log("onRemoveUser", user);
    var index = this.selectedUsers.findIndex(function (u) {
      return u.userCode === user.userCode;
    });

    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    }
  };

  WorkflowApprove.prototype.selectRemarkItem = function (remark) {
    console.log("selectRemarkItem", remark);
    this.approveText = remark.text;
  };

  WorkflowApprove.prototype.ok = function (e) {
    if (e === void 0) {
      e = null;
    }

    if (this.options.mode == 'select') {
      this.onSelected(e);
    } else {
      this.onComplete(e);
    }
  };

  WorkflowApprove.prototype.move = function (flow) {
    this.isBackFromConfirm = true;
    this.approveFlow = flow;
  };

  WorkflowApprove.prototype.back = function () {
    if (this.isBackFromConfirm) {
      this.approveFlow = ApproveFlows.Confirm;
      this.isBackFromConfirm = false;
      return;
    }

    this.approveFlow = this.approveFlow - 1;

    while (this.approveFlow > 0 && !this.allowedFlows.includes(this.approveFlow)) {
      this.approveFlow = this.approveFlow - 1;
    }
  };

  WorkflowApprove.prototype.next = function () {
    try {
      if (this.approveFlow == ApproveFlows.ApproveElements) {
        this.checkApproveElements();
      }

      if (this.approveFlow == ApproveFlows.Messge && !this.isAllowedUsers) {
        this.ok();
        return;
      }

      if (this.approveFlow == ApproveFlows.Users) {
        this.ok();
        return;
      }

      this.approveFlow = this.approveFlow + 1;

      while (this.approveFlow < ApproveFlows.Confirm && !this.allowedFlows.includes(this.approveFlow)) {
        this.approveFlow = this.approveFlow + 1;
      } // 当页面是从确认页返回的则，下一步后，直接到确认页
      // if (this.isBackFromConfirm) {
      //   this.approveFlow = ApproveFlows.Confirm;
      // } else {
      // }


      console.log('flow', this.approveFlow);
    } catch (e) {
      console.log('next', e.message);
      Toast("" + e.message);
    }
  };

  WorkflowApprove.prototype.render = function (h) {
    var _this = this;

    var flow = this.approveFlow;
    return h("div", {
      "class": "workflow workflow-approve"
    }, [h("w-elements", {
      attrs: {
        visible: this.approveFlow == ApproveFlows.ApproveElements,
        okText: this.isBackFromConfirm ? '确定' : '下一步',
        elements: this.elements
      },
      on: {
        "back": this.back,
        "ok": this.next
      }
    }), h("w-message", {
      attrs: {
        visible: this.approveFlow == ApproveFlows.Messge,
        okText: !this.isAllowedUsers ? '确定' : '下一步',
        appCode: this.node.appCode
      },
      on: {
        "back": this.back,
        "ok": function ok(text) {
          _this.approveText = text;

          _this.next();
        }
      }
    }), this.approveFlow == ApproveFlows.Users && h("w-selectusers", {
      attrs: {
        visible: this.approveFlow == ApproveFlows.Users,
        okText: '确定',
        extra: {
          businessKey: this.config.businessKey,
          procDefId: this.config.procDefId,
          appCode: this.node.appCode,
          rgCode: this.node.rgCode,
          unitCode: this.node.unitCode,
          nodeId: this.node.nodeId,
          creatorCode: this.options.creatorCode,
          variables: this.variables.map(function (v) {
            return __assign(__assign({}, v), {
              name: v.name.replace('$_', 'fvar_')
            });
          })
        }
      },
      on: {
        "back": this.back,
        "ok": function ok(ret) {
          _this.selectedUsers = ret.users;
          _this.selectedNodeId = ret.selectedNodeId;
          _this.nextIsPreemptMode = ret.nextIsPreemptMode;
          _this.nextNodeIsMultiple = ret.nextNodeIsMultiple;

          _this.next();
        }
      }
    }), h("w-confirm", {
      attrs: {
        visible: this.approveFlow == ApproveFlows.Confirm,
        flows: this.allowedFlows,
        elements: this.elements,
        approveText: this.approveText,
        users: this.selectedUsers
      },
      on: {
        "back": this.back,
        "move": this.move,
        "ok": this.ok
      }
    })]);
  };

  __decorate([Prop({
    default: ''
  })], WorkflowApprove.prototype, "title", void 0);

  __decorate([Prop({
    default: function _default() {
      return [];
    }
  })], WorkflowApprove.prototype, "variables", void 0);

  __decorate([Prop({
    default: false
  })], WorkflowApprove.prototype, "visible", void 0);

  __decorate([Prop()], WorkflowApprove.prototype, "options", void 0);

  __decorate([Watch('visible')], WorkflowApprove.prototype, "onVisibleChanged", null);

  __decorate([Watch('options')], WorkflowApprove.prototype, "onOptionsChanged", null);

  __decorate([Emit("selected")], WorkflowApprove.prototype, "onSelected", null);

  __decorate([Emit("complete")], WorkflowApprove.prototype, "onComplete", null);

  __decorate([Emit("cancel")], WorkflowApprove.prototype, "onCancel", null);

  WorkflowApprove = __decorate([Component({
    components: {
      "aw-empty": Empty,
      "w-checklist": Checklist,
      "w-list": List,
      "w-selectusers": SelectUsers,
      "w-message": Message,
      "w-elements": Elements,
      "w-confirm": Confirm
    }
  })], WorkflowApprove);
  return WorkflowApprove;
}(Vue);

var REMARK_TYPE$1 = 'back';
var NodeType;

(function (NodeType) {
  NodeType["Prev"] = "back_prev";
  NodeType["First"] = "back_first";
  NodeType["Any"] = "back_any";
})(NodeType || (NodeType = {}));

var WorkflowReject =
/** @class */
function (_super) {
  __extends(WorkflowReject, _super);

  function WorkflowReject() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.isRemarkPopup = false;
    _this.isNodeListPopup = false;
    _this.isNodeTypePopup = false;
    _this.saveAsRemark = false; // 批语列表

    _this.remarks = []; // 节点列表

    _this.nodes = []; // 节点类型列表

    _this.nodeTypes = [{
      label: '上一节点',
      value: NodeType.Prev
    }, {
      label: '第一节点',
      value: NodeType.First
    }, {
      label: '任一节点',
      value: NodeType.Any
    }];
    _this.text = '';
    _this.nodeType = NodeType.Prev;
    _this.backNodeName = '上一节点';
    _this.selectedNodeId = '';
    _this.buttonBusying = false; // 加载node列表

    _this.loadingNodeList = false;
    return _this;
  }

  WorkflowReject.prototype.onVisibleChanged = function (val, oldVal) {
    if (val) {
      this.reload();
    }
  };

  WorkflowReject.prototype.onOptionsChanged = function (val, oldVal) {
    if (this.visible && val) {
      this.reload();
    }
  };

  WorkflowReject.prototype.onOk = function (e) {
    return __awaiter(this, void 0, void 0, function () {
      var ret, selectedNodeId, backType, node, bizTitle, bizUrl, variables, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ret = {
              error: 0,
              message: ''
            };
            _a.label = 1;

          case 1:
            _a.trys.push([1, 6, 7, 8]);

            this.buttonBusying = true;
            selectedNodeId = '';

            if (!this.options.procInstId) {
              throw {
                error: 1,
                message: 'options找不到procInstId'
              };
            }

            if (!this.options.taskId) {
              throw {
                error: 1,
                message: 'options找不到taskId'
              };
            }

            backType = this.nodeType;
            if (!(this.nodeType == NodeType.Prev || // 上一切点
            this.nodeType == NodeType.First || // 第一节点
            this.nodeType === NodeType.Any && this.node.isReject === "0")) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , getBackNodeInfo({
              backType: backType,
              procDefId: this.options.procDefId,
              procInstId: this.options.procInstId,
              nodeId: this.options.nodeId
            })];

          case 2:
            node = _a.sent();
            selectedNodeId = node.nodeId;
            return [3
            /*break*/
            , 4];

          case 3:
            selectedNodeId = this.backNode.nodeId;
            _a.label = 4;

          case 4:
            bizTitle = '';
            bizUrl = '';

            if (this.options.bizExtra) {
              bizTitle = this.options.bizExtra.bizTitle || '';
              bizUrl = this.options.bizExtra.bizUrl || '';
            }

            variables = (this.options.variables || []).map(function (v) {
              return __assign(__assign({}, v), {
                name: v.name.replace('$_', 'fvar_')
              });
            });
            console.log('getBackNodeInfo', selectedNodeId);
            return [4
            /*yield*/
            , back(this.options.taskId, {
              // 驳回类型 back_first, back_prev, back_any
              backType: backType,
              variables: variables,
              bizUrl: bizUrl,
              bizTitle: bizTitle,
              // 要撤销的节点的id
              currentActivityIds: [this.node.nodeId],
              // 要退回到的节点id
              targetActivityIds: [selectedNodeId],
              message: this.text
            })];

          case 5:
            _a.sent();

            return [3
            /*break*/
            , 8];

          case 6:
            e_1 = _a.sent();
            ret = getErrorInfo(e_1);
            return [3
            /*break*/
            , 8];

          case 7:
            this.buttonBusying = false;
            return [7
            /*endfinally*/
            ];

          case 8:
            return [2
            /*return*/
            , ret];
        }
      });
    });
  };

  WorkflowReject.prototype.back = function (e) {
    return false;
  };

  WorkflowReject.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.visible) {
          this.reload();
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowReject.prototype.reload = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!check("workflow-back", ['procInstId', 'procDefId', 'nodeId', 'taskId'], this.options)) {
              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: '无效的options参数'
                });
              }

              return [2
              /*return*/
              ];
            } // 获取节点属性


            _a = this;
            return [4
            /*yield*/
            , getNodeInfo({
              procDefId: this.options.procDefId,
              nodeId: this.options.nodeId
            })];

          case 1:
            // 获取节点属性
            _a.node = _b.sent();
            console.log("node", this.node); // 如果流程模型配置了返回类型，则isReject == "0"
            // 则直接读出来，不在当前页选择返回到哪个节点

            if (this.node.isReject === "0") {
              this.nodeType = this.node.backType;
            } // 设置驳回默认文本


            this.text = config.getData('back.text') || ''; // 获取批语列表

            this.getRemarkList();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowReject.prototype.loadNodeList = function () {
    return __awaiter(this, void 0, void 0, function () {
      var data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.nodeType == NodeType.Any)) return [3
            /*break*/
            , 5];
            _a.label = 1;

          case 1:
            _a.trys.push([1,, 3, 4]);

            this.loadingNodeList = true;
            return [4
            /*yield*/
            , getAvaliableBackNodeList({
              procInstId: this.options.procInstId,
              nodeId: this.options.nodeId
            })];

          case 2:
            data = _a.sent();
            this.nodes = data || [];
            return [3
            /*break*/
            , 4];

          case 3:
            this.loadingNodeList = false;
            return [7
            /*endfinally*/
            ];

          case 4:
            return [3
            /*break*/
            , 6];

          case 5:
            this.nodes = [];
            _a.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowReject.prototype.selectNode = function (node) {
    console.log('selectNode', node);
    this.selectedNodeId = node.nodeId;
    this.backNode = node;
  };
  /**
   * 输入批语
   */


  WorkflowReject.prototype.onInputChange = function (e) {
    console.log("onInputChange", e); // this.text = e.target.value;

    this.text = e;
  };

  WorkflowReject.prototype.render = function (h) {
    var _this = this;

    return h("div", {
      "class": "workflow workflow-revoke"
    }, [h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.visible
      }
    }, [h("mt-header", {
      attrs: {
        title: "审批意见"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": this.back
      }
    }, ["\u8FD4\u56DE"])]), h("mt-cell", {
      attrs: {
        title: "退回节点",
        value: this.backNodeName,
        isLink: true
      },
      nativeOn: {
        "click": function click() {
          _this.isNodeTypePopup = true;
        }
      }
    }), h("w-sep"), h("mt-cell", {
      attrs: {
        title: "常用批语",
        value: "",
        isLink: true
      },
      nativeOn: {
        "click": function click() {
          _this.isRemarkPopup = true;

          _this.getRemarkList();
        }
      }
    }), h("mt-field", {
      attrs: {
        placeholder: "请填写审批意见",
        type: "textarea",
        rows: "4",
        value: this.text
      },
      on: {
        "input": this.onInputChange
      }
    }), h("mt-cell", {
      attrs: {
        title: "存为常用批语"
      }
    }, [h("mt-switch", {
      attrs: {
        value: this.saveAsRemark
      },
      on: {
        "input": function input(v) {
          return _this.saveAsRemark = v;
        }
      }
    })]), h("div", {
      "class": "workflow-page-actions"
    }, [h("mt-button", {
      attrs: {
        type: "primary"
      },
      on: {
        "click": function click(e) {
          return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!this.saveAsRemark) return [3
                  /*break*/
                  , 5];
                  _a.label = 1;

                case 1:
                  _a.trys.push([1, 4,, 5]);

                  return [4
                  /*yield*/
                  , isRemarkDup({
                    appCode: this.node.appCode,
                    comLang: this.text,
                    type: REMARK_TYPE$1
                  })];

                case 2:
                  _a.sent();

                  return [4
                  /*yield*/
                  , saveRemark({
                    appCode: this.node.appCode,
                    text: this.text,
                    type: REMARK_TYPE$1
                  })];

                case 3:
                  _a.sent();

                  return [3
                  /*break*/
                  , 5];

                case 4:
                  e_2 = _a.sent();
                  Toast('批语已存在, 不能保存重复批语');
                  return [2
                  /*return*/
                  ];

                case 5:
                  this.onOk(e);
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        }
      }
    }, ["\u786E\u5B9A"])])]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isRemarkPopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "常用批语"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isRemarkPopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          _this.isRemarkPopup = false;
          _this.text = item.label;
        }
      },
      attrs: {
        dataSource: this.remarks.map(function (remark) {
          return {
            value: remark.id,
            label: remark.text
          };
        })
      }
    })]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isNodeTypePopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "选择节点"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isNodeTypePopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          //this.text = item.label;
          if (v === NodeType.Any) {
            _this.isNodeListPopup = true;

            _this.loadNodeList();
          } else {
            _this.nodeType = v;
            _this.backNodeName = item.label;
            _this.isNodeTypePopup = false;
          }
        }
      },
      attrs: {
        dataSource: this.nodeTypes
      }
    })]), h("mt-popup", {
      "class": "workflow-page",
      attrs: {
        value: this.isNodeListPopup
      }
    }, [h("mt-header", {
      attrs: {
        title: "选择节点"
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": function click() {
          return _this.isNodeListPopup = false;
        }
      }
    }, ["\u8FD4\u56DE"])]), h("w-list", {
      on: {
        "change": function change(v, item) {
          _this.isNodeListPopup = false;
          _this.isNodeTypePopup = false;
          _this.nodeType = NodeType.Any;
          _this.selectedNodeId = v;
          _this.backNode = item;
          _this.backNodeName = item.label;
        }
      },
      attrs: {
        dataSource: this.nodes.map(function (node) {
          return {
            label: node.nodeName,
            value: node.nodeId,
            nodeId: node.nodeId
          };
        })
      }
    })])]) // <aw-modal
    //   centered
    //   title={this.options.title || '驳回'}
    //   class="workflow workflow-revoke"
    //   onCancel={this.onCancel}
    //   onOk={(e: any) => this.onOk(e)}
    //   visible={this.visible}
    //   footer={[
    //     <aw-button key="back" onClick={this.onCancel}>
    //       取消
    //     </aw-button>,
    //     <aw-button key="submit" loading={this.buttonBusying} type="primary" onClick={this.onOk}>
    //       确定
    //     </aw-button>
    //   ]}
    // >
    //   {
    //     (this.node && this.node.isReject == '1') && <div>
    //       <aw-row class="workflow-line bottom-space">
    //         <span class="title">选择节点</span>
    //         <span>
    //           <aw-radio-group onChange={this.onNodeTypeChanged} value={this.nodeType}>
    //             <aw-radio value={NodeType.Prev}>上一节点</aw-radio>
    //             <aw-radio value={NodeType.First}>第一节点</aw-radio>
    //             <aw-radio value={NodeType.Any}>任一节点</aw-radio>
    //           </aw-radio-group>
    //         </span>
    //       </aw-row>
    //       <aw-row>
    //         <aw-col>
    //           <aw-list
    //             class="workflow-revoke-list"
    //             bordered={true}
    //             loading={this.loadingNodeList}
    //             locale={{ emptyText: <aw-empty height={100} /> }}
    //             dataSource={this.nodes}
    //             renderItem={(item: any) => <aw-list-item class={`workflow-revoke-item ${item.nodeId == this.selectedNodeId ? 'active' : ''}`} onClick={() => this.selectNode(item)}>{item.nodeName}</aw-list-item>}
    //           >
    //           </aw-list>
    //         </aw-col>
    //       </aw-row>
    //     </div>
    //   }
    //   <aw-row class="workflow-line">
    //     <aw-col span={3} class="title">常用批语: </aw-col>
    //     <aw-col span={21}>
    //       <aw-dropdown class="workflow-remark-button">
    //         <aw-menu slot="overlay" class="workflow-remark">
    //           {
    //             this.remarks && this.remarks.length > 0 ?
    //               this.remarks.map((remark: any) =>
    //                 <aw-menu-item key={remark.id} >
    //                   <span class="workflow-remark-text" onClick={(e: any) => {
    //                     this.selectRemarkItem(remark)
    //                   }} >{utils.limitShowRemark(remark.text)}</span>
    //                   {
    //                     remark.type == 'private' &&
    //                     <span class="workflow-remark-actions">
    //                       <aw-icon onClick={(e: any) => {
    //                         this.starRemarkItem(remark);
    //                       }} type="star" theme={remark.flag && "filled"} />
    //                       <aw-icon onClick={() => this.deleteRemarkItem(remark)} type="delete" />
    //                     </span>
    //                   }
    //                 </aw-menu-item>) : <aw-menu-item>当前还没有批语</aw-menu-item>
    //           }
    //         </aw-menu>
    //         <aw-button style="margin-left: 8px">
    //           请选择常用批语 <aw-icon type="down" />
    //         </aw-button>
    //       </aw-dropdown>
    //     </aw-col>
    //   </aw-row>
    //   <aw-row class="workflow-line">
    //     <aw-col>
    //       <aw-textarea
    //         rows={2}
    //         maxLength={50}
    //         value={this.text}
    //         placeholder="请输入批语"
    //         onChange={this.onInputChange}
    //       />
    //     </aw-col>
    //   </aw-row>
    //   <aw-row class="workflow-line">
    //     <aw-col>
    //       <aw-button type="primary" ghost disabled={!this.text} onClick={async () => {
    //         try {
    //           await service.isRemarkDup({
    //             appCode: this.node.appCode,
    //             comLang: this.text,
    //             type: REMARK_TYPE
    //           });
    //         } catch (e) {
    //           message.error("批语已存在, 不能保存重复批语")
    //           return;
    //         }
    //         await service.saveRemark({
    //           appCode: this.node.appCode,
    //           text: this.text,
    //           type: REMARK_TYPE
    //         });
    //         message.success('批语保存成功');
    //         this.getRemarkList();
    //       }} >
    //         另存为新批语
    //       </aw-button>
    //     </aw-col>
    //   </aw-row>
    // </aw-modal>
    ;
  }; // 获取批语列表


  WorkflowReject.prototype.getRemarkList = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this;
            return [4
            /*yield*/
            , getRemarkList({
              appCode: config.appCode,
              //userCode: config.userCode,
              size: 10,
              type: REMARK_TYPE$1
            })];

          case 1:
            _a.remarks = _b.sent();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  __decorate([Prop({
    default: false
  })], WorkflowReject.prototype, "visible", void 0);

  __decorate([Prop()], WorkflowReject.prototype, "options", void 0);

  __decorate([Watch('visible')], WorkflowReject.prototype, "onVisibleChanged", null);

  __decorate([Watch('options')], WorkflowReject.prototype, "onOptionsChanged", null);

  __decorate([Emit("complete")], WorkflowReject.prototype, "onOk", null);

  __decorate([Emit("cancel")], WorkflowReject.prototype, "back", null);

  WorkflowReject = __decorate([Component({
    components: {
      "aw-empty": Empty,
      "w-list": List,
      "w-sep": Sep
    }
  })], WorkflowReject);
  return WorkflowReject;
}(Vue);

var Step =
/** @class */
function (_super) {
  __extends(Step, _super);

  function Step() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Step.prototype.render = function (h) {
    var title = this.title || '';
    var description = this.description || ''; // console.log(description);     

    return h("div", {
      "class": "workflow-step-" + this.status
    }, [h("div", {
      "class": "workflow-item-tail"
    }), h("div", {
      "class": "workflow-item-icon"
    }, [this.icon]), h("div", {
      "class": "workflow-item-content"
    }, [h("div", {
      "class": "workflow-item-title"
    }, [title]), description && h("div", {
      "class": "workflow-item-description"
    }, [description])])]);
  };

  __decorate([Prop()], Step.prototype, "title", void 0);

  __decorate([Prop()], Step.prototype, "description", void 0);

  __decorate([Prop()], Step.prototype, "status", void 0);

  __decorate([Prop()], Step.prototype, "icon", void 0);

  Step = __decorate([Component], Step);
  return Step;
}(Vue);

var Steps =
/** @class */
function (_super) {
  __extends(Steps, _super);

  function Steps() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Steps.prototype.render = function (h) {
    return h("div", {
      "class": "workflow-steps"
    }, [this.$slots.default]);
  };

  Steps = __decorate([Component({
    components: {
      "w-step": Step
    }
  })], Steps);
  return Steps;
}(Vue);

// 最大显示的用户数

var MAX_USER_COUNT = 5;
var ServerTaskStateMapping = {
  // 已提交
  "001": TaskState.Submitted,
  // 审批中（待办任务-未读未办）
  "002": TaskState.Process,
  // 审批中（待办任务-已读未办）
  "003": TaskState.Process,
  // 已认领（待办任务-已读未办--抢占特有的状态）
  "004": TaskState.Process,
  // 已完成
  "005": TaskState.Approved,
  // 被驳回（被退回）
  "006": TaskState.Process,
  // 已驳回（已退回）
  "007": TaskState.Back,
  // 被撤销
  "008": TaskState.Process,
  // 委托 (当前不支持)
  "009": TaskState.NotStart,
  // 已撤销
  "010": TaskState.Cancel,
  // 已送审
  "011": TaskState.Approved,
  // 已废弃
  "014": TaskState.Approved
};
var defaultLocale = {
  /**
   * 已提交
   */
  submitted: '已提交',

  /**
   * 待提交
   */
  submitting: '待提交',

  /**
   * 已审核
   */
  approved: '已审核',

  /**
   * 审核中
   */
  process: '审核中',

  /**
   * 已撤销
   */
  cancel: '已撤销',

  /**
   * 已驳回
   */
  back: '已驳回',

  /**
   * 时间显示格式
   */
  dateTimeFormat: 'MM-DD HH:mm'
};
/**
 * 全流程跟踪图
 * 包括未开始节点
 */

var WorkflowTraceFull =
/** @class */
function (_super) {
  __extends(WorkflowTraceFull, _super);

  function WorkflowTraceFull() {
    var _this = _super !== null && _super.apply(this, arguments) || this; // 是否显示用户信息


    _this.isUserInfoPopup = false; // 审批要点

    _this.isElementsPopup = false;
    _this.elementsInfo = [];
    _this.steps = [];
    _this.userIds = [];
    _this.users = new Map();
    _this.userInfo = {
      userName: ''
    };
    _this.flowchartVisible = false;
    _this.elementColumns = [{
      title: "",
      dataIndex: "isRequired",
      key: "isRequired",
      width: 40,
      align: 'center',
      customRender: function customRender(text, record) {
        return _this.renderElement(record);
      }
    }, {
      title: "审批要点名称",
      dataIndex: "elementName",
      key: "elementName",
      width: 240
    }];
    return _this;
  }

  WorkflowTraceFull.prototype.onOptionsChanged = function (val, oldVal) {
    if (val) {
      this.reload();
    }
  };

  WorkflowTraceFull.prototype.reload = function () {
    return __awaiter(this, void 0, void 0, function () {
      var adminConfig, variables, _a, data, _b, users, elements;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!checkOr("workflow-trace-full", ['procInstId'], ['businessKey'], this.options)) {
              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: '无效的options参数'
                });
              }

              return [2
              /*return*/
              ];
            }

            return [4
            /*yield*/
            , getAdminConfig()];

          case 1:
            adminConfig = _c.sent();

            if (adminConfig) {
              this.adminConfig = adminConfig;
            }

            variables = this.options.variables || [];

            if (variables.length == 0) {
              error("workflow-trace-full variables\u4E0D\u80FD\u4E3A\u7A7A", true);

              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: 'variables不能为空'
                });
              }

              return [2
              /*return*/
              , true];
            } // console.log('config', this.options);


            _a = this;
            return [4
            /*yield*/
            , getConfig(this.options, {
              hiddenCancelNodes: false
            })];

          case 2:
            // console.log('config', this.options);
            _a.config = _c.sent();

            if (!this.config) {
              error("\u67E5\u8BE2\u5DE5\u4F5C\u6D41\u4FE1\u606F\u5931\u8D25");

              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: '查询工作流信息失败'
                });
              }

              return [2
              /*return*/
              , true];
            }

            return [4
            /*yield*/
            , getWorkflowTraceFullData({
              procInstId: this.config.procInstId,
              variables: this.options.variables || []
            })];

          case 3:
            data = _c.sent();
            if (!data) return [3
            /*break*/
            , 6];
            _b = this;
            return [4
            /*yield*/
            , this.getSteps(data || [])];

          case 4:
            _b.steps = _c.sent();
            console.log('steps', this.steps);
            return [4
            /*yield*/
            , this.loadUserNames()];

          case 5:
            users = _c.sent().users;
            this.users = users; // 获取签章数据

            this.loadSignData(); // 获取审批要点

            this.loadApproveElements();
            elements = document.querySelector('.task-process');

            if (elements) {
              elements.focus();
            }

            _c.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowTraceFull.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.reload();
        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowTraceFull.prototype.showUserInfo = function (userCode) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.userInfo = this.users.get(userCode);
        this.isUserInfoPopup = true;
        console.log('userinfo', this.userInfo);
        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowTraceFull.prototype.showElementsInfo = function (info) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.elementsInfo = info;
        this.isElementsPopup = true;
        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowTraceFull.prototype.renderTaskStateText = function (h, step, t) {
    var _this = this;

    var state = this.getTaskState(step, t.status);
    var ret = h("div");
    console.log(state);

    var locale = __assign(__assign({}, defaultLocale), this.locale);

    if (state == TaskState.Submitted) {
      ret = h("div", {
        "class": "task-submit"
      }, [locale.submitted]);
    } else if (state == TaskState.Submitting) {
      ret = h("div", {
        "class": "task-process",
        attrs: {
          tabindex: "-1"
        }
      }, [locale.submitting]);
    } else if (state == TaskState.Approved) {
      ret = h("div", {
        "class": "task-approved"
      }, [locale.approved]);
    } else if (state == TaskState.Process) {
      ret = h("div", {
        "class": "task-process",
        attrs: {
          tabindex: "-1"
        }
      }, [locale.process]);
    } else if (state == TaskState.NotStart) {
      ret = h("div", {
        "class": "task-none"
      }, [locale.none]);
    } else if (state == TaskState.Back) {
      ret = h("div", {
        "class": "task-back"
      }, [locale.back]);
    } else if (state == TaskState.Backed) {
      ret = h("div", {
        "class": "task-process"
      }, [locale.process]);
    } else if (state == TaskState.Cancel) {
      ret = h("div", {
        "class": "task-cancel"
      }, [locale.cancel]);
    } // 将状态绑定审批要点


    if (t.elements && t.elements.length > 0) {
      return h("span", {
        style: "display:inline-block"
      }, [h("span", {
        style: "display:inline-block"
      }, [ret]), " ", h("a", {
        "class": "workflow-link",
        attrs: {
          href: "javascript:void(0)"
        },
        on: {
          "click": function click() {
            return _this.showElementsInfo(t.elements);
          }
        }
      }, [h("w-icon", {
        style: "margin-left: 5px",
        "class": "list"
      })])]);
    }

    return ret;
  };

  WorkflowTraceFull.prototype.renderTasks = function (h, step) {
    var _this = this;

    if (!step.tasks) return h("div");
    var tasks = step.tasks.filter(function (t) {
      return !t.roleId && !t.user;
    });
    var taskCount = tasks.length;
    var maxUserCount = this.options.maxUserCount || MAX_USER_COUNT;

    if (!step.more) {
      tasks = tasks.slice(0, maxUserCount);
    }

    var locale = __assign(__assign({}, defaultLocale), this.locale);

    var ret = tasks.map(function (t) {
      return h("div", [h("div", {
        "class": "workflow-user"
      }, [h("span", {
        "class": "workflow-username",
        attrs: {
          title: t.userName || ''
        },
        on: {
          "click": function click() {
            return _this.showUserInfo(t.userCode);
          }
        }
      }, [t.roleName || t.roleId ? (t.roleName || t.roleId) + "(\u89D2\u8272)" : t.userName || t.userCode || '']), h("span", {
        "class": "workflow-taskstate"
      }, [_this.renderTaskStateText(h, step, t)])]), t.signImage && h("div", {
        "class": "workflow-sign-image"
      }, [h("img", {
        attrs: {
          src: t.signImage
        }
      })]), t.status !== TaskState.NotStart && t.message ? h("div", {
        "class": "workflow-message"
      }, [h("div", [_this.options.isMessagePrefix && h("span", {
        "class": "workflow-messae-pre"
      }, ["\u610F\u89C1:"]), "" + t.message]), h("div", {
        "class": "workflow-time"
      }, [t.endTime && moment(t.endTime, 'YYYY-MM-DD HH:mm:ss.S').format(locale.dateTimeFormat) || ''])]) : h("div", {
        "class": "workflow-time"
      }, [t.endTime && moment(t.endTime, 'YYYY-MM-DD HH:mm:ss.S').format(locale.dateTimeFormat) || ''])]);
    });
    return h("div", {
      "class": "workflow-tasks"
    }, [h("div", {
      "class": "workflow-task"
    }, [step.duration > 0 && h("div", {
      "class": "workflow-duration"
    }, [formatMillonSecondsToDays(step.duration)]), ret, taskCount > maxUserCount && h("div", {
      "class": "more",
      on: {
        "click": function click() {
          step.more = !step.more;
        }
      }
    }, [" ", step.more ? h("w-icon", {
      attrs: {
        type: "up"
      }
    }) : h("w-icon", {
      attrs: {
        type: "down"
      }
    })])])]);
  };

  WorkflowTraceFull.prototype.renderState = function (state) {
    if (state == 1) {
      return 'finish';
    } else if (state == 2) {
      return 'process';
    }

    return 'wait';
  };

  WorkflowTraceFull.prototype.renderStepIcon = function (h, type, state) {
    var css = 'workflow-process';

    switch (type) {
      case 'startEvent':
        css = "workflow-start";
        break;

      case 'endEvent':
        css = "workflow-end";
        break;

      case 'userTask':
        if (state == TaskState.Approved) {
          css = "workflow-approved";
        } else if (state == TaskState.Process) {
          css = "workflow-process";
        } else if (state == TaskState.NotStart) {
          css = "workflow-none";
        }

        break;
    }

    switch (state) {
      case TaskState.Approved:
        css += ' enabled';
        break;

      case TaskState.NotStart:
      case TaskState.Process:
        css += ' disabled';
        break;
    }

    return h("w-icon", {
      "class": css
    });
  };

  WorkflowTraceFull.prototype.renderTitle = function (h, step) {
    var title = step.nodeName; // if(title && title.length > 8) {
    //     title = title.substring(0, 8) + '...'
    // }

    return h("div", {
      attrs: {
        title: step.nodeName
      }
    }, [title]);
  };

  WorkflowTraceFull.prototype.render = function (h) {
    var _this = this; // 当前只支持竖样式


    this.direction = 'vertical';
    console.log(this.steps);
    return h("div", {
      "class": "workflow workflow-trace-full " + this.direction + " " + this.size
    }, [h("w-steps", {
      attrs: {
        direction: this.direction,
        size: "small",
        labelPlacement: "horizontal"
      },
      "class": "workflow-steps"
    }, [this.steps.map(function (step) {
      return h("w-step", {
        "class": "workflow-step",
        attrs: {
          icon: _this.renderStepIcon(h, step.actType, Number(step.status)),
          status: _this.renderState(step.status),
          title: _this.renderTitle(h, step),
          description: _this.renderTasks(h, step)
        }
      });
    })]), this.isUserInfoPopup && this.userInfo && h("div", {
      "class": "workflow-bottom-page"
    }, [h("mt-popup", {
      attrs: {
        value: this.isUserInfoPopup,
        position: "bottom"
      },
      on: {
        "input": function input(v) {
          if (v !== _this.isUserInfoPopup) {
            _this.isUserInfoPopup = v;
          }
        }
      }
    }, [h("mt-cell", {
      attrs: {
        title: "姓名:"
      }
    }, [this.userInfo.userName]), h("mt-cell", {
      attrs: {
        title: "手机:",
        value: this.userInfo.phone
      }
    }), h("mt-cell", {
      attrs: {
        title: "E-Mail:"
      }
    }, [this.userInfo.mail]), h("mt-cell", {
      attrs: {
        title: "电话:"
      }
    }, [this.userInfo.tel])])]), this.isElementsPopup && h("div", {
      "class": "workflow-bottom-page "
    }, [h("mt-popup", {
      attrs: {
        value: this.isElementsPopup,
        position: "bottom"
      },
      on: {
        "input": function input(v) {
          if (v !== _this.isElementsPopup) {
            _this.isElementsPopup = v;
          }
        }
      }
    }, [h("div", {
      "class": "workflow-elements"
    }, [h("div", {
      "class": "workflow-elements-title"
    }, ["\u5BA1\u6279\u8981\u70B9: "]), h("div", {
      "class": "workflow-elements-content"
    }, [this.elementsInfo.map(function (e) {
      return h("div", {
        "class": "workflow-elements-item"
      }, [h("span", [e.elementName]), e.isRequired && h("w-icon", {
        "class": "check",
        attrs: {
          primary: true
        }
      }), " "]);
    })])])])])]);
  };

  WorkflowTraceFull.prototype.getTaskState = function (step, status) {
    var state = ServerTaskStateMapping[status]; // 处理第一岗审核中为待提交
    // 如果第一岗为已审核，修改状态为已提交

    if (step.isFirstNode) {
      if (state == TaskState.Process) {
        state = TaskState.Submitting;
      } else if (state == TaskState.Approved) {
        state = TaskState.Submitted;
      }
    }

    return state;
  };

  WorkflowTraceFull.prototype.getSteps = function (data) {
    var _a, _b, _c;

    var ret = [];
    var steps = data;
    var isFirstNodeFound = false;
    var firstNodeId = '';

    for (var _i = 0, steps_1 = steps; _i < steps_1.length; _i++) {
      var node = steps_1[_i];
      node.roleIds = [];
      node.userCodes = [];
      node.more = false;
      var isSkipped = false; // 查找第一个已审核任务节点

      if (!isFirstNodeFound && node.actType == 'userTask') {
        isFirstNodeFound = true;
        firstNodeId = node.nodeId;
        node.isFirstNode = true;
      } // 标记第一节点


      if (node.nodeId == firstNodeId) {
        node.isFirstNode = true;
      }

      if (node.tasks) {
        for (var _d = 0, _e = node.tasks; _d < _e.length; _d++) {
          var task = _e[_d]; // 默认一个signImage初始值

          task.signImage = null; // 默认审批要点

          task.elements = []; // 检查任务是否为已撤销或被撤销

          if (this.config.hiddenCancelNodes && (task.status == '010' || task.status == '008')) {
            isSkipped = true;
          }

          if (!task.userName) {
            if (task.userCode) {
              this.userIds.push(task.userCode);
            } else if (task.roleId) {
              node.more = false;
              node.roleIds.push(task.roleId);
            } else if (task.user) {
              // 新的抢占，支持有角色，用户
              node.more = false; // 多角色

              if (task.user.roleId) {
                var roleIds = task.user.roleId.split(',');

                (_a = node.roleIds).push.apply(_a, roleIds);
              } // 多用户


              if (task.user.userCode) {
                var userCodes = task.user.userCode.split(',');

                (_b = this.userIds).push.apply(_b, userCodes);

                (_c = node.userCodes).push.apply(_c, userCodes);
              }
            }
          }
        }
      }

      if (isSkipped) continue;
      ret.push(node);
    }

    return ret;
  };

  WorkflowTraceFull.prototype.loadUserNames = function () {
    return __awaiter(this, void 0, void 0, function () {
      var data, users, roles, names, _loop_1, this_1, _i, data_1, node;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            data = this.steps;
            users = new Map();
            roles = new Map();
            if (!this.userIds) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , getUserInfoList({
              ids: this.userIds.join(','),
              type: 'user'
            })];

          case 1:
            names = _a.sent();

            if (names) {
              names.forEach(function (user) {
                users.set(user.userCode, user);
              });
            }

            _a.label = 2;

          case 2:
            _loop_1 = function _loop_1(node) {
              var delegateUserNameMap, taskIds, delegatedUsers, _i, _a, task, u, names, names;

              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    delegateUserNameMap = new Map();
                    if (!(this_1.options.showDelegatedUserName && node.status === TaskState.Process)) return [3
                    /*break*/
                    , 3];
                    taskIds = node.tasks.map(function (t) {
                      return t.taskId;
                    }).join(',');
                    return [4
                    /*yield*/
                    , getTaskDelegateUsers(taskIds)];

                  case 1:
                    delegatedUsers = _b.sent();
                    if (!(delegatedUsers && delegatedUsers.length > 0)) return [3
                    /*break*/
                    , 3];
                    return [4
                    /*yield*/
                    , delegatedUsers.reduce(function (prev, cur) {
                      return __awaiter(_this, void 0, void 0, function () {
                        var delegatedUserInfos, delegateUser;
                        return __generator(this, function (_a) {
                          switch (_a.label) {
                            case 0:
                              return [4
                              /*yield*/
                              , getUserInfoList({
                                ids: cur.delegatedUserCode,
                                type: 'user'
                              })];

                            case 1:
                              delegatedUserInfos = _a.sent();

                              if (delegatedUserInfos) {
                                delegateUser = delegatedUserInfos[0];
                                prev.set(cur.delegateUserCode, delegateUser);
                                users.set(delegateUser.userCode, delegateUser);
                              }

                              return [2
                              /*return*/
                              , prev];
                          }
                        });
                      });
                    }, new Map())];

                  case 2:
                    delegateUserNameMap = _b.sent();
                    _b.label = 3;

                  case 3:
                    if (!node.tasks) return [3
                    /*break*/
                    , 9]; // 处理用户名称

                    for (_i = 0, _a = node.tasks; _i < _a.length; _i++) {
                      task = _a[_i];

                      if (!task.userName) {
                        if (task.userCode) {
                          u = users.get(task.userCode);

                          if (u) {
                            task.userName = u.userName;
                          } else {
                            task.userName = task.userCode;
                          }
                        }
                      }
                    }

                    if (!(node.roleIds && node.roleIds.length > 0)) return [3
                    /*break*/
                    , 8];
                    if (!this_1.options.showRoleName) return [3
                    /*break*/
                    , 6];
                    if (!this_1.adminConfig) return [3
                    /*break*/
                    , 5];
                    return [4
                    /*yield*/
                    , getRoleInfoListByUrl(this_1.adminConfig.platform.baseUrl, {
                      ids: node.roleIds.join(',')
                    })];

                  case 4:
                    names = _b.sent();

                    if (names) {
                      // 角色名称
                      names.forEach(function (role) {
                        node.tasks.push({
                          roleId: role.roleId,
                          roleName: role.roleName
                        });
                      });
                    }

                    _b.label = 5;

                  case 5:
                    return [3
                    /*break*/
                    , 8];

                  case 6:
                    return [4
                    /*yield*/
                    , getUserInfoList({
                      ids: node.roleIds.join(','),
                      type: 'role'
                    })];

                  case 7:
                    names = _b.sent();

                    if (names) {
                      names.forEach(function (u) {
                        node.tasks.push({
                          userCode: u.userCode,
                          userName: u.userName
                        });
                        users.set(u.userCode, u);
                      });
                    }

                    _b.label = 8;

                  case 8:
                    // 处理多用户
                    if (node.userCodes && node.userCodes.length > 0) {
                      node.userCodes.forEach(function (userCode) {
                        return __awaiter(_this, void 0, void 0, function () {
                          var u;
                          return __generator(this, function (_a) {
                            u = users.get(userCode);

                            if (u) {
                              node.tasks.push({
                                userCode: u.userCode,
                                userName: u.userName
                              });
                            }

                            return [2
                            /*return*/
                            ];
                          });
                        });
                      });
                    }

                    _b.label = 9;

                  case 9:
                    return [2
                    /*return*/
                    ];
                }
              });
            };

            this_1 = this;
            _i = 0, data_1 = data;
            _a.label = 3;

          case 3:
            if (!(_i < data_1.length)) return [3
            /*break*/
            , 6];
            node = data_1[_i];
            return [5
            /*yield**/
            , _loop_1(node)];

          case 4:
            _a.sent();

            _a.label = 5;

          case 5:
            _i++;
            return [3
            /*break*/
            , 3];

          case 6:
            return [2
            /*return*/
            , {
              users: users,
              roles: roles
            }];
        }
      });
    });
  };
  /**
   * 获取签章数据
   */


  WorkflowTraceFull.prototype.loadSignData = function () {
    return __awaiter(this, void 0, void 0, function () {
      var signList, signMap, _i, signList_1, sign, steps, _a, steps_2, node, _b, _c, task;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!this.config.procInstId) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , getSignList(this.config.procInstId)];

          case 1:
            signList = _d.sent();
            signMap = new Map();

            if (signList && signList.length > 0) {
              for (_i = 0, signList_1 = signList; _i < signList_1.length; _i++) {
                sign = signList_1[_i];

                if (sign.signImage) {
                  signMap.set(sign.taskId, "data:image/gif;base64," + sign.signImage);
                }
              }
            }

            steps = this.steps;

            for (_a = 0, steps_2 = steps; _a < steps_2.length; _a++) {
              node = steps_2[_a];

              if (node.tasks) {
                for (_b = 0, _c = node.tasks; _b < _c.length; _b++) {
                  task = _c[_b];

                  if (signMap.has(task.taskId)) {
                    //console.log('signImage', signMap.get(task.taskId));
                    task.signImage = signMap.get(task.taskId);
                  }
                }
              }
            }

            _d.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowTraceFull.prototype.renderElement = function (record) {
    if (record.isRequired === "1") {
      return h("w-icon", {
        "class": "workflow-element-check",
        attrs: {
          type: "check"
        }
      });
    }

    return h("div");
  };
  /**
   * 获取审批要点
   */


  WorkflowTraceFull.prototype.loadApproveElements = function () {
    return __awaiter(this, void 0, void 0, function () {
      var elementsMap, steps, _i, steps_3, node, _a, _b, task;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!this.config.procInstId) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , getApproveElementsList(this.config.procInstId)];

          case 1:
            elementsMap = _c.sent();
            steps = this.steps;

            for (_i = 0, steps_3 = steps; _i < steps_3.length; _i++) {
              node = steps_3[_i];

              if (node.tasks) {
                for (_a = 0, _b = node.tasks; _a < _b.length; _a++) {
                  task = _b[_a];

                  if (elementsMap[task.taskId]) {
                    // console.log("task.elements", elementsMap[task.taskId]);
                    task.elements = elementsMap[task.taskId];
                  }
                }
              }
            }

            _c.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  __decorate([Prop()], WorkflowTraceFull.prototype, "options", void 0);

  __decorate([Prop({
    default: 'default'
  })], WorkflowTraceFull.prototype, "size", void 0);

  __decorate([Prop({
    default: 'default'
  })], WorkflowTraceFull.prototype, "iconStyle", void 0);

  __decorate([Prop()], WorkflowTraceFull.prototype, "locale", void 0);

  __decorate([Prop({
    default: 'horizontal'
  })], WorkflowTraceFull.prototype, "direction", void 0);

  __decorate([Prop({
    default: true
  })], WorkflowTraceFull.prototype, "showChartLink", void 0);

  __decorate([Watch('options')], WorkflowTraceFull.prototype, "onOptionsChanged", null);

  WorkflowTraceFull = __decorate([Component({
    components: {
      "w-steps": Steps,
      "w-step": Step,
      "w-icon": Icon
    }
  })], WorkflowTraceFull);
  return WorkflowTraceFull;
}(Vue);

var ServerTaskStateMapping$1 = {
  // 已提交
  "001": TaskState.Submitted,
  // 审批中（待办任务-未读未办）
  "002": TaskState.Process,
  // 审批中（待办任务-已读未办）
  "003": TaskState.Process,
  // 已认领（待办任务-已读未办--抢占特有的状态）
  "004": TaskState.Process,
  // 已完成
  "005": TaskState.Approved,
  // 被驳回（被退回）
  "006": TaskState.Back,
  // 已驳回（已退回）
  "007": TaskState.Back,
  // 被撤销
  "008": TaskState.Cancel,
  // 委托 (当前不支持)
  "009": TaskState.NotStart,
  // 已撤销
  "010": TaskState.Cancel,
  // 已送审
  "011": TaskState.Approved,
  // 已废弃
  "014": TaskState.Approved
};
var defaultLocale$1 = {
  /**
   * 已提交
   */
  submitted: '已提交',

  /**
   * 已审核
   */
  approved: '已审核',

  /**
   * 审核中
   */
  process: '审核中',

  /**
   * 已撤销
   */
  cancel: '已撤销',

  /**
   * 已驳回
   */
  back: '已驳回',

  /**
   * 时间显示格式
   */
  dateTimeFormat: 'MM-DD HH:mm'
};
/**
 * 流程跟踪审批记录
 */

var WorkflowTraceList =
/** @class */
function (_super) {
  __extends(WorkflowTraceList, _super);

  function WorkflowTraceList() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.columns = [{
      title: '序号',
      dataIndex: 'index',
      width: '70px',
      customRender: function customRender(text, record, index) {
        return index + 1;
      }
    }, {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName'
    }, {
      title: '审批状态',
      dataIndex: 'state',
      key: 'state',
      customRender: function customRender(text, record, index) {
        return _this.renderTaskStateText(record.state);
      }
    }, {
      title: '审批人',
      dataIndex: 'opUserName',
      key: 'opUserName',
      customRender: function customRender(text, record, index) {
        return record.userName || record.userCode || '';
      }
    }, {
      title: '审批意见',
      dataIndex: 'message',
      key: 'message',
      width: '350px'
    }, {
      title: '审批时间',
      align: "right",
      dataIndex: 'endTime',
      key: 'endTime',
      customRender: function customRender(text, record, index) {
        var locale = __assign(__assign({}, defaultLocale$1), _this.locale);

        return moment(record.endTime, 'YYYY-MM-DD HH:mm:ss.S').format(locale.dateTimeFormat) || '';
      }
    }];
    _this.tasks = [];
    return _this;
  }

  WorkflowTraceList.prototype.onOptionsChanged = function (val, oldVal) {
    if (val) {
      this.reload();
    }
  };
  /**
   * 重新加载
   */


  WorkflowTraceList.prototype.reload = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!checkOr("workflow-trace-list", ['procInstId'], ['businessKey'], this.options)) {
              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: '无效的options参数'
                });
              }

              return [2
              /*return*/
              ];
            }

            _a = this;
            return [4
            /*yield*/
            , getConfig(this.options)];

          case 1:
            _a.config = _b.sent();

            if (!this.config) {
              error("\u67E5\u8BE2\u5DE5\u4F5C\u6D41\u4FE1\u606F\u5931\u8D25");

              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: '查询工作流信息失败'
                });
              }

              return [2
              /*return*/
              , true];
            }

            return [4
            /*yield*/
            , getWorkflowTraceListData({
              procInstId: this.config.procInstId,
              sort: this.sort
            })];

          case 2:
            data = _b.sent();

            if (data) {
              this.tasks = data || []; // 查询用户名称

              this.updateUserNames(this.tasks);
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowTraceList.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.reload();
        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowTraceList.prototype.render = function (h) {
    return h("div", {
      "class": "workflow-trace-list"
    }, [h("aw-table", {
      attrs: {
        bordered: true,
        columns: this.columns,
        dataSource: this.tasks,
        rowKey: "taskId",
        locale: {
          emptyText: this.emptyText
        },
        pagination: false
      }
    })]);
  };

  WorkflowTraceList.prototype.renderTaskStateText = function (serverTaskState) {
    var state = ServerTaskStateMapping$1[serverTaskState];
    var ret = h("div");

    var locale = __assign(__assign({}, defaultLocale$1), this.locale);

    if (state == TaskState.Submitted) {
      ret = h("div", {
        "class": "task-approved"
      }, [locale.submitted]);
    } else if (state == TaskState.Approved) {
      ret = h("div", {
        "class": "task-approved"
      }, [locale.approved]);
    } else if (state == TaskState.Process) {
      ret = h("div", {
        "class": "task-process"
      }, [locale.process]);
    } else if (state == TaskState.NotStart) {
      ret = h("div", {
        "class": "task-none"
      }, [locale.none]);
    } else if (state == TaskState.Back) {
      ret = h("div", {
        "class": "task-back"
      }, [locale.back]);
    } else if (state == TaskState.Backed) {
      ret = h("div", {
        "class": "task-process"
      }, [locale.process]);
    } else if (state == TaskState.Cancel) {
      ret = h("div", {
        "class": "task-cancel"
      }, [locale.cancel]);
    }

    return ret;
  };

  WorkflowTraceList.prototype.updateUserNames = function (tasks) {
    return __awaiter(this, void 0, void 0, function () {
      var users, count, _i, tasks_1, task, userInfoList, userMap, _a, userInfoList_1, u, _b, tasks_2, task, user;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            users = {};
            count = 0;

            for (_i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
              task = tasks_1[_i];

              if (!task.userName) {
                users[task.userCode] = task;
                count++;
              }
            }

            if (!(count > 0)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , getUserInfoList({
              ids: Object.keys(users).join(','),
              type: 'user'
            })];

          case 1:
            userInfoList = _c.sent();
            userMap = {};

            for (_a = 0, userInfoList_1 = userInfoList; _a < userInfoList_1.length; _a++) {
              u = userInfoList_1[_a];
              userMap[u.userCode] = u;
            }

            for (_b = 0, tasks_2 = tasks; _b < tasks_2.length; _b++) {
              task = tasks_2[_b];

              if (!task.userName) {
                user = userMap[task.userCode];

                if (user) {
                  task.userName = user.userName;
                }
              }
            }

            _c.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  __decorate([Prop()], WorkflowTraceList.prototype, "options", void 0);

  __decorate([Prop({
    default: 'desc'
  })], WorkflowTraceList.prototype, "sort", void 0);

  __decorate([Prop()], WorkflowTraceList.prototype, "locale", void 0);

  __decorate([Prop({
    default: '没有审批记录'
  })], WorkflowTraceList.prototype, "emptyText", void 0);

  __decorate([Watch('options')], WorkflowTraceList.prototype, "onOptionsChanged", null);

  WorkflowTraceList = __decorate([Component], WorkflowTraceList);
  return WorkflowTraceList;
}(Vue);

var EventBus = new Vue({});

// const NoDataImage = require('../../assets/images/nodata.png');

var ServerTaskStateMapping$2 = {
  // 已提交
  "001": TaskState.Submitted,
  // 审批中（待办任务-未读未办）
  "002": TaskState.Process,
  // 审批中（待办任务-已读未办）
  "003": TaskState.Process,
  // 已认领（待办任务-已读未办--抢占特有的状态）
  "004": TaskState.Process,
  // 已完成
  "005": TaskState.Approved,
  // 被驳回（被退回）
  "006": TaskState.Process,
  // 已驳回（已退回）
  "007": TaskState.Back,
  // 被撤销
  "008": TaskState.Process,
  // 委托 (当前不支持)
  "009": TaskState.NotStart,
  // 已撤销
  "010": TaskState.Cancel,
  // 已送审
  "011": TaskState.Approved,
  // 已废弃
  "014": TaskState.Approved
};

var DoneContainer =
/** @class */
function (_super) {
  __extends(DoneContainer, _super);

  function DoneContainer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.searchText = '';
    _this.page = 1;
    _this.doneTaskList = [];
    _this.isEmpty = false;
    _this.loading = true;
    _this.show = false;
    _this.showDown = false;
    return _this;
  }

  DoneContainer.prototype.openUrl = function (url, businessKey, type) {
    return __awaiter(this, void 0, void 0, function () {
      var arg, res, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            arg = parseQueryString(url);
            if (!(arg.interfaceType && arg.interfaceType == 1)) return [3
            /*break*/
            , 5];
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , advanceAsk(url, {
              "appType": "mobile",
              "businessKey": businessKey,
              "urlType": type
            })];

          case 2:
            res = _a.sent();
            this.$router.push({
              path: res.url,
              query: {
                urlType: type,
                bizTypeCode: res.bizTypeCode,
                appCode: res.appCode,
                procInstId: res.procInstId,
                procDefId: res.procDefId,
                businessKey: res.businessKey,
                nodeId: res.nodeId,
                taskId: res.taskId
              }
            });
            return [3
            /*break*/
            , 4];

          case 3:
            e_1 = _a.sent();
            return [3
            /*break*/
            , 4];

          case 4:
            return [3
            /*break*/
            , 6];

          case 5:
            this.$router.push({
              path: url
            });
            _a.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  DoneContainer.prototype.mounted = function () {
    var _this = this;

    this.loading = true;
    this.getTaskDoneList();
    var scroll = new BScroll(this.$refs.taskContainer, {
      scrollY: true,
      click: true,
      bounce: {
        top: true,
        bottom: true
      },
      pullDownRefresh: {
        threshold: 30,
        stop: 20,
        fade: true
      },
      pullUpLoad: {
        threshold: -50
      }
    });
    scroll.on('pullingDown', function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.loading = true;
          this.page = 1;
          this.doneTaskList = [];
          this.getTaskDoneList();
          scroll.finishPullDown();
          scroll.refresh();
          return [2
          /*return*/
          ];
        });
      });
    });
    scroll.on('pullingUp', function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.page = this.page + 1;
          this.getTaskDoneList('upload');
          this.showDown = false;
          scroll.finishPullUp();
          return [2
          /*return*/
          ];
        });
      });
    });
    scroll.on('scroll', function (pos) {
      if (document.body.clientHeight - pos.y - _this.$refs.pageContainer.clientHeight > 50) {
        _this.showDown = true;
      } // if (-document.body.clientHeight - (pos.y - 119) > -200) {
      //   this.showDown = true;
      // }

    });
  };

  DoneContainer.prototype.onSearch = function (v) {
    this.loading = true;
    this.searchText = v;
    this.getTaskDoneList();
  };

  DoneContainer.prototype.getTaskDoneList = function (upload) {
    return __awaiter(this, void 0, void 0, function () {
      var taskDoneList;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , getTaskDoneList({
              page: this.page,
              rows: this.rows,
              userCode: this.userCode,
              roleId: this.roleId,
              name: this.searchText
            })];

          case 1:
            taskDoneList = _b.sent();

            if (upload === 'upload') {
              (_a = this.doneTaskList).push.apply(_a, matchColor(taskDoneList.rows));
            } else {
              this.doneTaskList = matchColor(taskDoneList.rows);
            }

            this.isEmpty = taskDoneList.rows.length > 0 ? false : true;
            this.loading = false;
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  DoneContainer.prototype.render = function (h) {
    var _this = this;

    return h("div", [h("w-search", {
      attrs: {
        value: "enen"
      },
      on: {
        "search": function search(key) {
          return _this.onSearch(key);
        }
      }
    }), !this.isEmpty && h("div", {
      "class": "workflow-page-infinite-list",
      ref: "taskContainer"
    }, [h("div", {
      ref: "pageContainer"
    }, [h("mt-tab-container", {
      "class": "page-container",
      attrs: {
        value: "1"
      }
    }, [h("mt-tab-container-item", {
      attrs: {
        id: "1"
      }
    }, [this.doneTaskList.map(function (val) {
      return h("div", {
        "class": "workflow-task-content",
        on: {
          "click": function click() {
            return _this.openUrl(val.url, val.businessKey, 'done');
          }
        }
      }, [h("div", {
        "class": "workflow-task-tit"
      }, [h("span", {
        "class": "workflow-task-bizTypeName",
        style: {
          color: val.textColor,
          backgroundColor: val.bgColor
        }
      }, [val.bizTypeName]), h("span", {
        "class": "workflow-task-code"
      }, [val.field1]), h("span", {
        "class": "workflow-task-time"
      }, [moment(val.taskEndTime, 'YYYY-MM-DD HH:mm:ss.S').format("YYYY-MM-DD HH:mm")])]), h("div", {
        "class": "workflow-task-middle"
      }, [h("span", {
        "class": "workflow-task-peoples"
      }, [val.field2]), h("span", {
        "class": "workflow-task-departmentApprove"
      }, [val.nodeName])]), h("div", {
        "class": "workflow-task-bottom"
      }, [h("span", {
        "class": "workflow-task-department"
      }, [val.field3]), h("span", {
        "class": "workflow-task-price"
      }, [val.field4])]), h("div", {
        "class": "workflow-task-reason"
      }, [h("span", [val.field5])]), h("div", {
        "class": "div-relative"
      }, [h("div", {
        "class": "workflow-circle-out " + _this.getTaskCssName(val.state).ret
      }, [h("div", {
        "class": "workflow-circle-in flex"
      }, [h("span", {
        "class": "workflow-task-billstatus"
      }, [_this.getTaskCssName(val.state).retName])])])])]);
    }), h("p", [this.showDown && h("div", {
      "class": "before-trigger"
    }, [h("span", ["\u52A0\u8F7D\u4E2D"]), " \xA0\xA0 ", h("i", {
      "class": "workflow-loading"
    })])])])])])]), this.isEmpty && h("div", {
      "class": "workflow-noInfo"
    }, [h("w-empty")]), this.loading && h("p", {
      "class": "workflow-page-infinite-loading",
      ref: "infiniteLoading"
    }, [h("mt-spinner", {
      attrs: {
        type: "fading-circle"
      }
    }), "\u52A0\u8F7D\u4E2D..."])]);
  };

  DoneContainer.prototype.getTaskCssName = function (status) {
    var state = ServerTaskStateMapping$2[status];
    var ret = '';
    var retName = '';

    if (state) {
      switch (state) {
        case TaskState.Approved:
          ret = "workflow-out-agree";
          retName = '已同意';
          break;

        case TaskState.Cancel:
          ret = "workflow-out-stay";
          retName = '已驳回';
          break;

        case TaskState.Back:
          ret = "workflow-out-stay";
          retName = '已驳回';
      }
    }

    return {
      ret: ret,
      retName: retName
    };
  };

  __decorate([Prop({
    default: 5
  })], DoneContainer.prototype, "rows", void 0);

  __decorate([Prop({
    default: ''
  })], DoneContainer.prototype, "userCode", void 0);

  __decorate([Prop({
    default: ''
  })], DoneContainer.prototype, "roleId", void 0);

  __decorate([Prop({
    default: ''
  })], DoneContainer.prototype, "name", void 0);

  DoneContainer = __decorate([Component({
    components: {
      'w-search': Search,
      'w-empty': Empty
    }
  })], DoneContainer);
  return DoneContainer;
}(Vue);

var REMARK_TYPE$2 = 'approve';

var WorkflowBatchApprove =
/** @class */
function (_super) {
  __extends(WorkflowBatchApprove, _super);

  function WorkflowBatchApprove() {
    var _this = _super !== null && _super.apply(this, arguments) || this; // 当前批语


    _this.approveText = ""; // 批语列表

    _this.remarks = [];
    _this.searchText = '';
    _this.userPage = 0;
    _this.userPageCount = 1;
    _this.userTotal = 0; // 保存忙碌状态

    _this.saveBusying = false; // 签章数据

    _this.signObject = null;
    return _this;
  }

  WorkflowBatchApprove.prototype.onVisibleChanged = function (val, oldVal) {
    if (val) {
      this.reinit(this.options);
    }
  };

  WorkflowBatchApprove.prototype.onOptionsChanged = function (val, oldVal) {
    if (this.visible && val) {
      this.reinit(val);
    }
  };

  WorkflowBatchApprove.prototype.onOk = function (e) {
    return __awaiter(this, void 0, void 0, function () {
      var ret, taskIds, data, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ret = {
              error: 0,
              message: ''
            };
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3, 4, 5]);

            if (!this.options || !this.options.list || this.options.list.length == 0) {
              throw {
                code: 1,
                msg: '请选择批量送审的单据'
              };
            }

            taskIds = this.options.list.map(function (task) {
              return task.taskId;
            });

            if (!taskIds || taskIds.length == 0) {
              throw {
                code: 1,
                msg: '请选择批量送审的单据'
              };
            } // 验证签章
            // 如果signRequire为true, 则如果节点配置了签章，则必须要签章


            if (this.options.signType && this.options.signRequired && !this.signObject) {
              throw {
                error: 1,
                message: '请签章后再审批'
              };
            }

            this.saveBusying = true;
            data = {
              userCode: config.userCode,
              signObject: this.signObject,
              message: this.approveText,
              taskFormRequests: this.options.list.map(function (task) {
                return {
                  businessKey: task.businessKey,
                  variables: task.variables
                };
              })
            };
            return [4
            /*yield*/
            , batchApprove(taskIds.join(','), data)];

          case 2:
            _a.sent();

            return [2
            /*return*/
            , ret];

          case 3:
            e_1 = _a.sent();
            ret = getErrorInfo(e_1);
            return [3
            /*break*/
            , 5];

          case 4:
            this.saveBusying = false;
            return [7
            /*endfinally*/
            ];

          case 5:
            return [2
            /*return*/
            , ret];
        }
      });
    });
  };

  WorkflowBatchApprove.prototype.onCancel = function (e) {
    return false;
  };

  WorkflowBatchApprove.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.visible) {
          this.reinit(this.options);
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowBatchApprove.prototype.destroyed = function () {// 退出签章连接
    //utils.signExit(this.options.signType || '');
  };
  /**
   * 再次修改options后打开组件
   * @param options
   */


  WorkflowBatchApprove.prototype.reinit = function (options) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.options = options; // 如果节点配置为签章并且组合件配置了签章类型

        console.log("options", this.options);

        if (this.options.signType) ;

        this.approveText = config.getData('approve.text') || ''; // 获取批语列表

        this.getRemarkList();
        return [2
        /*return*/
        ];
      });
    });
  };
  /**
   * 选择批语
   */


  WorkflowBatchApprove.prototype.handleWordChange = function (v) {
    console.log("selected", v);
    this.approveText = v;
  };
  /**
   * 输入批语
   */


  WorkflowBatchApprove.prototype.onInputChange = function (e) {
    console.log("onInputChange", e);
    this.approveText = e.target.value;
  };
  /**
   * 星标批语
   */


  WorkflowBatchApprove.prototype.starRemarkItem = function (remark) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            //e.preventDefault();
            console.log("starRemarkItem", remark);
            return [4
            /*yield*/
            , starRemark({
              id: remark.id,
              flag: remark.flag == 1 ? 0 : 1
            })];

          case 1:
            _a.sent();

            Toast(remark.flag == 1 ? '取消批语星标成功' : '添加批语星标成功');
            this.getRemarkList();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowBatchApprove.prototype.deleteRemarkItem = function (remark) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log("deleteRemarkItem", remark);
        return [2
        /*return*/
        ];
      });
    });
  };

  WorkflowBatchApprove.prototype.selectRemarkItem = function (remark) {
    console.log("selectRemarkItem", remark);
    this.approveText = remark.text;
  };

  WorkflowBatchApprove.prototype.render = function (h) {
    return h("div") // <aw-modal
    //   centered
    //   title={this.options.title || '审批'}
    //   class="workflow workflow-approve"
    //   visible={this.visible}
    //   maskClosable={false}
    //   onCancel={this.onCancel}
    //   footer={[
    //     <aw-button key="back" onClick={this.onCancel}>
    //       取消
    //     </aw-button>,
    //     <aw-button key="submit" loading={this.saveBusying} type="primary" onClick={(e) => {
    //       this.onOk(e)
    //     }}>
    //       确定
    //     </aw-button>
    //   ]}
    // >
    //   <aw-row class="workflow-line">
    //     <aw-col span={3} class="title">常用批语: </aw-col>
    //     <aw-col span={21}>
    //       <aw-dropdown class="workflow-remark-button">
    //         <aw-menu slot="overlay" class="workflow-remark">
    //           {
    //             this.remarks && this.remarks.length > 0 ?
    //               this.remarks.map((remark: any) =>
    //                 <aw-menu-item key={remark.id} >
    //                   <span class="workflow-remark-text" onClick={(e: any) => {
    //                     this.selectRemarkItem(remark)
    //                   }} >{utils.limitShowRemark(remark.text)}</span>
    //                   {
    //                     remark.type == 'private' &&
    //                     <span class="workflow-remark-actions">
    //                       <aw-icon title="星标批语" onClick={(e: any) => {
    //                         this.starRemarkItem(remark);
    //                       }} type="star" theme={remark.flag && "filled"} />
    //                       <aw-icon title="删除批语" onClick={() => this.deleteRemarkItem(remark)} type="delete" />
    //                     </span>
    //                   }
    //                 </aw-menu-item>) : <aw-menu-item>当前还没有批语</aw-menu-item>
    //           }
    //         </aw-menu>
    //         <aw-button style="margin-left: 8px">
    //           请选择常用批语 <aw-icon type="down" />
    //         </aw-button>
    //       </aw-dropdown>
    //     </aw-col>
    //   </aw-row>
    //   <aw-row class="workflow-line">
    //     <aw-col id="message-container">
    //       <aw-textarea
    //         id="approve-message"
    //         ref="approveMessage"
    //         maxLength={50}
    //         rows={2}
    //         value={this.approveText}
    //         placeholder="请输入批语"
    //         onChange={this.onInputChange}
    //       />
    //     </aw-col>
    //   </aw-row>
    //   <aw-row class="workflow-line">
    //     <aw-col>
    //       <aw-button type="primary" disabled={!this.approveText} ghost onClick={async () => {
    //         try {
    //           await service.isRemarkDup({
    //             appCode: config.appCode,
    //             comLang: this.approveText,
    //             type: REMARK_TYPE
    //           });
    //         } catch (e) {
    //           message.error('批语已存在, 不能保存重复批语');
    //           return;
    //         }
    //         await service.saveRemark({
    //           appCode: config.appCode,
    //           text: this.approveText,
    //           type: REMARK_TYPE
    //         });
    //         message.success('批语保存成功');
    //         this.getRemarkList();
    //       }} >
    //         另存为新批语
    //       </aw-button>
    //       {
    //         this.options.signType &&
    //         <aw-button type="primary" style="margin-left:8px" onClick={async () => {
    //           try {
    //             let messageInputBox: any = this.$refs.approveMessage;
    //             utils.sign(this.options.signType || '', {
    //               left: messageInputBox.$el.clientWidth - 80,
    //               top: messageInputBox.$el.clientHeight - 40,
    //               imgWidth: 80,
    //               imgHeight: 40,
    //               defaultSignText: ' ',
    //               containerId: "message-container",
    //               fieldId: "approve-message",
    //               onSuccess: async (signData, signMethod, imgData) => {
    //                 this.signObject = {
    //                   signImage: imgData,
    //                   signType: this.options.signType,
    //                   signMethod: signMethod,
    //                   signMessage: this.approveText,
    //                   signData: signData
    //                 };
    //               }
    //             });
    //           } catch (e) {
    //             message.error(e.message);
    //             return;
    //           }
    //         }} >
    //           签章
    //         </aw-button>
    //       }
    //     </aw-col>
    //   </aw-row>
    // </aw-modal>
    ;
  }; // 获取批语列表


  WorkflowBatchApprove.prototype.getRemarkList = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this;
            return [4
            /*yield*/
            , getRemarkList({
              appCode: config.appCode,
              userCode: config.userCode,
              size: 10,
              type: REMARK_TYPE$2
            })];

          case 1:
            _a.remarks = _b.sent();
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * 保存签章数据
   */


  WorkflowBatchApprove.prototype.saveSignData = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , saveSignData(data)];
      });
    });
  };

  __decorate([Prop({
    default: ''
  })], WorkflowBatchApprove.prototype, "title", void 0);

  __decorate([Prop({
    default: false
  })], WorkflowBatchApprove.prototype, "visible", void 0);

  __decorate([Prop()], WorkflowBatchApprove.prototype, "options", void 0);

  __decorate([Watch('visible')], WorkflowBatchApprove.prototype, "onVisibleChanged", null);

  __decorate([Watch('options')], WorkflowBatchApprove.prototype, "onOptionsChanged", null);

  __decorate([Emit("complete")], WorkflowBatchApprove.prototype, "onOk", null);

  __decorate([Emit("cancel")], WorkflowBatchApprove.prototype, "onCancel", null);

  WorkflowBatchApprove = __decorate([Component], WorkflowBatchApprove);
  return WorkflowBatchApprove;
}(Vue);

var PAGE_SIZE$1 = 10;
/**
 * 代办/转办
 */

var WorkflowDelegate =
/** @class */
function (_super) {
  __extends(WorkflowDelegate, _super);

  function WorkflowDelegate() {
    var _this = _super !== null && _super.apply(this, arguments) || this; // 当前意见


    _this.approveText = "";
    _this.searchText = '';
    _this.userPage = 0;
    _this.userPageCount = 1;
    _this.userTotal = 0;
    _this.userList = [];
    _this.currentUsers = [];
    _this.userMap = new Map();
    _this.steps = [];
    _this.selectedNodeId = "";
    _this.defaultUnit = "";
    _this.units = [];
    _this.orgs = [];
    _this.defaultOrgId = "";
    _this.defaultOrgType = "";
    _this.buttonBusying = false;
    return _this;
  }

  WorkflowDelegate.prototype.onVisibleChanged = function (val, oldVal) {
    if (val) {
      this.reload(this.options);
    }
  };

  WorkflowDelegate.prototype.onOptionsChanged = function (val, oldVal) {
    if (this.visible && val) {
      this.reload(val);
    }
  };

  WorkflowDelegate.prototype.onOk = function (e) {
    return __awaiter(this, void 0, void 0, function () {
      var ret, id, users, approve, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ret = {
              error: 0,
              message: ''
            };
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3, 4, 5]);

            this.buttonBusying = true;
            id = this.config.taskId ? this.config.taskId : this.config.businessKey;

            if (!id) {
              if (config.debug) {
                MessageBox("错误", 'taskId|businessKey not found');
              }

              throw {
                code: 1,
                msg: 'taskId|businessKey not found'
              };
            }

            users = [];

            if (this.currentUsers && this.currentUsers.length > 0) {
              users = this.currentUsers.map(function (u) {
                return {
                  assignee: u.userCode,
                  assigneeName: u.userName,
                  assigneeType: 'user'
                };
              });
            }

            if (!this.action) {
              throw {
                code: 1,
                msg: "\u672A\u8BBE\u7F6Eaction(delegate|transfer)"
              };
            }

            if (users.length == 0) {
              throw {
                code: 1,
                msg: "\u8BF7\u9009\u62E9" + this.title + "\u4EBA\u5458"
              };
            }

            approve = this.config.taskId ? approveByTaskId : approveByBusinessKey;
            return [4
            /*yield*/
            , approve(id, {
              action: this.action,
              assignment: users ? users[0] : null,
              message: this.approveText
            })];

          case 2:
            _a.sent();

            return [3
            /*break*/
            , 5];

          case 3:
            e_1 = _a.sent();
            ret.error = e_1.code || 1;
            ret.message = e_1.message;

            if (e_1.code) {
              ret.message = e_1.msg;
            }

            return [3
            /*break*/
            , 5];

          case 4:
            this.buttonBusying = false;
            return [7
            /*endfinally*/
            ];

          case 5:
            return [2
            /*return*/
            , ret];
        }
      });
    });
  };

  WorkflowDelegate.prototype.onCancel = function (e) {
    return false;
  };

  Object.defineProperty(WorkflowDelegate.prototype, "locale", {
    get: function get() {
      return {
        emptyText: '当前没有数据'
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(WorkflowDelegate.prototype, "users", {
    get: function get() {
      return this.currentUsers;
    },
    enumerable: true,
    configurable: true
  });

  WorkflowDelegate.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.visible) {
          this.reload(this.options);
        }

        return [2
        /*return*/
        ];
      });
    });
  };
  /**
   * 再次修改options后打开组件
   * @param options
   */


  WorkflowDelegate.prototype.reload = function (options) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b, _c;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            this.options = options;

            if (!checkOr("workflow-delegate", ['taskId', 'unitCode'], ['businessKey', 'unitCode'], options)) {
              if (this.options.onComplete) {
                this.options.onComplete({
                  error: 1,
                  message: '无效的options参数'
                });
              }

              return [2
              /*return*/
              ];
            }

            _a = this;
            return [4
            /*yield*/
            , getConfig(options)];

          case 1:
            _a.config = _d.sent();
            console.log('config', options, this.config);

            if (this.action == 'delegate') {
              this.approveText = config.getData('delegate.text') || '';
            } else if (this.action == 'transfer') {
              this.approveText = config.getData('transfer.text') || '';
            }

            _b = this;
            return [4
            /*yield*/
            , getUnits(this.options.unitCode, '')];

          case 2:
            _b.units = _d.sent();
            if (!(this.units && this.units.length > 0)) return [3
            /*break*/
            , 4];
            this.defaultUnit = this.units[0].value;
            _c = this;
            return [4
            /*yield*/
            , getOrgs(this.defaultUnit, '', true)];

          case 3:
            _c.orgs = _d.sent();

            if (this.orgs && this.orgs.length > 0) {
              this.defaultOrgId = this.orgs[0].value;
              this.defaultOrgType = this.orgs[0].type;
              this.searchUserList(this.defaultOrgType, this.defaultOrgId, 1, '');
            }

            _d.label = 4;

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * 选择左侧树节点查询人员
   */


  WorkflowDelegate.prototype.selectDeptTreeNode = function (keys, e) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log('selectTreeNode', e.node);

        if (keys && keys.length > 0) {
          this.defaultOrgId = keys[0];
        }

        this.defaultOrgType = e.node.$attrs.type;
        this.searchText = "";
        this.searchUserList(this.defaultOrgType, this.defaultOrgId, 1, "");
        return [2
        /*return*/
        ];
      });
    });
  };
  /**
   * 选择单位树
   */


  WorkflowDelegate.prototype.handleUnitChange = function (v) {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            console.log("handleUnitChange", v);
            this.defaultUnit = v;
            _a = this;
            return [4
            /*yield*/
            , getOrgs(v, '', true)];

          case 1:
            _a.orgs = _b.sent();

            if (this.orgs && this.orgs.length > 0) {
              this.selectDeptTreeNode([this.orgs[0].id], {
                node: {
                  $attrs: {
                    type: this.orgs[0].type
                  }
                }
              });
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * 搜索用户
   */


  WorkflowDelegate.prototype.onSearch = function (v) {
    console.log("search", v);
    this.searchText = v;
    this.searchUserList(this.defaultOrgType, this.defaultOrgId, 1, v);
  };
  /**
  * 输入批语
  */


  WorkflowDelegate.prototype.onInputChange = function (e) {
    console.log("onInputChange", e);
    this.approveText = e.target.value;
  };
  /**
   * 删除选择用户
   */


  WorkflowDelegate.prototype.onRemoveUser = function (user) {
    console.log("onRemoveUser", user);
    var index = this.currentUsers.findIndex(function (u) {
      return u.userCode === user.userCode;
    });

    if (index > -1) {
      this.currentUsers.splice(index, 1);
    }
  };

  Object.defineProperty(WorkflowDelegate.prototype, "rowSelection", {
    // 选择用户
    get: function get() {
      var _this = this;

      return {
        type: "radio",
        onChange: function onChange(selectedRowKeys, selectedRows) {
          var unselectedKeys = (_this.userList || []).map(function (u) {
            return u.userCode;
          }).filter(function (v) {
            return !selectedRowKeys.includes(v);
          });

          var keys = _this.currentUsers.filter(function (u) {
            return unselectedKeys.indexOf(u.userCode) == -1;
          });

          selectedRows.forEach(function (row) {
            if (keys.findIndex(function (u) {
              return u.userCode === row.userCode;
            }) == -1) {
              keys.push(row);
            }

            if (!_this.userMap.has(row.userCode)) {
              _this.userMap.set(row.userCode, row);
            }
          });
          _this.currentUsers = keys;
        },
        selectedRowKeys: this.currentUsers.map(function (u) {
          return u.userCode;
        })
      };
    },
    enumerable: true,
    configurable: true
  });

  WorkflowDelegate.prototype.render = function (h) {
    var isTextMessage = this.options.isTextMessage;
    return h("div") // <aw-modal
    //     centered
    //     title={this.options.title || ''}
    //     class="workflow workflow-delegate"
    //     visible={this.visible}
    //     maskClosable={false}
    //     onCancel={this.onCancel}
    //     footer={[
    //         <aw-button key="back" onClick={this.onCancel}>
    //             取消
    //         </aw-button>,
    //         <aw-button key="submit" type="primary" loading={this.buttonBusying} onClick={(e) => {
    //             this.onOk(e)
    //         }}>
    //             确定
    //         </aw-button>
    //     ]}
    // >
    //     <div>
    //         <aw-row class="workflow-line bottom">
    //             <aw-col span={6} class="workflow-delegate-tree">
    //                 <aw-tree-select
    //                     showSearch
    //                     searchPlaceholder="搜索"
    //                     treeDefaultExpandAll
    //                     class="worklfow-units"
    //                     value={this.defaultUnit}
    //                     onChange={this.handleUnitChange}
    //                     treeData={this.units}
    //                     filterTreeNode={(inputValue: string, treeNode: any) => {
    //                         return treeNode.data.props.title.indexOf(inputValue) !== -1;
    //                     }}
    //                 >
    //                 </aw-tree-select>
    //                 <aw-tree
    //                     //checkable={false}
    //                     class="workflow-orgs"
    //                     showLine={true}
    //                     //showIcon={true}
    //                     selectedKeys={[this.defaultOrgId]}
    //                     defaultExpandAll={true}
    //                     treeDefaultExpandAll={true}
    //                     onSelect={this.selectDeptTreeNode}
    //                 //switcherIcon={<aw-icon type="down" />}
    //                 >
    //                     {this.showTreeNode(h, this.orgs)}
    //                 </aw-tree>
    //             </aw-col>
    //             <aw-col span={18} class="workflow-user-list">
    //                 <div class="workflow-user-list-header">
    //                     <aw-input-search
    //                         placeholder="请输入姓名进行搜索"
    //                         onSearch={this.onSearch}
    //                         style={{ width: 200 }}
    //                     />
    //                 </div>
    //                 <div>
    //                     <aw-table
    //                         bordered
    //                         rowKey="userCode"
    //                         class="workflow-user-list-table"
    //                         locale={{ emptyText: <aw-empty height={180} /> }}
    //                         pagination={{
    //                             current: this.userPage,
    //                             pageSize: PAGE_SIZE,
    //                             total: this.userTotal,
    //                             size: "middle",
    //                             onChange: (page: any) => {
    //                                 this.userPage = page;
    //                                 console.log("page", page);
    //                                 this.searchUserList(this.defaultOrgType, this.defaultOrgId, page, this.searchText);
    //                             }
    //                         }}
    //                         rowSelection={this.rowSelection}
    //                         dataSource={[...this.userList]}
    //                         columns={columns}
    //                         scroll={{ y: 150, x: 500 }}
    //                     />
    //                 </div>
    //             </aw-col>
    //         </aw-row>
    //         <aw-row class="workflow-delegate-select">
    //             <aw-col span={2}>已选人员: </aw-col>
    //             <aw-col span={22}>
    //                 <div class="workflow-delegate-tags">
    //                     {this.users.map((u: any) => (
    //                         <aw-tag closable onClose={() => this.onRemoveUser(u)}>
    //                             {u.userName}
    //                         </aw-tag>
    //                     ))}
    //                 </div>
    //             </aw-col>
    //         </aw-row>
    //     </div>
    //     {
    //         isTextMessage &&
    //         <div>
    //             <aw-row class="workflow-line">
    //                 <aw-col span={24} class="title left-tag">意见</aw-col>
    //             </aw-row>
    //             <aw-row class="workflow-line">
    //                 <aw-col>
    //                     <aw-textarea
    //                         rows={2}
    //                         value={this.approveText}
    //                         placeholder="请输入意见"
    //                         onChange={this.onInputChange}
    //                     />
    //                 </aw-col>
    //             </aw-row>
    //         </div>
    //     }
    // </aw-modal>
    ;
  };

  WorkflowDelegate.prototype.searchUserList = function (type, key, pageNum, name) {
    return __awaiter(this, void 0, void 0, function () {
      var data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , getOrgUsers(this.searchText, type, this.options.unitCode, key, pageNum, PAGE_SIZE$1)];

          case 1:
            data = _a.sent();

            if (data) {
              this.userList = data.rows || [];
              this.userTotal = data.total;
              this.userPage = data.page;
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  WorkflowDelegate.prototype.showTreeNode = function (h, data) {
    var _this = this;

    return data.map(function (item) {
      if (item.children && item.children.length > 0) {
        return h("aw-tree-node", {
          key: item.id,
          attrs: {
            value: item.id,
            title: item.name,
            type: item.type
          }
        }, [_this.showTreeNode(h, item.children)]);
      }

      return h("aw-tree-node", {
        key: item.id,
        attrs: {
          value: item.id,
          title: item.name,
          type: item.type
        }
      });
    });
  };

  __decorate([Prop({
    default: ''
  })], WorkflowDelegate.prototype, "title", void 0);

  __decorate([Prop({
    default: function _default() {
      return [];
    }
  })], WorkflowDelegate.prototype, "variables", void 0);

  __decorate([Prop({
    default: false
  })], WorkflowDelegate.prototype, "visible", void 0);

  __decorate([Prop()], WorkflowDelegate.prototype, "options", void 0);

  __decorate([Prop()], WorkflowDelegate.prototype, "action", void 0);

  __decorate([Watch('visible')], WorkflowDelegate.prototype, "onVisibleChanged", null);

  __decorate([Watch('options')], WorkflowDelegate.prototype, "onOptionsChanged", null);

  __decorate([Emit("complete")], WorkflowDelegate.prototype, "onOk", null);

  __decorate([Emit("cancel")], WorkflowDelegate.prototype, "onCancel", null);

  WorkflowDelegate = __decorate([Component({
    components: {
      "aw-empty": Empty
    }
  })], WorkflowDelegate);
  return WorkflowDelegate;
}(Vue);

/**
 * 默认启动流程参数
 */

var defaultStartOptions = {
  //默认送审第一节点
  approveFirstNode: true,
  // 默认单位Code
  unitCode: "",

  /**
   * 部门Code,为批派部门负责人时使用
   */
  deptCode: ""
};
function startWorkflow$1(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, opts, variables, isStarted, node, isCheckUsers, isTextMessage, signRequired, div_1, el_1, approveInstance_1, destry_1, _render, startConfig, data, data, e_1;

    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ret = {
            error: 0,
            message: ''
          };
          opts = __assign(__assign({}, defaultStartOptions), options);

          if (!check("startWorkflow", ['bizTypeCode', 'businessKey', 'userCode', 'rgCode'], opts)) {
            if (opts.onComplete) {
              ret.error = 1;
              ret.message = "options中缺少必要参数";
              opts.onComplete(ret);
            }

            return [2
            /*return*/
            ];
          }

          _a.label = 1;

        case 1:
          _a.trys.push([1, 12,, 13]);

          variables = [];

          if (options.variables) {
            variables = options.variables.map(function (v) {
              return __assign(__assign({}, v), {
                name: v.name.replace('$_', 'fvar_')
              });
            });
          }

          return [4
          /*yield*/
          , isWorkflowStarted(opts.businessKey)];

        case 2:
          isStarted = _a.sent();
          if (!isStarted) return [3
          /*break*/
          , 3];
          ret.error = 1;
          ret.message = "流程已经启动";
          return [3
          /*break*/
          , 11];

        case 3:
          console.log('aaa', config, config.appCode);
          return [4
          /*yield*/
          , getFirstNodeInfo({
            appCode: config.appCode,
            bizTypeCode: opts.bizTypeCode,
            rgCode: opts.rgCode,
            unitCode: opts.unitCode,
            userCode: opts.userCode,
            variables: variables
          })];

        case 4:
          node = _a.sent(); // 核验第一节点

          if (!node) {
            ret.error = 1;
            ret.message = "查询流程定义第一节点错误";
            opts.onComplete(ret);
            return [2
            /*return*/
            ];
          }

          if (!opts.approveFirstNode) return [3
          /*break*/
          , 9];
          isCheckUsers = node.isCheckUsers === "1";
          isTextMessage = opts.isTextMessage === true;
          signRequired = node.sign === '1' && opts.signType && opts.signRequired === true;
          if (!(isCheckUsers || isTextMessage || signRequired)) return [3
          /*break*/
          , 5];
          div_1 = document.createElement('div');
          el_1 = document.createElement('div');
          div_1.appendChild(el_1);
          document.body.appendChild(div_1);

          destry_1 = function destry_1() {
            if (approveInstance_1) {
              approveInstance_1.$destroy();

              if (div_1.parentNode) {
                div_1.parentNode.removeChild(div_1);
              }
            }
          };

          _render = function render(props) {
            return new Vue$1({
              el: el_1,
              render: function render(h) {
                return h(WorkflowApprove, {
                  attrs: {
                    options: props.options,
                    variables: props.variables,
                    visible: props.visible
                  },
                  on: {
                    "cancel": props.onCancel,
                    "selected": props.onSelected
                  }
                });
              }
            });
          };

          startConfig = {
            visible: true,
            // 表单变量
            variables: variables,
            options: {
              mode: 'select',
              title: opts.title,
              businessKey: opts.businessKey,
              nodeId: node.nodeId,
              procDefId: node.procDefId,
              // 发起人
              creatorCode: node.creatorCode,
              userCode: opts.userCode,
              bizTypeCode: opts.bizTypeCode,
              rgCode: opts.rgCode,
              unitCode: opts.unitCode,
              signType: opts.signType,
              signRequired: opts.signRequired
            },
            // 取消审核
            onCancel: function onCancel() {
              destry_1();

              if (opts.onCancel) {
                opts.onCancel();
              }
            },
            // 审核选择
            onSelected: function onSelected(selectResult) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  if (selectResult.error == 0) {
                    destry_1();
                  }

                  opts.onComplete(selectResult);
                  return [2
                  /*return*/
                  ];
                });
              });
            }
          };
          approveInstance_1 = _render(startConfig);
          return [2
          /*return*/
          ];

        case 5:
          return [4
          /*yield*/
          , startWorkflow({
            appCode: config.appCode,
            bizTypeCode: opts.bizTypeCode,
            businessKey: opts.businessKey,
            rgCode: opts.rgCode,
            unitCode: opts.unitCode,
            userCode: opts.userCode,
            // 发起人
            creatorCode: node.creatorCode,
            variables: variables
          })];

        case 6:
          data = _a.sent(); // 直接送审

          return [4
          /*yield*/
          , approveByTaskId(data.taskId, {
            action: "complete",
            message: '',
            variables: variables,
            deptCode: opts.deptCode
          })];

        case 7:
          // 直接送审
          _a.sent();

          ret.extra = {
            procInstId: data.id,
            businessKey: options.businessKey,
            procDefId: data.processDefinitionId,
            nodeId: data.nodeId,
            // 不审核第一节点，则返回第一节点的taskId
            taskId: data.taskId
          };
          _a.label = 8;

        case 8:
          return [3
          /*break*/
          , 11];

        case 9:
          return [4
          /*yield*/
          , startWorkflow({
            appCode: config.appCode,
            bizTypeCode: opts.bizTypeCode,
            businessKey: opts.businessKey,
            rgCode: opts.rgCode,
            unitCode: opts.unitCode,
            userCode: opts.userCode,
            variables: variables
          })];

        case 10:
          data = _a.sent();
          ret.extra = {
            procInstId: data.id,
            businessKey: options.businessKey,
            procDefId: data.processDefinitionId,
            nodeId: data.nodeId
          };
          _a.label = 11;

        case 11:
          return [3
          /*break*/
          , 13];

        case 12:
          e_1 = _a.sent();
          ret = getErrorInfo(e_1);
          return [3
          /*break*/
          , 13];

        case 13:
          // 完成
          if (opts.onComplete) {
            opts.onComplete(ret);
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 审批流程
 * @param options
 */

function approve(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, config_1, node, variables, isTextMessage, id, approveTask, extra, bizTitle, bizUrl, div_2, el_2, approveInstance_2, destry_2, _render2, approveConfig, e_2;

    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ret = {
            error: 0,
            message: ''
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 7,, 8]);

          if (!checkOr("workflow.approve", ['businessKey', 'taskId', 'procDefId', 'nodeId'], ['businessKey', 'menuId'], options)) {
            throw {
              code: 1,
              msg: '【缺少参数】businessKey, taskId, procDefId, nodeId或businessKey, menuId'
            };
          }

          return [4
          /*yield*/
          , getConfig(options)];

        case 2:
          config_1 = _a.sent();

          if (!config_1) {
            error("\u67E5\u8BE2\u5DE5\u4F5C\u6D41\u4FE1\u606F\u5931\u8D25");
            return [2
            /*return*/
            ];
          }

          return [4
          /*yield*/
          , getNodeInfo({
            procDefId: config_1.procDefId,
            nodeId: config_1.nodeId
          })];

        case 3:
          node = _a.sent();
          variables = [];

          if (options.variables) {
            variables = options.variables.map(function (v) {
              return __assign(__assign({}, v), {
                name: v.name.replace('$_', 'fvar_')
              });
            });
          }

          isTextMessage = options.isTextMessage === undefined || options.isTextMessage === true;
          if (!((!isTextMessage || node.isFirstUserTaskNode === '1') && node.isCheckUsers === '0')) return [3
          /*break*/
          , 5];
          id = options.taskId ? options.taskId : options.businessKey;
          approveTask = options.taskId ? approveByTaskId : approveByBusinessKey;

          if (!id) {
            throw {
              code: 1,
              msg: '【请求参数】缺少taskId或businessKey'
            };
          }

          extra = {};

          if (!options.taskId) {
            // 如果按businessKey来审核发，则需要有menuId
            extra = {
              menuId: options.menuId || ''
            };
          }

          bizTitle = '';
          bizUrl = '';

          if (options.bizExtra) {
            bizTitle = options.bizExtra.bizTitle || '';
            bizUrl = options.bizExtra.bizUrl || '';
          } // 直接送审


          return [4
          /*yield*/
          , approveTask(id, __assign({
            action: "complete",
            message: '',
            bizUrl: bizUrl,
            bizTitle: bizTitle,
            variables: variables,
            deptCode: options.deptCode || ''
          }, extra))];

        case 4:
          // 直接送审
          _a.sent(); // 送审完，回调


          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 6];

        case 5:
          div_2 = document.createElement('div');
          el_2 = document.createElement('div');
          div_2.appendChild(el_2);
          document.body.appendChild(div_2);

          destry_2 = function destry_2() {
            if (approveInstance_2) {
              approveInstance_2.$destroy();

              if (div_2.parentNode) {
                div_2.parentNode.removeChild(div_2);
              }
            }
          };

          _render2 = function render(props) {
            return new Vue$1({
              el: el_2,
              render: function render(h) {
                return h(WorkflowApprove, {
                  attrs: {
                    options: props.options,
                    visible: props.visible,
                    variables: props.variables
                  },
                  on: {
                    "cancel": props.onCancel,
                    "complete": props.onComplete
                  }
                });
              }
            });
          };

          approveConfig = {
            visible: true,
            options: options,
            variables: variables,
            // 取消审核
            onCancel: function onCancel() {
              destry_2();

              if (options.onCancel) {
                options.onCancel();
              }
            },
            // 审核
            onComplete: function onComplete(approveResult) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  if (approveResult.error == 0) {
                    destry_2();
                  }

                  if (options.onComplete) {
                    options.onComplete(approveResult);
                  }

                  return [2
                  /*return*/
                  ];
                });
              });
            }
          };
          approveInstance_2 = _render2(approveConfig);
          return [2
          /*return*/
          ];

        case 6:
          return [3
          /*break*/
          , 8];

        case 7:
          e_2 = _a.sent();
          ret = getErrorInfo(e_2);

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 8];

        case 8:
          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 委托/代办
 * @param options
 */

function delegate(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, div_3, el_3, instance_1, destry_3, _render3, config_2;

    var _this = this;

    return __generator(this, function (_a) {
      ret = {
        error: 0
      };

      try {
        if (!checkOr("workflow-delegate", ['taskId', 'unitCode'], ['businessKey', 'unitCode'], options)) {
          throw {
            code: 1,
            msg: 'taskId, unitCode或businessKey, unitCode'
          };
        }

        options.title = options.title || '代办';
        div_3 = document.createElement('div');
        el_3 = document.createElement('div');
        div_3.appendChild(el_3);
        document.body.appendChild(div_3);

        destry_3 = function destry_3() {
          if (instance_1) {
            instance_1.$destroy();

            if (div_3.parentNode) {
              div_3.parentNode.removeChild(div_3);
            }
          }
        };

        _render3 = function render(props) {
          return new Vue$1({
            el: el_3,
            render: function render(h) {
              return h(WorkflowDelegate, {
                attrs: {
                  action: "delegate",
                  options: props.options,
                  visible: props.visible
                },
                on: {
                  "cancel": props.onCancel,
                  "complete": props.onComplete
                }
              });
            }
          });
        };

        config_2 = {
          visible: true,
          options: options,
          // 取消审核
          onCancel: function onCancel() {
            destry_3();

            if (options.onCancel) {
              options.onCancel();
            }
          },
          // 审核
          onComplete: function onComplete(result) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                if (result.error == 0) {
                  destry_3();
                }

                if (options.onComplete) {
                  options.onComplete(result);
                }

                return [2
                /*return*/
                ];
              });
            });
          }
        };
        instance_1 = _render3(config_2);
      } catch (e) {
        ret = getErrorInfo(e);

        if (options.onComplete) {
          options.onComplete(ret);
        }
      }

      return [2
      /*return*/
      ];
    });
  });
}
/**
 * 转办
 * @param options
 */

function transfer(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, div_4, el_4, instance_2, destry_4, _render4, config_3;

    var _this = this;

    return __generator(this, function (_a) {
      ret = {
        error: 0
      };

      try {
        if (!checkOr("workflow-delegate", ['taskId', 'unitCode'], ['businessKey', 'unitCode'], options)) {
          throw {
            code: 1,
            msg: 'taskId, unitCode或businessKey, unitCode'
          };
        }

        options.title = options.title || '转办';
        div_4 = document.createElement('div');
        el_4 = document.createElement('div');
        div_4.appendChild(el_4);
        document.body.appendChild(div_4);

        destry_4 = function destry_4() {
          if (instance_2) {
            instance_2.$destroy();

            if (div_4.parentNode) {
              div_4.parentNode.removeChild(div_4);
            }
          }
        };

        _render4 = function render(props) {
          return new Vue$1({
            el: el_4,
            render: function render(h) {
              return h(WorkflowDelegate, {
                attrs: {
                  action: "transfer",
                  options: props.options,
                  visible: props.visible
                },
                on: {
                  "cancel": props.onCancel,
                  "complete": props.onComplete
                }
              });
            }
          });
        };

        config_3 = {
          visible: true,
          options: options,
          // 取消审核
          onCancel: function onCancel() {
            destry_4();

            if (options.onCancel) {
              options.onCancel();
            }
          },
          // 审核
          onComplete: function onComplete(result) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                if (result.error == 0) {
                  destry_4();
                }

                if (options.onComplete) {
                  options.onComplete(result);
                }

                return [2
                /*return*/
                ];
              });
            });
          }
        };
        instance_2 = _render4(config_3);
      } catch (e) {
        ret = getErrorInfo(e);

        if (options.onComplete) {
          options.onComplete(ret);
        }
      }

      return [2
      /*return*/
      ];
    });
  });
}
/**
 * 是否可撤销
 * @param options
 *        businessKey: 业务单据Id
 */

function canTaskRevoke(options) {
  return __awaiter(this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!check("canTaskRevoke", ['businessKey', 'taskId'], options)) {
            throw {
              code: 1,
              msg: '无效的options参数: 需要businessKey和taskId两个参数'
            };
          }

          return [4
          /*yield*/
          , canTaskRevokeByBusinessKey(options.businessKey, options.taskId)];

        case 1:
          data = _a.sent();
          return [2
          /*return*/
          , data && data.permitCancel === "1"];
      }
    });
  });
}
/**
 * 是否可驳回
 * @param options
 *        businessKey: 业务单据Id
 */
// export async function canTaskBack(options: Options): Promise<boolean> {
//   if (!utils.check("canTaskRevoke", ['businessKey'], options)) {
//     return false;
//   }
//   let data = await service.canTaskBackByBusinessKey(options.businessKey);
//   return data.permitBackTask === "1";
// }

/**
 * 撤销
 * @param options
 */

function revoke(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, bizTitle, bizUrl, variables, _a, nodes, _b, e_3;

    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          ret = {
            error: 0,
            message: '',
            extra: {}
          };
          _c.label = 1;

        case 1:
          _c.trys.push([1, 7,, 8]);

          if (!checkOr("revoke", ['businessKey'], ['procDefId', 'procInstId', 'nodeId'], options)) {
            throw {
              code: 1,
              msg: 'procDefId, procInstId, nodeId或businessKey'
            };
          }

          bizTitle = '';
          bizUrl = '';

          if (options.bizExtra) {
            bizTitle = options.bizExtra.bizTitle || '';
            bizUrl = options.bizExtra.bizUrl || '';
          }

          variables = (options.variables || []).map(function (v) {
            return __assign(__assign({}, v), {
              name: v.name.replace('$_', 'fvar_')
            });
          });
          if (!options.businessKey) return [3
          /*break*/
          , 3];
          _a = ret;
          return [4
          /*yield*/
          , cancelByBusinessKey(options.businessKey, {
            variables: variables,
            bizUrl: bizUrl,
            bizTitle: bizTitle
          })];

        case 2:
          _a.extra = _c.sent();
          return [3
          /*break*/
          , 6];

        case 3:
          return [4
          /*yield*/
          , getNodeCancelStartNodes({
            procDefId: options.procDefId,
            nodeId: options.nodeId,
            procInstId: options.procInstId
          })];

        case 4:
          nodes = _c.sent();
          if (!(nodes && nodes.length > 0)) return [3
          /*break*/
          , 6];
          _b = ret;
          return [4
          /*yield*/
          , cancel(options.procInstId, {
            variables: variables,
            bizUrl: bizUrl,
            bizTitle: bizTitle,
            // 要撤销的节点的id
            currentActivityIds: [nodes[0].nodeId],
            // 要退回到的节点id
            targetActivityIds: [options.nodeId]
          })];

        case 5:
          _b.extra = _c.sent();
          _c.label = 6;

        case 6:
          return [3
          /*break*/
          , 8];

        case 7:
          e_3 = _c.sent();
          ret = getErrorInfo(e_3);
          return [3
          /*break*/
          , 8];

        case 8:
          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 激活流程
 * @param options
 *        businessKey  单据Id
 *        onComplete   回调
 */

function activateWorkflow$1(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, data, e_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ret = {
            error: 0,
            message: ''
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 3,, 4]);

          if (!check("activateWorkflow", ['businessKey'], options)) {
            throw {
              code: 1,
              msg: '【缺少参数】 businessKey'
            };
          }

          return [4
          /*yield*/
          , activateWorkflow(options.businessKey)];

        case 2:
          data = _a.sent();
          ret.extra = {
            taskId: data.taskId
          };
          return [3
          /*break*/
          , 4];

        case 3:
          e_4 = _a.sent();
          ret = getErrorInfo(e_4);
          return [3
          /*break*/
          , 4];

        case 4:
          // 完成
          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 驳回
 */

function back$1(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, div_5, el_5, backInstance_1, destry_5, _render5, config_4;

    var _this = this;

    return __generator(this, function (_a) {
      console.log('workflow.back', options);
      ret = {
        error: 0,
        message: ''
      };

      try {
        if (!check("back", ['procInstId', 'procDefId', 'nodeId', 'taskId'], options)) {
          throw {
            code: 1,
            msg: '【缺少参数】procInstId, procDefId, nodeId, taskId'
          };
        }

        div_5 = document.createElement('div');
        el_5 = document.createElement('div');
        div_5.appendChild(el_5);
        document.body.appendChild(div_5);

        destry_5 = function destry_5() {
          if (backInstance_1) {
            backInstance_1.$destroy();

            if (div_5.parentNode) {
              div_5.parentNode.removeChild(div_5);
            }
          }
        };

        _render5 = function render(props) {
          return new Vue$1({
            el: el_5,
            render: function render(h) {
              return h(WorkflowReject, {
                attrs: {
                  options: props.options,
                  visible: props.visible
                },
                on: {
                  "cancel": props.onCancel,
                  "complete": props.onComplete
                }
              });
            }
          });
        };

        config_4 = {
          visible: true,
          options: options,
          // 取消审核
          onCancel: function onCancel() {
            destry_5();

            if (options.onCancel) {
              options.onCancel();
            }
          },
          // 审核
          onComplete: function onComplete(approveResult) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                if (approveResult.error == 0) {
                  destry_5();
                }

                if (options.onComplete) {
                  options.onComplete(approveResult);
                }

                return [2
                /*return*/
                ];
              });
            });
          }
        };
        backInstance_1 = _render5(config_4);
      } catch (e) {
        ret = getErrorInfo(e);

        if (options.onComplete) {
          options.onComplete(ret);
        }
      }

      return [2
      /*return*/
      ];
    });
  });
}
/**
 * 获取待办列表
 * @param options
 *        appCode	应用编码
 *        userCode	用户编码
 *        roleId	角色ID
 *        pageNum	页码
 *        pageSize	每页条数
 *        bizTypeCode	单据类型code
 */

function getWorkflowTasks(options) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , getTasks(options)];
    });
  });
}
/**
 * 批量送审
 * @param options 送审数据集合
{
  // 送审列表
  list: [ {
    taskId: 任务Id,
    businessKey: 单据Id,
    variables: [], 表单变量集合
  }],
    // 完成回调
    // 完成后的回调
    // ret
    //    error: 错误标记，0: 没有错误
    //                    1: 错误
    //    message: 错误消息
    onComplete: 完成回调
}
 */

function batchApprove$1(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, isTextMessage, signRequired, div_6, el_6, approveInstance_3, destry_6, _render6, approveConfig, taskIds, data, e_5;

    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log('workflow.batchApprove', options);
          ret = {
            error: 0,
            message: ''
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 5,, 6]);

          isTextMessage = options.isTextMessage === undefined || options.isTextMessage === true;
          signRequired = options.signType && options.signRequired === true;
          if (!(isTextMessage || signRequired)) return [3
          /*break*/
          , 2];
          div_6 = document.createElement('div');
          el_6 = document.createElement('div');
          div_6.appendChild(el_6);
          document.body.appendChild(div_6);

          destry_6 = function destry_6() {
            if (approveInstance_3) {
              approveInstance_3.$destroy();

              if (div_6.parentNode) {
                div_6.parentNode.removeChild(div_6);
              }
            }
          };

          _render6 = function render(props) {
            return new Vue$1({
              el: el_6,
              render: function render(h) {
                return h(WorkflowBatchApprove, {
                  attrs: {
                    options: props.options,
                    visible: props.visible
                  },
                  on: {
                    "cancel": props.onCancel,
                    "complete": props.onComplete
                  }
                });
              }
            });
          };

          approveConfig = {
            visible: true,
            options: options,
            // 取消审核
            onCancel: function onCancel() {
              destry_6();

              if (options.onCancel) {
                options.onCancel();
              }
            },
            // 审核
            onComplete: function onComplete(approveResult) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  if (approveResult.error == 0) {
                    destry_6();
                  }

                  if (options.onComplete) {
                    options.onComplete(approveResult);
                  }

                  return [2
                  /*return*/
                  ];
                });
              });
            }
          };
          approveInstance_3 = _render6(approveConfig);
          return [3
          /*break*/
          , 4];

        case 2:
          if (!options.list || options.list.length == 0) {
            throw {
              code: 1,
              msg: '请选择批量送审的单据'
            };
          }

          taskIds = options.list.map(function (task) {
            return task.taskId;
          });

          if (!taskIds || taskIds.length == 0) {
            throw {
              code: 1,
              msg: '请选择批量送审的单据'
            };
          }

          data = {
            userCode: config.userCode,
            signObject: null,
            message: '',
            taskFormRequests: options.list.map(function (task) {
              return {
                businessKey: task.businessKey,
                variables: task.variables
              };
            })
          };
          return [4
          /*yield*/
          , batchApprove(taskIds.join(','), data)];

        case 3:
          _a.sent(); // 回调


          if (options.onComplete) {
            options.onComplete(ret);
          }

          _a.label = 4;

        case 4:
          return [3
          /*break*/
          , 6];

        case 5:
          e_5 = _a.sent();
          ret = getErrorInfo(e_5);

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 6];

        case 6:
          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 直接送审
 * @param options
 */

function directApprove(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, res, isDirectTask, bizTitle, bizUrl, variables, e_6;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log('workflow.back', options);
          ret = {
            error: 0,
            message: ''
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 4,, 5]);

          if (!check("workflow.back", ['taskId'], options)) {
            throw {
              code: 1,
              msg: '【缺少参数】taskId'
            };
          }

          return [4
          /*yield*/
          , isTaskDirectApprove(options.taskId)];

        case 2:
          res = _a.sent();
          isDirectTask = res ? res.isBackTask === '1' : false;

          if (!isDirectTask) {
            throw {
              code: 1,
              msg: '当前任务不支持直接送审'
            };
          }

          bizTitle = '';
          bizUrl = '';

          if (options.bizExtra) {
            bizTitle = options.bizExtra.bizTitle || '';
            bizUrl = options.bizExtra.bizUrl || '';
          }

          variables = (options.variables || []).map(function (v) {
            return __assign(__assign({}, v), {
              name: v.name.replace('$_', 'fvar_')
            });
          }); // 按任务Id送审

          return [4
          /*yield*/
          , directApproveByTaskId(options.taskId, {
            bizTitle: bizTitle,
            bizUrl: bizUrl,
            variables: variables,
            userCode: config.userCode
          })];

        case 3:
          // 按任务Id送审
          _a.sent();

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 5];

        case 4:
          e_6 = _a.sent();
          ret = getErrorInfo(e_6);

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 5];

        case 5:
          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 挂起工作流
 * @param options
 */

function suspendWorkflow$1(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, e_7;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log('workflow.suspend', options);
          ret = {
            error: 0,
            message: ''
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 3,, 4]);

          if (!check("workflow.suspend", ['businessKey'], options)) {
            throw {
              code: 1,
              msg: '【缺少参数】businessKey'
            };
          }

          return [4
          /*yield*/
          , suspendWorkflow(options.businessKey)];

        case 2:
          _a.sent();

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 4];

        case 3:
          e_7 = _a.sent();
          ret = getErrorInfo(e_7);

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 4];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
}
function resumeWorkflow$1(options) {
  return __awaiter(this, void 0, void 0, function () {
    var ret, e_8;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log('workflow.resume', options);
          ret = {
            error: 0,
            message: ''
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 3,, 4]);

          if (!check("workflow.resume", ['businessKey'], options)) {
            throw {
              code: 1,
              msg: '【缺少参数】businessKey'
            };
          }

          return [4
          /*yield*/
          , resumeWorkflow(options.businessKey)];

        case 2:
          _a.sent();

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 4];

        case 3:
          e_8 = _a.sent();
          ret = getErrorInfo(e_8);

          if (options.onComplete) {
            options.onComplete(ret);
          }

          return [3
          /*break*/
          , 4];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
}
/**
 * 获取流程信息
 * @param req
 */

function getWorkflowInfo$1(businessKey) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , getWorkflowInfo(businessKey)];
    });
  });
}
/**
 * 获取流程签章数据
 * @param procInstId 流程实例Id
 */

function getSignData(procInstId) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , getSignList(procInstId)];
    });
  });
}
/**
 * 加载组件配置
 * /fbpm-modeler/config/components.json
 */

function getConfig$2() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , getConfig$1()];
    });
  });
}

function isWorkflowEnded$1(businessKey) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        return [2
        /*return*/
        , isWorkflowEnded(businessKey)];
      } catch (e) {
        return [2
        /*return*/
        , false];
      }

      return [2
      /*return*/
      ];
    });
  });
}
function isWorkflowStarted$1(businessKey) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        return [2
        /*return*/
        , isWorkflowStarted(businessKey)];
      } catch (e) {
        return [2
        /*return*/
        , false];
      }

      return [2
      /*return*/
      ];
    });
  });
}
/**
 * 是否支持直接送审
 * @param taskId
 */

function isTaskDirectApprove$1(taskId) {
  return __awaiter(this, void 0, void 0, function () {
    var res, e_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2,, 3]);

          return [4
          /*yield*/
          , isTaskDirectApprove(taskId)];

        case 1:
          res = _a.sent();
          return [2
          /*return*/
          , res ? res.isBackTask === '1' : false];

        case 2:
          e_1 = _a.sent();
          return [2
          /*return*/
          , false];

        case 3:
          return [2
          /*return*/
          ];
      }
    });
  });
}

/**
 * 默认选项参数
 */

var defaultOptions = {
  debug: false
};
/**
 * 配置工作流
 * @param options
 *       debug  （可选） 是否启用调试, 默认为false, 当启用时，在调试过程中会弹出错误提示
 *       authToken  （可选） 如果用户请求接口需要token
 *       userCode   （必填） 用户Code
 *       flowModelerBaseUrl   （必填） 流程模型Modeler地址
 *       flowProcessBaseUrl   （必填） 流程运行process地址
 *       appCode   （必填） 应用编码
 *       rgCode   （必填） 区划编码
 */

function setConfig(options) {
  console.log("config", options);

  var opts = __assign(__assign({}, defaultOptions), options);

  config.setDebug(opts.debug);

  if (!check("workflow.config", ['userCode', 'appCode', 'rgCode', 'flowModelerBaseUrl', 'flowProcessBaseUrl'], opts)) {
    return;
  }

  api.onError(function (url, e) {
    var m = e.message;

    if (e.code) {
      m = e.code + ":" + e.msg;
    }

    if (opts.debug) {
      m += " " + url + " ";
    }

    error(m);
  }); // if (opts.debug) {
  // }

  config.setBaseAddress(opts.flowModelerBaseUrl, opts.flowProcessBaseUrl);

  if (opts.userCode) {
    config.setUserCode(opts.userCode);
  }

  if (opts.appCode) {
    config.setAppCode(opts.appCode);
  }

  if (opts.rgCode) {
    config.setRegionCode(opts.rgCode);
  }

  if (opts.token) {
    config.setAuthToken(opts.token);
  } // 加载组件配置


  getConfig$2().then(function (data) {
    if (data) {
      //console.log("config", data);
      config.setData(data);
    }
  });
}

var defaultInstallOptions = {
  useAntd: true
};

function install(vue, options) {
  Vue$1.use(MintUI);

  var opts = __assign(__assign({}, defaultInstallOptions), options); // // 审批
  // vue.component('workflow-approve', WorkflowApprove);
  // // 驳回
  // vue.component('workflow-reject', WorkflowReject);
  // // 已废弃
  // vue.component('workflow-flow', WorkflowTraceSimple);
  // 流程跟踪
  // 简版
  // vue.component('workflow-trace-simple', WorkflowTraceSimple);
  // 全流程


  vue.component('workflow-trace-full', WorkflowTraceFull); // 基于表单
  //vue.component('workflow-trace-form', WorkflowTraceForm);
  // 跟踪列表

  vue.component('workflow-trace-list', WorkflowTraceList);
  vue.component('workflow-task-center', TaskCenter); // 流程图
  //vue.component('workflow-trace-flowchart', WorkflowTraceFlowchart);
}

var workflow = {
  install: install,

  /**
   * @param options
   *      debug  （可选） 是否启用调试, 默认为false, 当启用时，在调试过程中会弹出错误提示
  *       authToken  （可选） 如果用户请求接口需要token
  *       userCode   （必填） 用户Code
  *       flowModelerBaseUrl   （必填） 流程模型Modeler地址
  *       flowProcessBaseUrl   （必填） 流程运行process地址
  *       appCode   （必填） 应用编码
  *       rgCode   （必填） 区划编码
   */
  config: setConfig,

  /**
   * 启动流程
   */
  start: startWorkflow$1,

  /**
   * 审批
   * @param options {object}
   *  {
          taskId: 任务id,
          procDefId:流程定义id,
          nodeId: 节点id
          businessKey: 单据id
            businessKey: 单据id, 当有单据Id时，taskId,procDefId和nodeId可不传, 这时组件会根据businessKey查出所需的taskId, procdefId和nodeId
            // 可修改弹窗文本
          title: 标题文本
            // 网关分支扩展变量
          // 数组, 可以放多个变量
          // object结构
          //  {
          //       type: 类型 string,integer,long,short,double,boolean,date,json
          //       name: 变量名,
          //       value: 值，根据type不同，值不同
          //  }
          // 如: [ { type: "integer", name: "money", value:  100 }]
          variables: 表单变量集合
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
      }
   */
  approve: approve,

  /**
   * 代办
   * @param  options {object}
   *      taskId: 任务id,
          businessKey: 单据id, 当有单据Id时，taskId不传, 这时组件会根据businessKey查出所需的taskId
            unitCode:单位Code, 在创建流程模型时所选,
            // 可修改弹窗文本
          title: 标题文本
            isTextMessage: true | false 是否显示意见框, 默认为显示
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
   */
  delegate: delegate,

  /**
   * 转办
  * @param  options {object}
   *      taskId: 任务id,
          businessKey: 单据id, 当有单据Id时，taskId不传, 这时组件会根据businessKey查出所需的taskId
            unitCode:单位Code, 在创建流程模型时所选,
            // 可修改弹窗文本
          title: 标题文本
            isTextMessage: true | false 是否显示意见框, 默认为显示
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
   */
  transfer: transfer,

  /**
   * 撤销
   *
   * @param  options {object}
   *      taskId: 任务id,
          procDefId:流程定义id,
          nodeId: 节点id
            businessKey: 单据id, 当有单据Id时，taskId,procDefId和nodeId可不传, 这时组件会根据businessKey查出所需的taskId, procdefId和nodeId
            // 可修改弹窗文本
          title: 标题文本
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
   */
  cancel: revoke,

  /**
   * 激活
   */
  activate: activateWorkflow$1,

  /**
   * 驳回
   * @param  opiotns {object}
   *      {
              taskId: 任务id,
              procDefId:流程定义id,
              nodeId: 节点id
                businessKey: 单据id, 当有单据Id时，taskId,procDefId和nodeId可不传, 这时组件会根据businessKey查出所需的taskId, procdefId和nodeId
                // 可修改弹窗文本
              title: 标题文本
                // 完成回调
              // 完成后的回调
              // ret
              //    error: 错误标记，0: 没有错误
              //                    1: 错误
              //    message: 错误消息
              onComplete: 完成回调,
              onCancel: 取消回调
      }
   */
  back: back$1,

  /**
   * 批量送审
   * @param options 送审数据集合
      {
      // 送审列表
      list: [ {
          taskId: 任务Id,
          businessKey: 单据Id,
          variables: [], 表单变量集合
      }],
          // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调
      }
   */
  batchApprove: batchApprove$1,

  /**
   * 挂起流程
   * @param options
   *        businessKey 单据Id
   */
  suspend: suspendWorkflow$1,

  /**
   * 恢复挂起的流程
   * @param options
   *        businessKey 单据Id
   */
  resume: resumeWorkflow$1,

  /**
   * 直接送审
   */
  directApprove: directApprove,

  /**
   * 校验器
   */
  validator: {
    canTaskCancel: canTaskRevoke,
    isWorkflowStarted: isWorkflowStarted$1,
    isWorkflowEnded: isWorkflowEnded$1,
    isTaskDirectApprove: isTaskDirectApprove$1
  },
  getWorkflowInfo: getWorkflowInfo$1,

  /**
   * 获取流程签章数据
   * @param procInstId 流程实例Id
   */
  getSignData: getSignData
};

// const NoDataImage = require('../../assets/images/nodata.png');

var TodoContainer =
/** @class */
function (_super) {
  __extends(TodoContainer, _super);

  function TodoContainer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.todoTaskList = [];
    _this.isEmpty = false;
    _this.loading = false;
    _this.show = false;
    _this.showDown = false;
    _this.downMsg = '';
    _this.searchText = '';
    _this.page = 1;
    return _this;
  }

  TodoContainer.prototype.openUrl = function (url, businessKey, type) {
    return __awaiter(this, void 0, void 0, function () {
      var arg, res, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            arg = parseQueryString(url);
            if (!(arg.interfaceType && arg.interfaceType == 1)) return [3
            /*break*/
            , 5];
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , advanceAsk(url, {
              "appType": "mobile",
              "businessKey": businessKey,
              "urlType": type
            })];

          case 2:
            res = _a.sent();
            this.$router.push({
              path: res.url,
              query: {
                urlType: type,
                bizTypeCode: res.bizTypeCode,
                appCode: res.appCode,
                procInstId: res.procInstId,
                procDefId: res.procDefId,
                businessKey: res.businessKey,
                nodeId: res.nodeId,
                taskId: res.taskId
              }
            });
            return [3
            /*break*/
            , 4];

          case 3:
            e_1 = _a.sent();
            return [3
            /*break*/
            , 4];

          case 4:
            return [3
            /*break*/
            , 6];

          case 5:
            try {
              this.$router.push({
                path: url
              });
            } catch (e) {}

            _a.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  TodoContainer.prototype.mounted = function () {
    var _this = this;

    this.loading = true;
    this.getTaskTodoList();
    var scroll = new BScroll(this.$refs.taskContainer, {
      scrollY: true,
      click: true,
      bounce: {
        top: true,
        bottom: true
      },
      pullDownRefresh: {
        threshold: 30,
        stop: 20,
        fade: true
      },
      pullUpLoad: {
        threshold: -50
      }
    }); // 下拉刷新

    scroll.on('pullingDown', function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.page = 1;
          this.loading = true; // this.todoTaskList = [];

          this.getTaskTodoList();
          scroll.finishPullDown();
          scroll.refresh();
          return [2
          /*return*/
          ];
        });
      });
    });
    scroll.on('pullingUp', function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.page = this.page + 1;
          this.getTaskTodoList('upload');
          this.showDown = false;
          scroll.finishPullUp();
          return [2
          /*return*/
          ];
        });
      });
    });
    scroll.on('scroll', function (pos) {
      if (document.body.clientHeight - pos.y - _this.$refs.pageContainer.clientHeight > 50) {
        _this.showDown = true;
      } // if (-document.body.clientHeight - (pos.y - 119) > 10) {
      // }

    });
  };

  TodoContainer.prototype.onSearch = function (v) {
    this.loading = true;
    this.searchText = v;
    this.getTaskTodoList();
  };

  TodoContainer.prototype.getTaskTodoList = function (upload) {
    return __awaiter(this, void 0, void 0, function () {
      var taskTodoList;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , getTaskTodoList({
              page: this.page,
              rows: this.rows,
              userCode: this.userCode,
              roleId: this.roleId,
              name: this.searchText
            })];

          case 1:
            taskTodoList = _b.sent();

            if (upload === 'upload') {
              (_a = this.todoTaskList).push.apply(_a, matchColor(taskTodoList.rows));
            } else {
              this.todoTaskList = matchColor(taskTodoList.rows);
            }

            this.isEmpty = taskTodoList.rows.length > 0 ? false : true;
            this.loading = false;
            this.showDown = false;
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  TodoContainer.prototype.render = function (h) {
    var _this = this;

    return h("div", [h("w-search", {
      attrs: {
        value: "haha"
      },
      on: {
        "search": function search(key) {
          return _this.onSearch(key);
        }
      }
    }), !this.isEmpty && h("div", {
      "class": "workflow-page-infinite-list",
      ref: "taskContainer"
    }, [h("div", {
      ref: "pageContainer"
    }, [h("mt-tab-container", {
      "class": "page-container",
      attrs: {
        value: "1"
      }
    }, [h("mt-tab-container-item", {
      attrs: {
        id: "1"
      }
    }, [this.todoTaskList.map(function (val) {
      return h("div", {
        "class": "workflow-task-content",
        on: {
          "click": function click() {
            _this.openUrl(val.url, val.businessKey, 'todo');
          }
        }
      }, [h("div", {
        "class": "workflow-task-tit"
      }, [h("span", {
        "class": "workflow-task-bizTypeName",
        style: {
          color: val.textColor,
          backgroundColor: val.bgColor
        }
      }, [val.bizTypeName]), h("span", {
        "class": "workflow-task-code"
      }, [val.field1]), h("span", {
        "class": "workflow-task-time"
      }, [moment(val.taskCreateTime, 'YYYY-MM-DD HH:mm:ss.S').format("YYYY-MM-DD HH:mm")])]), h("div", {
        "class": "workflow-task-middle"
      }, [h("span", {
        "class": "workflow-task-peoples"
      }, [val.field2]), h("span", {
        "class": "workflow-task-departmentApprove"
      }, [val.nodeName])]), h("div", {
        "class": "workflow-task-bottom"
      }, [h("span", {
        "class": "workflow-task-department"
      }, [val.field3]), h("span", {
        "class": "workflow-task-price"
      }, [val.field4])]), h("div", {
        "class": "workflow-task-reason"
      }, [h("span", [val.field5])]), h("div", {
        "class": "workflow-operation"
      }, [h("mt-button", {
        "class": "workflow-argeen",
        attrs: {
          size: "normal",
          type: "primary",
          plain: true
        },
        on: {
          "click": function click(e) {
            return _this.approve(e, val);
          }
        }
      }, ["\u540C\u610F"]), h("mt-button", {
        "class": "workflow-reject",
        attrs: {
          size: "normal",
          plain: true
        },
        on: {
          "click": function click(e) {
            return _this.back(e, val);
          }
        }
      }, ["\u9A73\u56DE"])])]);
    }), h("p", [this.showDown && h("div", {
      "class": "before-trigger"
    }, [h("span", ["\u52A0\u8F7D\u4E2D"]), " \xA0\xA0 ", h("i", {
      "class": "workflow-loading"
    })])])])])])]), this.isEmpty && h("div", {
      "class": "workflow-noInfo"
    }, [h("w-empty")]), this.loading && h("p", {
      "class": "workflow-page-infinite-loading"
    }, [h("mt-spinner", {
      attrs: {
        type: "fading-circle"
      }
    }), "\u52A0\u8F7D\u4E2D..."])]);
  };

  TodoContainer.prototype.approve = function (e, record) {
    return __awaiter(this, void 0, void 0, function () {
      var variables, data, options;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.stopPropagation();
            return [4
            /*yield*/
            , getCenterTaskVariables({
              procInstId: record.procInstId
            })];

          case 1:
            variables = _a.sent();
            data = {
              businessKey: record.businessKey,
              procDefId: record.procDefId || '',
              nodeId: record.nodeId || '',
              taskId: record.taskId || ''
            };
            options = __assign(__assign({
              title: '审批'
            }, data), {
              variables: variables,
              deptCode: '',
              signType: 'ca',
              bizExtra: {
                bizTitle: record.title || '',
                bizUrl: record.url || ''
              },
              onComplete: function onComplete(ret) {
                if (ret.error) {
                  Toast(ret.message);
                  return;
                }

                _this.getTaskTodoList();
              },
              onCancel: function onCancel() {// do nothing
              }
            });
            workflow.approve(options);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  TodoContainer.prototype.back = function (e, record) {
    return __awaiter(this, void 0, void 0, function () {
      var variables, data, options;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.stopPropagation();
            return [4
            /*yield*/
            , getCenterTaskVariables({
              procInstId: record.procInstId
            })];

          case 1:
            variables = _a.sent();
            data = {
              procInstId: record.procInstId || '',
              procDefId: record.procDefId || '',
              nodeId: record.nodeId || '',
              taskId: record.taskId || '',
              bizExtra: {
                bizTitle: record.title || '',
                bizUrl: record.url || ''
              },
              variables: variables
            };
            options = __assign(__assign({
              title: '收回'
            }, data), {
              onComplete: function onComplete(ret) {
                console.log("back complete", ret);

                if (ret.error) {
                  Toast(ret.message);
                  return;
                }

                _this.getTaskTodoList();
              },
              onCancel: function onCancel() {// do nothing
              }
            });
            workflow.back(options);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  __decorate([Prop({
    default: 5
  })], TodoContainer.prototype, "rows", void 0);

  __decorate([Prop({
    default: ''
  })], TodoContainer.prototype, "userCode", void 0);

  __decorate([Prop({
    default: ''
  })], TodoContainer.prototype, "roleId", void 0);

  __decorate([Prop({
    default: ''
  })], TodoContainer.prototype, "name", void 0);

  TodoContainer = __decorate([Component({
    components: {
      'w-search': Search,
      'w-empty': Empty
    }
  })], TodoContainer);
  return TodoContainer;
}(Vue);

var Nav =
/** @class */
function (_super) {
  __extends(Nav, _super);

  function Nav() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Nav.prototype.change = function (val) {
    EventBus.$emit('changeSelected', val);
  };

  Nav.prototype.render = function (h) {
    return h("div", {
      "class": "workflow-nav-container-wrapper"
    }, [h("mt-navbar", {
      "class": "nav-bar-container",
      attrs: {
        value: this.selected
      },
      on: {
        "input": this.change
      }
    }, [this.navLabels.map(function (val) {
      return h("mt-tab-item", {
        key: val.id,
        attrs: {
          id: val.id
        }
      }, [val.label]);
    })])]);
  };

  __decorate([Prop({
    default: []
  })], Nav.prototype, "navLabels", void 0);

  __decorate([Prop({
    default: '1'
  })], Nav.prototype, "selected", void 0);

  __decorate([Emit('change')], Nav.prototype, "change", null);

  Nav = __decorate([Component({
    components: {}
  })], Nav);
  return Nav;
}(Vue);

var TaskHeader =
/** @class */
function (_super) {
  __extends(TaskHeader, _super);

  function TaskHeader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  TaskHeader.prototype.back = function () {//this.$router.push({ path: this.backNodePath});
  };

  TaskHeader.prototype.render = function (h) {
    return h("mt-header", {
      attrs: {
        title: this.headerTit,
        isLink: true
      }
    }, [h("mt-button", {
      slot: "left",
      attrs: {
        icon: "back"
      },
      on: {
        "click": this.back
      }
    }, ["\u8FD4\u56DE"])]);
  };

  __decorate([Prop({
    default: ''
  })], TaskHeader.prototype, "headerTit", void 0);

  __decorate([Prop({
    default: ''
  })], TaskHeader.prototype, "backNodePath", void 0);

  __decorate([Emit('back')], TaskHeader.prototype, "back", null);

  TaskHeader = __decorate([Component({
    components: {}
  })], TaskHeader);
  return TaskHeader;
}(Vue);

var NoDataImage = require('../../assets/images/nodata.png');

Vue.component('w-todo-container', TodoContainer);
Vue.component('w-done-container', DoneContainer);
Vue.component('w-nav', Nav);
Vue.component('w-header', TaskHeader);
var TaskCenterLabels = [{
  id: '1',
  label: '待办'
}, {
  id: '2',
  label: '已办'
}];

var TaskCenter =
/** @class */
function (_super) {
  __extends(TaskCenter, _super);

  function TaskCenter() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.isEmpty = false;
    _this.screenVisible = false;
    _this.loading = false;
    _this.headerTit = '任务中心';
    _this.navLabels = TaskCenterLabels;
    _this.selected = '1';
    _this.backNodePath = '';
    _this.rows = 5;
    _this.page = 1;
    _this.name = '';
    _this.todoTaskList = [];
    _this.doneTaskList = [];
    _this.searchText = '';
    _this.userCode = '';
    _this.roleId = '';
    return _this;
  }

  TaskCenter.prototype.back = function () {};

  TaskCenter.prototype.mounted = function () {
    return __awaiter(this, void 0, void 0, function () {
      var commonData, commonDataObj;

      var _this = this;

      return __generator(this, function (_a) {
        commonData = localStorage.getItem("commonData");

        if (commonData != null) {
          try {
            commonDataObj = JSON.parse(commonData);
            this.userCode = decodeBase64(commonDataObj['svUserCode']);
            this.roleId = decodeBase64(commonDataObj['svRoleId']);
          } catch (e) {}
        }

        EventBus.$on('changeSelected', function (value) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              this.selected = value;
              return [2
              /*return*/
              ];
            });
          });
        });
        return [2
        /*return*/
        ];
      });
    });
  };

  TaskCenter.prototype.render = function (h) {
    return h("div", {
      "class": "workflow workflow-taskcenter"
    }, [h("w-header", {
      attrs: {
        headerTit: this.headerTit,
        backNodePath: this.backNodePath
      },
      on: {
        "back": this.back
      }
    }), h("w-nav", {
      attrs: {
        selected: this.selected,
        navLabels: this.navLabels
      }
    }), h("div", [this.selected == '1' && h("div", [h("w-todo-container", {
      attrs: {
        todoTaskList: this.todoTaskList,
        page: this.page,
        rows: this.rows,
        userCode: this.userCode,
        roleId: this.roleId,
        name: this.searchText
      }
    })]), this.selected == '2' && h("div", [h("w-done-container", {
      attrs: {
        doneTaskList: this.doneTaskList,
        page: this.page,
        rows: this.rows,
        userCode: this.userCode,
        roleId: this.roleId,
        name: this.searchText
      }
    })])])]);
  };

  __decorate([Emit('back')], TaskCenter.prototype, "back", null);

  TaskCenter = __decorate([Component], TaskCenter);
  return TaskCenter;
}(Vue);

/**
 * 默认选项参数
 */

var defaultOptions$1 = {
  debug: false
};
/**
 * 配置工作流
 * @param options
 *       debug  （可选） 是否启用调试, 默认为false, 当启用时，在调试过程中会弹出错误提示
 *       authToken  （可选） 如果用户请求接口需要token
 *       userCode   （必填） 用户Code
 *       flowModelerBaseUrl   （必填） 流程模型Modeler地址
 *       flowProcessBaseUrl   （必填） 流程运行process地址
 *       appCode   （必填） 应用编码
 *       rgCode   （必填） 区划编码
 */

function setConfig$1(options) {
  console.log("config", options);

  var opts = __assign(__assign({}, defaultOptions$1), options);

  config.setDebug(opts.debug);

  if (!check("workflow.config", ['userCode', 'appCode', 'rgCode', 'flowModelerBaseUrl', 'flowProcessBaseUrl'], opts)) {
    return;
  }

  api.onError(function (url, e) {
    var m = e.message;

    if (e.code) {
      m = e.code + ":" + e.msg;
    }

    if (opts.debug) {
      m += " " + url + " ";
    }

    error(m);
  }); // if (opts.debug) {
  // }

  config.setBaseAddress(opts.flowModelerBaseUrl, opts.flowProcessBaseUrl);

  if (opts.userCode) {
    config.setUserCode(opts.userCode);
  }

  if (opts.appCode) {
    config.setAppCode(opts.appCode);
  }

  if (opts.rgCode) {
    config.setRegionCode(opts.rgCode);
  }

  if (opts.token) {
    config.setAuthToken(opts.token);
  } // 加载组件配置


  getConfig$2().then(function (data) {
    if (data) {
      //console.log("config", data);
      config.setData(data);
    }
  });
}

var defaultInstallOptions$1 = {
  useAntd: true
};

function install$1(vue, options) {
  Vue$1.use(MintUI);

  var opts = __assign(__assign({}, defaultInstallOptions$1), options); // // 审批
  // vue.component('workflow-approve', WorkflowApprove);
  // // 驳回
  // vue.component('workflow-reject', WorkflowReject);
  // // 已废弃
  // vue.component('workflow-flow', WorkflowTraceSimple);
  // 流程跟踪
  // 简版
  // vue.component('workflow-trace-simple', WorkflowTraceSimple);
  // 全流程


  vue.component('workflow-trace-full', WorkflowTraceFull); // 基于表单
  //vue.component('workflow-trace-form', WorkflowTraceForm);
  // 跟踪列表

  vue.component('workflow-trace-list', WorkflowTraceList);
  vue.component('workflow-task-center', TaskCenter); // 流程图
  //vue.component('workflow-trace-flowchart', WorkflowTraceFlowchart);
}

var index = {
  install: install$1,

  /**
   * @param options
   *      debug  （可选） 是否启用调试, 默认为false, 当启用时，在调试过程中会弹出错误提示
  *       authToken  （可选） 如果用户请求接口需要token
  *       userCode   （必填） 用户Code
  *       flowModelerBaseUrl   （必填） 流程模型Modeler地址
  *       flowProcessBaseUrl   （必填） 流程运行process地址
  *       appCode   （必填） 应用编码
  *       rgCode   （必填） 区划编码
   */
  config: setConfig$1,

  /**
   * 启动流程
   */
  start: startWorkflow$1,

  /**
   * 审批
   * @param options {object}
   *  {
          taskId: 任务id,
          procDefId:流程定义id,
          nodeId: 节点id
          businessKey: 单据id
            businessKey: 单据id, 当有单据Id时，taskId,procDefId和nodeId可不传, 这时组件会根据businessKey查出所需的taskId, procdefId和nodeId
            // 可修改弹窗文本
          title: 标题文本
            // 网关分支扩展变量
          // 数组, 可以放多个变量
          // object结构
          //  {
          //       type: 类型 string,integer,long,short,double,boolean,date,json
          //       name: 变量名,
          //       value: 值，根据type不同，值不同
          //  }
          // 如: [ { type: "integer", name: "money", value:  100 }]
          variables: 表单变量集合
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
      }
   */
  approve: approve,

  /**
   * 代办
   * @param  options {object}
   *      taskId: 任务id,
          businessKey: 单据id, 当有单据Id时，taskId不传, 这时组件会根据businessKey查出所需的taskId
            unitCode:单位Code, 在创建流程模型时所选,
            // 可修改弹窗文本
          title: 标题文本
            isTextMessage: true | false 是否显示意见框, 默认为显示
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
   */
  delegate: delegate,

  /**
   * 转办
  * @param  options {object}
   *      taskId: 任务id,
          businessKey: 单据id, 当有单据Id时，taskId不传, 这时组件会根据businessKey查出所需的taskId
            unitCode:单位Code, 在创建流程模型时所选,
            // 可修改弹窗文本
          title: 标题文本
            isTextMessage: true | false 是否显示意见框, 默认为显示
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
   */
  transfer: transfer,

  /**
   * 撤销
   *
   * @param  options {object}
   *      taskId: 任务id,
          procDefId:流程定义id,
          nodeId: 节点id
            businessKey: 单据id, 当有单据Id时，taskId,procDefId和nodeId可不传, 这时组件会根据businessKey查出所需的taskId, procdefId和nodeId
            // 可修改弹窗文本
          title: 标题文本
            // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调,
          onCancel: 取消回调
   */
  cancel: revoke,

  /**
   * 激活
   */
  activate: activateWorkflow$1,

  /**
   * 驳回
   * @param  opiotns {object}
   *      {
              taskId: 任务id,
              procDefId:流程定义id,
              nodeId: 节点id
                businessKey: 单据id, 当有单据Id时，taskId,procDefId和nodeId可不传, 这时组件会根据businessKey查出所需的taskId, procdefId和nodeId
                // 可修改弹窗文本
              title: 标题文本
                // 完成回调
              // 完成后的回调
              // ret
              //    error: 错误标记，0: 没有错误
              //                    1: 错误
              //    message: 错误消息
              onComplete: 完成回调,
              onCancel: 取消回调
      }
   */
  back: back$1,

  /**
   * 批量送审
   * @param options 送审数据集合
      {
      // 送审列表
      list: [ {
          taskId: 任务Id,
          businessKey: 单据Id,
          variables: [], 表单变量集合
      }],
          // 完成回调
          // 完成后的回调
          // ret
          //    error: 错误标记，0: 没有错误
          //                    1: 错误
          //    message: 错误消息
          onComplete: 完成回调
      }
   */
  batchApprove: batchApprove$1,

  /**
   * 挂起流程
   * @param options
   *        businessKey 单据Id
   */
  suspend: suspendWorkflow$1,

  /**
   * 恢复挂起的流程
   * @param options
   *        businessKey 单据Id
   */
  resume: resumeWorkflow$1,

  /**
   * 直接送审
   */
  directApprove: directApprove,

  /**
   * 校验器
   */
  validator: {
    canTaskCancel: canTaskRevoke,
    isWorkflowStarted: isWorkflowStarted$1,
    isWorkflowEnded: isWorkflowEnded$1,
    isTaskDirectApprove: isTaskDirectApprove$1
  },
  getWorkflowInfo: getWorkflowInfo$1,

  /**
   * 获取流程签章数据
   * @param procInstId 流程实例Id
   */
  getSignData: getSignData
};

export default index;
export { ApproveFlows, FbpmStatus, TaskState, WorkflowApprove, WorkflowReject, activateWorkflow$1 as activateWorkflow, approve, back$1 as back, batchApprove$1 as batchApprove, canTaskRevoke, delegate, directApprove, getConfig$2 as getConfig, getSignData, getWorkflowInfo$1 as getWorkflowInfo, getWorkflowTasks, resumeWorkflow$1 as resumeWorkflow, revoke, startWorkflow$1 as startWorkflow, suspendWorkflow$1 as suspendWorkflow, transfer };
//# sourceMappingURL=index.js.map
