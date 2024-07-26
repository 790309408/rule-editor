<template>
<div class="node-btn" v-if="node">
  <div class="btn-bg">
    <img :src="icon"/>
  </div>
  <div class="btn-text">{{ node.text }}</div>
</div>
</template>
<script setup lang='ts'>
import {computed,defineProps} from 'vue'
import { getIcon } from '../../utils/icon';
const props = defineProps({
  node:{type:Object,default:()=>null}
})
console.log('props',props)
const icon = computed(()=> props.node && props.node.type ? getIcon(props.node.type):'')
</script>
<style lang='less' scoped>
.node-btn {
  width: 120px;
  min-height: 25px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.btn-bg {
  width: 40px;
  height: 25px;
  background: #f7f8f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  img {
    width: 40px;
    height: 16px;
  }
}
.btn-text {
  width: calc(100% - 40px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
</style>
