import {NodeData} from './SinoRuleEditor'
import {NodeType,OperateType} from './Enum'
import {Component} from 'vue'
import { Switch,Document,Download,PictureFilled,ZoomIn,ZoomOut,RefreshRight} from '@element-plus/icons-vue'
/**操作栏 */
const OperateMenus: Array<{text:string,type:OperateType,icon:Component}> = [
  {text:'模式切换',type:OperateType.ChangeMode,icon:Switch},
  {text:'查看数据',type:OperateType.View,icon:Document},
  {text:'下载json文件',type:OperateType.DownLoadJson,icon:Download},
  {text:'保存图片',type:OperateType.SaveImg,icon:PictureFilled},
  {text:'重置',type:OperateType.ResetZoom,icon:RefreshRight},
  {text:'放大',type:OperateType.ZoomIn,icon:ZoomIn},
  {text:'缩小',type:OperateType.ZoomOut,icon:ZoomOut},
 ]
/**规则模式默认基础组件 */
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
export {
  BasicNode,
  OperateMenus
}