<template>
  <div class="common-layout">
    <left-side @dragstart="dragstart"></left-side>
    <div class="main-content" id="container">
    </div>
  </div>
</template>
<script setup lang='ts'>
import {reactive,onMounted,ref} from 'vue'
import {NodeData} from '../types/SinoRuleEditor'
 import LeftSide from './left-side.vue'
import LogicFlow from '@logicflow/core'
import "@logicflow/core/dist/index.css";
import '@logicflow/extension/lib/style/index.css'
import SinoRuleEditor from '../js/SinoRuleEditor'
const lf = ref<LogicFlow>()
const graphData = reactive({
  nodes: [],
  edges: []
})
const dragstart = (node:NodeData)=>{
  lf.value && lf.value.dnd.startDrag(node)
}
onMounted(()=>{
  const elContainer = document.querySelector("#container") as HTMLElement;
   lf.value = new SinoRuleEditor({elContainer}).getLogicFlow()
   lf.value && lf.value.render(graphData)
})
</script>
<style scoped>
.main-content {
  height: 100vh;
  width: 100vw;
}
</style>