import {NodeType,EdgeType} from './Enum'
export interface NodeData {
  id: string
  type: NodeType
  text: string
  x?: number
  y?: number
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
  }
}