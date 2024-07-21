<template>
<div class="left-side">
  <el-scrollbar wrap-style="max-height: 100%;">
    <el-menu
        default-active="1"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-sub-menu :index="element.id" v-for="(element, index) in basicList" :key="index">
        <template #title>
          <el-icon><location /></el-icon>
          <span> {{ element.text }}</span>
        </template>
        <el-menu-item-group v-if="element.children && element.children.length">
          <div @click="selectNode(node)"  class="move-item no-select b-line" v-for="(node,index) in element.children" :key="index">{{ node.text }}</div>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</div>
</template>
<script setup lang='ts'>
import {NodeData} from '../types/SinoRuleEditor'
import {NodeType} from '../types/Enum'
const emit = defineEmits(['dragstart'])
const basicList: Array<Partial<NodeData>> = [
  {
     id: '1', text: "输入端",
     children:[
      {id:'1-1',text:'MQTT',type:NodeType.Circle},
      {id:'1-2',text:'TCP/UDP',type:NodeType.Circle},
      {id:'1-3',text:'HTTP',type:NodeType.React},
      {id:'1-4',text:'定时调度',type:NodeType.React},
      {id:'1-5',text:'Websocket',type:NodeType.React},
    ]
  },
  { 
    id:' 2', text: "过滤器",
    children:[
      {id:'2-1',text:'表达过滤器',type:NodeType.Diamond},
      {id:'2-2',text:'字段过滤',type:NodeType.Diamond},
      {id:'2-3',text:'过滤器组',type:NodeType.Diamond},
      {id:'2-4',text:'js过滤',type:NodeType.Diamond},
      {id:'2-5',text:'js路由',type:NodeType.Diamond},
      {id:'2-6',text:'消息路由',type:NodeType.Diamond},
    ]
   },
  { 
    id: '3', text: "转换器",
    children:[
      {id:'3-1',text:'表达式转换',type:NodeType.Text},
      {id:'3-2',text:'js转换',type:NodeType.Text},
      {id:'3-3',text:'元数据转换',type:NodeType.Text},
      {id:'3-4',text:'模板转换',type:NodeType.Text},
    ]
   },
   { 
    id: '4', text: "动作",
    children:[
      {id:'4-1',text:'延迟',type:NodeType.Image},
      {id:'4-2',text:'命令行',type:NodeType.Image},
      {id:'4-3',text:'for',type:NodeType.Image},
      {id:'4-4',text:'函数',type:NodeType.Image},
      {id:'4-5',text:'节点组',type:NodeType.Image},
      {id:'4-6',text:'迭代器',type:NodeType.Image},
      {id:'4-7',text:'日志',type:NodeType.Image},
    ]
   }
]
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const selectNode = (node:NodeData)=>{
  emit('dragstart',node)
}
</script>
<style scoped>
.left-side {
  position: absolute;
  left: 0px;
  top: 0px;
  width:200px;
  height: 100vh;
  z-index: 10;
}
.move-item {
  width:100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: move;
}
/* 防止文本被选中 */
.no-select {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none;    /* Firefox */
  -ms-user-select: none;     /* IE/Edge */
  user-select: none;         /* 标准语法 */
}
.b-line {
    position: relative;
    &::after {
      content:'';
      height: 1px;
      background-color: #f0f0f0;
      bottom: 0px;
      left: 0px;
      right: 0px;
      position: absolute;
    }
  }
</style>