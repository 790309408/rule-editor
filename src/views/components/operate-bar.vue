<template>
<div class="operate-bar-box">
  <!-- <span v-for="(menuItem,index) in OperateMenus" :key="index"> -->
    <!-- <span> -->
      <span class="span"  ref="buttonRef" v-click-outside="onClickOutside">
        <el-tooltip
            effect="dark"
            content="模式切换"
            placement="bottom"
          >
        <ez-icon :size="16" color="#999"><Switch/></ez-icon>
      </el-tooltip>
    </span>
    <!-- </span> -->
    <!-- <span v-else @click="operate(OperateType.View)">
      <el-tooltip
        effect="dark"
        :content="menuItem.text"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999">{{ menuItem.icon }}</ez-icon>
    </el-tooltip>
    </span> -->
  <!-- </span> -->
  <!-- <span  ref="buttonRef" v-click-outside="onClickOutside">
    <el-tooltip
        effect="dark"
        content="模式切换"
        placement="bottom"
      >
    <ez-icon :size="16" color="#999"><Switch/></ez-icon>
  </el-tooltip>
  </span>
  <span @click="operate(OperateType.View)">
    <el-tooltip
        effect="dark"
        content="查看数据"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><Document/></ez-icon>
    </el-tooltip>
  </span>
  <span @click="operate(OperateType.DownLoadJson)">
    <el-tooltip
        effect="dark"
        content="生成json文件"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><Download /></ez-icon>
    </el-tooltip>
  </span>
  <span @click="operate(OperateType.SaveImg)">
    <el-tooltip
        effect="dark"
        content="生成图片"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><PictureFilled /></ez-icon>
    </el-tooltip>
  </span>
  <span @click="operate(OperateType.ZoomIn)">
    <el-tooltip
        effect="dark"
        content="放大"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><ZoomIn /></ez-icon>
    </el-tooltip>
  </span>
  <span @click="operate(OperateType.ZoomOut)">
    <el-tooltip
        effect="dark"
        content="缩小"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><ZoomOut /></ez-icon>
    </el-tooltip>
  </span>
  <span @click="operate(OperateType.ResetZoom)">
    <el-tooltip
        effect="dark"
        content="还原(大小&定位)"
        placement="bottom"
      >
      <ez-icon :size="16" color="#999"><RefreshRight /></ez-icon>
    </el-tooltip>
  </span> -->
  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    width="220px"
    virtual-triggering
  >
  <ez-select v-model="model" style="width:200px;" :clearable="false" :options="options" placeholder="请选择业务场景"></ez-select>
  </el-popover>
</div>
</template>
<script setup lang='ts'>
import type { SelectOption } from "ez-ui";
import {EzIcon,EzSelect} from 'ez-ui'
import { ref, unref } from 'vue'
import { OperateType } from '../../types/Enum'
import { ClickOutside as vClickOutside } from 'element-plus'
import { OperateMenus } from '../../types/Constant'

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const model = ref('1');
const options = ref<SelectOption[]>([
  { label: "规则编辑模式", value: "1" },
  { label: "流程图模式", value: "2" },
]);
const emit = defineEmits(['operate'])
const operate = (type:OperateType)=>{
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
  .span {
    padding:4px;
    border:1px solid #999;
    border-radius: 20px;
    margin-right: 15px;
    font-size: 12px;
    color: #d11f25;
    cursor: pointer;
    flex-shrink: 0;
  }
 }
</style>