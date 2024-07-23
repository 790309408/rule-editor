import LogicFlow from '@logicflow/core'
import {ParamItem,DataItem} from '../../types/SinoRuleEditor'
import {registerCustomNode} from '../../custom-node/index.ts'
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
      //nodeTextEdit:false
    //  ...SilentConfig
    });
    this.instance && this.registerEvent()
    this.instance && registerCustomNode(this.instance)
  }

  /**注册事件 */
  registerEvent(){
    this.instance.on("node:click", (data) => {
      console.log('node:click',data);
    });
   
   // this.monitorMouseUp()
  }
  /**监听鼠标抬起事件 */
  monitorMouseUp(){
    this.instance.on("node:mouseup", (data) => {
      console.log('node:mouseup',data);
    });
  }
 /**批量注册 */
  batchRegister(){

  }

  /**获取实例 */
  getLogicFlow() {
    return this.instance
  }
}
export default SinoRuleEditor