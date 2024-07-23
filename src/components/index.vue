<template>
<div v-if="renderConponent">
  <component ref="refComponent" :is="renderConponent" :node-info="nodeInfo"></component>
</div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import FieldFilterFrom from './field-filtering-form.vue'
defineProps({
  nodeInfo:{
    type:Object,
    default:()=>({})
  }
})
const refComponent = ref()
const renderConponent = FieldFilterFrom
const getFormData = ()=>{
  return refComponent.value.getFormData()
}
defineExpose({
  getFormData
})
</script>