import {NodeData} from '../../types/SinoRuleEditor'
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