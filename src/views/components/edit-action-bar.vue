<template>
<div v-if="props.editNode.id" class="edit-action-bar" :style="{top:`${props.editNode.y}px`,left:`${props.editNode.x}px`}">
  <span @click="operation('edit')"><Edit/>编辑</span>
  <span @click="operation('del')"><Delete/>删除</span>
</div>
</template>
<script setup lang='ts'>
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
    color: #d11f25;
    cursor: pointer;
  }
 }
</style>