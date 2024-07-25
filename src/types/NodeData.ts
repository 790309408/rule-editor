import {NodeData} from './SinoRuleEditor'
import {NodeType} from './Enum'
const BasicNode: Array<Partial<NodeData>> = [
 
  { 
    id:' 2', text: "过滤器",
    children:[
      {id:'2-1',text:'表达式过滤',type:NodeType.ExpressionFilter},
      {id:'2-2',text:'字段过滤',type:NodeType.FieldFilter},
      {id:'2-3',text:'过滤器组',type:NodeType.FilterGroup},
      {id:'2-4',text:'js过滤',type:NodeType.JsFilter},
      {id:'2-5',text:'js路由',type:NodeType.JsRouter},
      {id:'2-6',text:'消息路由',type:NodeType.MessageRouter},
    ]
   },
]
export default BasicNode