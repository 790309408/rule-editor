<template>
  <div class="common-layout">
    <left-side @dragstart="dragstart"></left-side>
    <div class="main-content" id="container">
    </div>
    <ez-dialog v-model="flag" width="50%" @confirm="confirm" @cancel="cancel" @close="cancel">
     <template #header>
      <div class="header-title">节点详情配置<span class="type-text">{{ currentNodeData.text }}</span></div>
     </template>
     <template #default>
      <node-form :node-info="tempNode" ref="refNodeForm"></node-form>
     </template>
    </ez-dialog>
    <edit-action-bar :editNode="editNode" @operation="operation"></edit-action-bar>
  </div>
</template>
<script setup lang='ts'>
import {reactive,onMounted,ref} from 'vue'
import {EzDialog} from 'ez-ui'
import {NodeData} from '@/types/SinoRuleEditor'
import {NodeType} from '@/types/Enum'
import NodeForm from '@/components/index.vue'
import LeftSide from './left-side.vue'
import EditActionBar from './edit-action-bar.vue'
import LogicFlow from '@logicflow/core'
import "@logicflow/core/dist/index.css";
import '@logicflow/extension/lib/style/index.css'
import SinoRuleEditor from '../js/SinoRuleEditor'
import {handlerNodeData} from '../js/utils'

const flag = ref(false)
const refNodeForm = ref()
const lf = ref<LogicFlow>()
const editNode = ref({
  x: 0,
  y: 0,
  id:''
})
const currentNodeData = ref<NodeData>({
  id:'1',
  type: NodeType.Circle,
  text:'test',
  properties:{}
})
const tempNode = ref<LogicFlow.NodeConfig>()
const graphData = reactive({
  nodes: [],
  edges: []
})
/**拖拽添加节点信息 */
const dragstart = (node:NodeData)=>{
 const newNode = handlerNodeData(node)
 currentNodeData.value = newNode
  lf.value && lf.value.dnd.startDrag(newNode)
}
/**注册事件 */
const registerEvent = ()=>{
  //外部拖入节点添加时触发
  lf.value && lf.value.on("node:dnd-add", (data) => {
    flag.value = true
    tempNode.value = data.data as LogicFlow.NodeConfig
  });
  //节点单击事件
  lf.value && lf.value.on("node:click", (data) => {
    editNode.value.x = data.position.domOverlayPosition.x+50
    editNode.value.y = data.position.domOverlayPosition.y-50
    editNode.value.id = data.data.id
  });
  /**画布点击 */
  lf.value && lf.value.on("blank:click", () => {
    resetEditNode()
  });
   /**节点拖拽 */
   lf.value && lf.value.on("node:drag", ({data,e}) => {
    editNode.value = {
      id:data.id,
      x:e.x+50,
      y:e.y-50
    }
  });
}
/**确定 */
const confirm = ()=>{
  flag.value = false
  if(currentNodeData.value && tempNode.value){
   lf.value && lf.value.addNode(tempNode.value)
  } 
}
/**关闭弹框 */
const cancel = ()=>{
  flag.value = false
  currentNodeData.value && removeNode(currentNodeData.value.id)
}
/**删除节点 */
const removeNode = (id:string)=>{
  lf.value && lf.value.deleteNode(id)
}
/**编辑节点 */
const operation = (data:any)=>{
  if(data.type==='edit'){
    const node = getNodeDataById(data.node.id)
    console.log('---node---',node)
    if(node){
      currentNodeData.value = node
      currentNodeData.value.text = typeof node.text==='string' ? node.text: node.text?.value
      flag.value = true
    }
  }else if(data.type==='del') {
    removeNode(data.node.id)
    resetEditNode()
  }
}
/**获取节点信息 */
const getNodeDataById = (nodeId: string): LogicFlow.NodeConfig|undefined => {
  return lf.value && lf.value.getNodeDataById(nodeId)
}
/**重置编辑节点信息 */
const resetEditNode = ()=>{
  editNode.value = {
    id:'',
    x:0,
    y:0
  }
}
onMounted(()=>{
  const elContainer = document.querySelector("#container") as HTMLElement;
   lf.value = new SinoRuleEditor({elContainer}).getLogicFlow()
   lf.value && lf.value.render(graphData)
   registerEvent()
})
</script>
<style scoped>
.main-content {
  height: 100vh;
  width: 100vw;
}
.header-title {
  font-size: 16px;
  display: flex;
  align-items: center;
}
.type-text {
  padding: 2px 10px;
  background-color: #f7f8f9;
  color: #999999;
  font-size: 12px;
  margin-left: 5px
}
</style>