<template>
<div v-if="props.editNode.id" class="edit-action-bar" :style="{top:`${props.editNode.y}px`,left:`${props.editNode.x}px`}">
  <span @click="operation('edit')">
    <el-tooltip effect="dark" content="编辑" placement="top">
      <ez-icon :size="12" color="#333"><Edit /></ez-icon>
    </el-tooltip>
  </span>
  <span @click="operation('del')">
    <el-tooltip effect="dark" content="删除" placement="top">
      <ez-icon :size="12" color="#333"><Delete /></ez-icon>
    </el-tooltip>
  </span>
</div>
</template>
<script setup lang='ts'>
import {EzIcon} from 'ez-ui'
const props = defineProps({
  editNode:{type:Object,default:()=>({x:0,y:0,id:''})}
})
const emit = defineEmits(['operation'])
/**节点操作 */
const operation = (type:'edit'|'del')=>{
  emit('operation',{type:type,node:props.editNode})
}
</script>
<style scoped lang="less">
 .edit-action-bar{
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #999;
    padding:2px;  
    border-radius: 5px;
  }
 }
</style>