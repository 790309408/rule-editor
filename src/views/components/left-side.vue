<template>
<div class="left-side">
  <el-scrollbar wrap-style="max-height: 100%;">
    <el-menu
        default-active="1"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-sub-menu :index="element.id" v-for="(element, index) in BasicNode" :key="index">
        <template #title>
          <div class="title">
            <ez-icon :size="16" color="#333"><Promotion /></ez-icon>
            <span>{{ element.text }}</span>
          </div>
        </template>
        <el-menu-item-group v-if="element.children && element.children.length">
          <div @mousedown="selectNode(node)"  class="move-item no-select b-line" v-for="(node,index) in element.children" :key="index">
            <node-button :node="node"></node-button>
          </div>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</div>
</template>
<script setup lang='ts'>
import {EzIcon} from 'ez-ui'
 import {NodeData} from '../../types/SinoRuleEditor'
import BasicNode from '../../types/NodeData'
import NodeButton from './node-button.vue'
const emit = defineEmits(['dragstart'])
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
  font-size: 14px;
  cursor: move;
}
.title {
  width:100%;
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 5px;
  }
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
:deep(.el-sub-menu__title){
  background:#f6f5f5;
}
</style>