<template>
  <div class="common-layout">
    <left-side @dragstart="dragstart"></left-side>
    <div class="main-content" id="container"></div>
    <edit-action-bar :editNode="editNode" @operation="operation"></edit-action-bar>
    <operate-menu @operate="operatebar"></operate-menu>
    <ez-dialog v-model="flag" width="50%" @confirm="confirm" @cancel="cancel" @close="cancel">
     <template #header>
      <div class="header-title">节点详情配置<span class="type-text">{{ nodeTypeText }}</span></div>
     </template>
     <template #default>
      <node-form :node-info="currentNodeData" ref="refNodeForm"></node-form>
     </template>
    </ez-dialog>
    <ez-dialog v-model="graphFlag" width="50%" @confirm="confirm" @cancel="cancel" @close="cancel">
     <template #header>
      <div class="header-title">生成的规则链文件</div>
     </template>
     <template #default>
       <code-editor v-model:value="graphDataJson" mode="application/json"></code-editor>
     </template>
    </ez-dialog>
  </div>
</template>
<script setup lang='ts'>
import {onMounted,ref, computed} from 'vue'
import {EzDialog} from 'ez-ui'
import LogicFlow from '@logicflow/core'
import "@logicflow/core/dist/index.css";
import '@logicflow/extension/lib/style/index.css'
import CodeEditor from '../../components/code-editor.vue';
import {NodeData} from '../../types/SinoRuleEditor'
import NodeForm from '../../components/index.vue'
import LeftSide from './left-side.vue'
import EditActionBar from './edit-action-bar.vue'
import OperateMenu from './operate-bar.vue'
import SinoRuleEditor from '../js/SinoRuleEditor'
import {handlerNodeData} from '../js/utils'
const flag = ref(false)
const graphFlag = ref(false)
const refNodeForm = ref()
const lf = ref<LogicFlow>()
const editNode = ref({
  x: 0,
  y: 0,
  type: '',
  id:''
})
// 当前操作节点
const currentNodeData = ref<LogicFlow.NodeConfig>()
// 画布数据集合
const graphData = ref<LogicFlow.GraphData>({
  nodes: [],
  edges: []
})
const graphDataJson = ref('')
/**节点类型 */
const nodeTypeText = computed(()=>{
  return typeof currentNodeData.value?.text === 'string' ? currentNodeData.value?.text:currentNodeData.value?.text?.value
})
/**拖拽添加节点信息 */
const dragstart = (node:NodeData)=>{
  //虚拟节点
 const virtualNode = handlerNodeData(node)
 currentNodeData.value = virtualNode as LogicFlow.NodeConfig
 lf.value && lf.value.dnd.startDrag(virtualNode)
}
/**注册事件 */
const registerEvent = ()=>{
  //外部拖入节点添加时触发
  lf.value && lf.value.on("node:dnd-add", ({data}) => {
    currentNodeData.value = data 
    flag.value = true
  });
  //节点单击事件
  lf.value && lf.value.on("node:click", (data) => {
    console.log('边点击',data)
    editNode.value.x = data.position.domOverlayPosition.x+50
    editNode.value.y = data.position.domOverlayPosition.y-50
    editNode.value.id = data.data.id
    editNode.value.type = data.data.type
  });
  /**画布点击 */
  lf.value && lf.value.on("blank:click", () => {
    resetEditNode()
  });
   /**节点拖拽 */
   lf.value && lf.value.on("node:drag", () => {
    resetEditNode()
  });
  /**节点新增 */
  lf.value && lf.value.on("node:add", ({data}) => {
    console.log('节点新增',data)
  });
  /**边点击 */
  lf.value && lf.value.on("edge:click", ({data,position}) => {
    console.log('边点击',position,data)
    editNode.value.x = position.domOverlayPosition.x+50
    editNode.value.y = position.domOverlayPosition.y-50
    editNode.value.id = data.id
    editNode.value.type = data.type
  });
}
/**确定 */
const confirm = ()=>{
   const data =  refNodeForm.value.getFormData()
  //虚拟节点新增
  if(currentNodeData.value?.properties?.virtual){
    currentNodeData.value.properties.virtual = false
    currentNodeData.value?.id && removeNode(currentNodeData.value?.id)
    const node = {
      ...currentNodeData.value,
      properties:{
        ...data,
        virtual:false,
      }
    }
    lf.value && lf.value.addNode(node)
  }else if(currentNodeData.value?.properties) {
    //编辑节点
    currentNodeData.value?.id && removeNode(currentNodeData.value?.id)
    const node = {
      ...currentNodeData.value,
      text: data.text,
      properties:{
        ...data,
        virtual:false,
      }
    }
    lf.value && currentNodeData.value?.id && lf.value.addNode(node)
  }
  flag.value = false
  resetEditNode()
}
/**关闭弹框--这里有一个bug，关闭会触发两次。因为close也会触发一次 */
const cancel = ()=>{
  currentNodeData.value && 
  currentNodeData.value.properties?.virtual && 
  currentNodeData.value.id && 
  removeNode(currentNodeData.value.id)
  resetEditNode()
}

/**删除节点 */
const removeNode = (id:string)=>{
  lf.value && lf.value.deleteNode(id)
}

/**删除线 */
const removeEdge = (id:string)=>{
  lf.value && lf.value.deleteEdge(id)
}
/**编辑节点 */
const operation = (data:any)=>{
  console.log('--data---',data)
  if(data.type==='edit'){
    const node = getNodeDataById(data.node.id)
    if(node){
       currentNodeData.value = node
      flag.value = true
    }
  }else if(data.type==='del') {
    data.node.type==='bezier' ? removeEdge(data.node.id) : removeNode(data.node.id)
    resetEditNode()
  }
}
/**操作栏 */
const operatebar = (type:'view')=>{
  if(type==='view'){
    if(lf.value){
     const data = lf.value.getGraphData() as LogicFlow.GraphData
     data && (graphData.value = data)
     graphFlag.value = true
     graphDataJson.value = JSON.stringify(data,null,2)
     console.log('--data---',data)
    }
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
    type:'',
    x:0,
    y:0
  }
}
onMounted(()=>{
  const elContainer = document.querySelector("#container") as HTMLElement;
   lf.value = new SinoRuleEditor({elContainer}).getLogicFlow()
   lf.value && lf.value.render(graphData.value)
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