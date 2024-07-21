import {NodeType,EdgeType} from './Enum'
export interface NodeData {
  id: string
  type: NodeType
  x?: number
  y?: number
  children?:Array<NodeData>
  text?: string
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