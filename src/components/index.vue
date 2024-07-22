<template>
<div v-if="renderConponent">
  <component :is="renderConponent" :node-info="nodeInfo"></component>
</div>
</template>

<script setup lang='ts'>
import FieldFilterFrom from './field-filtering-form.vue'
defineProps({
  nodeInfo:{
    type:Object,
    default:()=>({})
  }
})
const renderConponent = FieldFilterFrom
</script>