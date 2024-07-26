
import LogicFlow from '@logicflow/core'
import {NodeData} from '../../types/SinoRuleEditor'
import { OperateType } from '../../types/Enum'
/**生成UUID */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  }) + '-' + Date.now();
}
/**处理节点数据 */
export function handlerNodeData(node:NodeData) {
  const newNode:NodeData  = {
      ...node,
      id: 'node_'+generateUUID(),
      properties:{
        ...node.properties,
        virtual:true,
      }
    }
  return newNode
}
/**生成json文件下载 */
export function saveJson(data:string,filename:string){
  if(!data){
    alert('保存数据为空')
    return
  }
  if(!filename) filename = 'data.json'
  // 将JSON字符串转换为Blob对象
const blob = new Blob([data], { type: 'application/json' });

// 创建一个Object URL
const url = URL.createObjectURL(blob);
// 创建一个下载链接
const downloadLink = document.createElement('a');
downloadLink.href = url;
downloadLink.download = 'filename.json'; // 设置下载文件的名称
// 触发下载
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);
  // const blob = new Blob([data],{type:'application/json'})
  // const e = document.createEvent('MouseEvents')
  // const a = document.createElement('a')
  // a.download = filename
  // a.href = window.URL.createObjectURL(blob)
  // a.dataset.downloadurl = ['text/json',a.download,a.href].join(':')
  // e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  // a.dispatchEvent(e)
}
/**生成图片 */
export function LogicFlowOperate(instance:LogicFlow,type:OperateType){
  if(type===OperateType.SaveImg){
    instance.getSnapshot();
  }else if(type===OperateType.ZoomIn){
    instance.zoom(true)
  }else if(type===OperateType.ZoomOut) {
    instance.zoom(false)
  }else if(type===OperateType.ResetZoom){
    instance.resetZoom()
    instance.resetTranslate()
  }
  
}