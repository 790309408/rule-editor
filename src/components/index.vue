<template>
<div v-if="renderConponent">
  <component ref="refComponent" :is="renderConponent" :node-info="nodeInfo"></component>
</div>
</template>

<script setup lang='ts'>
import {ref,computed} from 'vue'
import FieldFilterFrom from './field-filtering-form.vue'
import ExpressionFilteringForm from './expression-filtering-form.vue';
import FilterGroupForm from './filter-group-form.vue';
import JsFilterForm from './js-filter-form.vue';
import JsRouterForm from './js-router-form.vue';
import MessageRouterForm from './message-router-form.vue';
const props = defineProps({
  nodeInfo:{
    type:Object,
    default:()=>({})
  }
})
const refComponent = ref()
const ComponentArray: Record<string,any> = {
  'field-filter':FieldFilterFrom,
  'expression-filter':ExpressionFilteringForm,
  'filter-group':FilterGroupForm,
  'js-filter': JsFilterForm,
  'js-router': JsRouterForm,
  'message-router':MessageRouterForm
}
const renderConponent = computed(()=>{
    if(!props.nodeInfo.type) return null
    return ComponentArray[props.nodeInfo.type]||null
})
const getFormData = ()=>{
  return refComponent.value.getFormData()
}
defineExpose({
  getFormData
})
</script>