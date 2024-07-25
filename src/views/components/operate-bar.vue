<template>
<div class="operate-bar-box">
  <span @click="operate('view')">
    <el-tooltip
        effect="dark"
        content="查看数据"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><Document/></ez-icon>
    </el-tooltip>
  </span>
</div>
</template>
<script setup lang='ts'>
import {EzIcon} from 'ez-ui'
const emit = defineEmits(['operate'])
const operate = (type:'view')=>{
  emit('operate',type)
}
</script>
<style scoped lang="less">
 .operate-bar-box{
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  right:20px;
  top:20px;
  span {
    padding:4px;
    border:1px solid #999;
    border-radius: 20px;
    margin-right: 5px;
    font-size: 12px;
    color: #d11f25;
    cursor: pointer;
  }
 }
</style>