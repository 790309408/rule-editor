import LogicFlow from '@logicflow/core'
import { Snapshot } from "@logicflow/extension";
import {ParamItem,DataItem} from '../../types/SinoRuleEditor'
import {registerCustomNode} from '../../node/index.ts'
LogicFlow.use(Snapshot)
class SinoRuleEditor {
  instance!:LogicFlow
  elContainer!: HTMLElement
  dataList: Array<DataItem>= [];
  constructor(args:ParamItem) {
    this.dataList = args.dataList||[]
    this.elContainer = args.elContainer
    this.initEditor()
  }
  /**初始化编辑器 */
  initEditor() {
    this.instance = new LogicFlow({
      container: this.elContainer,
      width:window.innerWidth,
      height:window.innerHeight-5,
      edgeType:"bezier",
      grid: {
        size: 20,
        visible: true,
        type: "mesh",
        config: {
          color: "#f7f8f9",
          thickness: 1,
        },
      },
      config:{
        width:1000,
        heigt: 800
      },
      background: {
        backgroundColor: '#ffffff', // 背景色
      }
    });
    // 注册自定义节点
    this.instance && registerCustomNode(this.instance)
    //默认样式
    this.instance && this.instance.setTheme({
      bezier: {
        fill: "none",
        stroke: "#999",
        strokeWidth: 2,
        adjustLine: {
          stroke: "#949494",
        },
        adjustAnchor: {
          r: 4,
          fill: "#999",
          stroke: "#999",
          fillOpacity: 1,
        },
      },
      baseEdge: {
        stroke: "#000000",
        strokeWidth: 2,
      },
      edgeText: {
        textWidth: 100,
        overflowMode: "autoWrap",
        fontSize: 16,
        borderColor:'#000',
        background: {
          fill: "#fff",
        },
      },
    })
  }

  /**获取实例 */
  getLogicFlow() {
    return this.instance
  }
}
export default SinoRuleEditor