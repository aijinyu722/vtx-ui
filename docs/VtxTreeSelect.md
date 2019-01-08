### VtxTreeSelect文档


| **参数**                | **说明**| **类型**   | **默认值**    |
|--------------|-----------------------|-----------------------|-------------------------|
| data                    | VtxTreeSelect展示的具体数据                                                                                                                                                                                                                                                          | Array/[{},{}]                                                                                                                                             | \*                                   |
| required                | 是否有非空校验                                                                                                                                                                                                                                                                       | Boolean                                                                                                                                                   |                                      |
| disabled                | 控制下拉树是否可以使用                                                                                                                                                                                                                                                               | Boolean                                                                                                                                                   | False                                |
| treeCheckable           | 是否有复选框                                                                                                                                                                                                                                                                         | Boolean                                                                                                                                                   | False                                |
| multiple                | 是否可以复选(在没有复选框下的多选)                                                                                                                                                                                                                                                   | Boolean                                                                                                                                                   | False                                |
| treeDefaultExpandAll    | 默认下拉树全部展开(初始化时有用,后续改变没有效果)                                                                                                                                                                                                                                    | Boolean                                                                                                                                                   | False                                |
| treeDefaultExpandedKeys | 默认下拉树展开部分(初始化时有用,后续改变没有效果)                                                                                                                                                                                                                                    | String[]                                                                                                                                                  | \--                                  |
| value                   | onChange函数返回的value,用于展示选择的选项<br/>不传:组件默认控制,传入值后:就手动控制(这边的value 等于 data中传入的key,可以用于后面的判断取值)                                                                                                                                             | Array[String] <br/>例:[' value', value]                                                                                                                                            | \--                                  |
| style                   | 下拉树,选择框的样式                                                                                                                                                                                                                                                                  | Object <br/>例:{height:30}                                                                                                                                     | { width: 300 }                       |
| dropdownStyle           | 下拉树,下拉框的样式                                                                                                                                                                                                                                                                  | Object <br/>例:{height:30}                                                                                                                                     | { maxHeight: 400, overflow: 'auto' } |
| showSearch              | 显示下拉树搜索框,  <br/>  注:在multiple \|\| treeCheckable为true时,showSearch失效 | Boolean                                                                                                                                                   | False                                |
| placeholder             | 选择框默认文字                                                                                                                                                                                                                                                                       | String                                                                                                                                                    | \--                                  |
| searchPlaceholder       | 下拉搜索框默认文字                                                                                                                                                                                                                                                                   | String                                                                                                                                                    | \--                                  |
| disableCheckboxAll      | 禁掉所有节点checked响应                                                                                                                                                                                                                                                              | Boolean                                                                                                                                                   | False                                |
| disabledAll             | 禁掉所有节点响应                                                                                                                                                                                                                                                                     | Boolean                                                                                                                                                   | False                                |
| onChange                | 下拉树选中回调方法,单选和多选使用一样方法,<br/>  单选时,value,label为空数组,没有数据 | Function({allValue,allLabel,value,label})  <br/>allValue,allLabel:返回所有的value和label    <br/>value,label: 返回不含有disabled和disableCheckbox为true的数据value和label       | \--                                  |
| onLoadData              | 回调方法示例: function onLoadData({key,treeNode,isExpand,resolve }) { return dispatch({ type:'xxx', payload: { resolve: resolve//带入到effects中, 等异步数据返回成功后返回 如:return resolve(); } }) } <br/>按如上方式调用,点击展开时,还有加载动画,否则没有. Resolve:可以在网上参照Promise                                                                                    | Funciton({key,treeNode,isExpand,resolve }) <br/> key:操作的对应节点key   <br/>  treeNode: 操作的对应节数据  <br/>resolve: Promise方法的返回使用方式如说明                                                                                      | \--                                  |
| labels                  | 对应value字段的对象如下:     [{key:xxx,name:xxx}] <br/> 注:该字段用于 选中字段在树节点中不存在的案例.         | Array[object]                                                                                                                                             | []                                   |
| nodeType                | 用于自定义匹配字段判断.    即通过自定义字段判断节点选择是否符合要求.<br/> 1.不符合要求,在onChange方法返回中就不会有对应的key返回<br/>2.符合要求才返回对应有用的key 不传不影响使用.公司业务特殊要求                                                                                                                                                                                                                                                    | 数据格式如下: { type: 'nodeType', values: ['car','dept',...] }                                                                                            | \--                                  |

#### VtxTreeSelect data参数说明

| **参数**        | **说明**                                                       | **类型**        | **必要性** |
|-----------------|----------------------------------------------------------------|-----------------|------------|
| name            | 节点的名称                                                     | String          | \*         |
| key             | 节点的id(整个下拉树范围内的所有节点的 key 值不能重复,否则报错) | String          | \*         |
| children        | 当前节点下的子节点数据(数据类型与VtxTreeSelect data相同)       | Array/[{},{}]   | 默认[]     |
| isLeaf          | 设定当前节点为叶子节点,叶子节点将没有展开按钮                  | Boolean         | 默认false  |
| icon            | 节点名称前面的iconfont                                         | String          | 默认 --    |
| iconClassName   | Icon自定义样式                                                 | Css             | \--        |
| img             | 节点名称前的图片(跟icon冲突,在icon存在时,img无效不渲染)        | String/http地址 | 默认 --    |
| disabled        | 禁掉节点响应                                                   | Boolean         | 默认false  |
| disableCheckbox | 禁掉节点checked响应                                            | Boolean         | 默认false  |