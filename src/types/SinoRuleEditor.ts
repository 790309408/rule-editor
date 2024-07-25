import {NodeType,EdgeType} from './Enum'
export interface NodeData {
  id?: string
  type: NodeType
  text: string
  x?: number
  y?: number
  virtual?:boolean
  children?:Array<NodeData>
  properties?: any
  [key: string]: any
}
export interface EdgeData {
  id:string
  type: EdgeType
  sourceNodeId: string
  targetNodeId: string
  startPoint: {x:number,y:number}
  endPoint: {x:number,y:number}
  text?: string
  pointsList?: Array<{x:number,y:number}>
  properties?: any
  [key: string]: any
}
export interface DataItem {
  nodes?: NodeData[]
  edges?: EdgeData[]
}
export interface ParamItem {
  dataList?: Array<DataItem>
  elContainer: HTMLElement
}
/**字段过滤节点 */
export interface NodeFieldFiltering extends NodeData{
  properties: {
    Debug:boolean
    existKey:boolean
    dataKey:string
    metaDataKey:string
    describe:string
    [key: string]: any
  }
}
/**表达式过滤 */
export interface NodeExpressionFiltering extends NodeData{
  properties: {
    Debug:boolean
    filterExpression:string
    describe:string
    [key: string]: any
  }
}
/**过滤器组 */
export interface NodeFilterGroup extends NodeData{
  properties: {
    Debug:boolean
    fullMatch:boolean
    groupId: string
    executionTime:number
    describe:string
    [key: string]: any
  }
}
/**js过滤 */
export interface NodeJsFiltering extends NodeData{
  properties: {
    Debug:boolean
    filterJsCode:string
    describe:string
    [key: string]: any
  }
}
/**js路由 */
export interface NodeJsRouter extends NodeData{
  properties: {
    Debug:boolean
    filterJsCode:string
    describe:string
    [key: string]: any
  }
}
/**消息路由 */
export interface NodeMessageRouter extends NodeData{
  properties: {
    Debug:boolean
    describe:string
    [key: string]: any
  }
}