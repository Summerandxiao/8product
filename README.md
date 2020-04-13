# caiwu
## 公共组件  
### 1. dateRange 
路径：src/compoments/dateRange  
应用场景：筛选时间  
传入参数:

| 参数  | title | reset | count | default | readonly | datestr |
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| type | String |Boolean | Number | String |Boolean | String |
| description | 时间选择组件的label | 是否重置选项 | 需要使用的时间个数 | 默认值 | 是否只读 | 1个时间时的返回值 | 

emit事件：changeTime（时间改变时触发）
### 2. checkBox   
路径：src/compoments/checkBox  
应用场景：筛选条件  
传入参数:

| 参数  | title | list | className |
|:----:|:----:|:----:|:----:|
| type | String | Array |String |
| description | 时间选择组件的label | 遍历的数组 | 筛选项对应的样式名 |

### 3. 报销单详情相关的组件
* 主要数据和监听对象：reimburseTmpInfo（模版信息）、reimburseBillInfo（已经渲染的数据）  

#### 3.1 baseInfo（基本信息）

应用场景：加载并显示基本信息的信息项  
模版获取方式：从reimburseTmpInfo中取key=reimburseTmpInfo.area.BASE.areaCode的数据作为信息项列表  
数据渲染：监听reimburseBillInfo，判断reimburseBillInfo是否为空  
提交信息对应字段：arBill  

#### 3.2 结算方式

应用场景：加载并显示结算信息的信息项  
显示形式： 排列显示，不累加  
模版获取方式：从reimburseTmpInfo.setType中取数据作为信息项列表  
数据渲染：监听reimburseBillInfo，判断reimburseBillInfo是否为空
提交信息对应字段：settlementList

#### 3.3 关联单据

应用场景：加载并显示关联单据的信息项  
模版获取方式：从reimburseTmpInfo.areaLeft中取areaType === 'RELATION'数据作为信息项列表  
数据渲染：监听reimburseBillInfo，判断reimburseBillInfo是否为空
提交信息对应字段：根据billList判断对应的单据名称

#### 3.4 预算指标

应用场景：加载并显示预算指标的信息项  
模版获取方式：从reimburseTmpInfo.areaLeft中取areaType === 'BUDGET'数据作为信息项列表  
数据渲染：监听reimburseBillInfo，判断reimburseBillInfo是否为空
提交信息对应字段：arBillBalanceList

#### 3.5 费用明细

应用场景：加载并显示费用明细的信息项  
模版获取方式：从reimburseTmpInfo.expType中取'数据作为信息项列表  
数据渲染：监听reimburseBillInfo，判断reimburseBillInfo是否为空
提交信息对应字段：expenseList,数组中明细类型可能不同

#### 3.6 文件列表

应用场景：加载并显示费用明细的信息项  
模版获取方式：从reimburseTmpInfo.fileTypeInfo中取'数据作为信息项列表  
数据渲染：监听reimburseBillInfo，判断reimburseBillInfo是否为空
提交信息对应字段：fileList


### 4.工作流相关内容
制单岗提交 -> 审核岗同意 (撤回)
提交之后可以查看流程跟踪/撤回


### 模版数据中的info接口dataType字段说明
 * 数据格式：
 *  01文本；
 * * 02富文本框；
 * * 03数字；
 * * 04整数；
 * * 05天数；只能.5
 * * 06时间；
 * * 08 日期:附件；
 * * 09大文本；
 * * 10公式；
 * * 12 下拉框;
 * * 14多值多栏引用；
 * * 15下拉列表；
 * * 18单选框；
 * * 19 平铺下拉：地点；
 * * 20超链接；
 * * 22 下拉树;选出差人
 * * 23密码框；
 * * 25多选引用； 

### getFunc获取关联项接口字段说明
* day：天数 
  * isAuto：天数是否自动计算：N：否，Y：是    默认值Y
  * ctrlType：天数控制方式： 0不提醒 2提醒 1禁止     默认值0
  * addOrSub：天数计算方式，自然日：1：加；0：减；默认值1
  * dayNo：天数计算：0：0天；0.5：0.5天；1：1天；2：2天，默认值0

* money：金额
  * isAuto：金额是否自动计算: N：否，Y：是
  * ctrlType：金额控制方式： 0 不提醒 2提醒 1禁止
  * standard：金额公式：  
    1：天数*标准；  
    2：人数*标准；
    3：人数*天数*标准；  
    4：人数*天数*标准*汇率；默认值0

* std：是否有标准Y：有，N：无标准
