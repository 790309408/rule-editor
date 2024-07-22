import {NodeData,NodeFieldFiltering} from '../../types/SinoRuleEditor'
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
  if(node.id === '1-1'){
   const newNode:NodeFieldFiltering  = {
      ...node,
      id: 'node_'+generateUUID(),
      properties:{
        Debug:false,
        existKey:false,
        dataKey:'',
        metaDataKey:'',
        describe:''
      }
      
    }
    return newNode
  }
  return node
}