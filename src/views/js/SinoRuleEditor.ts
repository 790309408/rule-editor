import LogicFlow from '@logicflow/core'
import {ParamItem,DataItem} from '../../types/SinoRuleEditor'
import {registerCustomNode} from '../../node/index.ts'
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
        type: "dot",
        config: {
          color: "#ababab",
          thickness: 1,
        },
      },
      config:{
        width:1000,
        heigt: 800
      },
    //  textEdit:false
    });
    // 注册自定义节点
    this.instance && registerCustomNode(this.instance)
    //默认样式
    this.instance && this.instance.setTheme({
      bezier: {
        fill: "none",
        stroke: "#d11f20",
        strokeWidth: 2,
        adjustLine: {
          stroke: "#949494",
        },
        adjustAnchor: {
          r: 4,
          fill: "#d11f20",
          stroke: "#d11f20",
          fillOpacity: 1,
        },
      },
      edgeText: {
        textWidth: 100,
        overflowMode: "autoWrap",
        fontSize: 16,
        borderColor:'#000',
        background: {
          fill: "#f22f25",
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