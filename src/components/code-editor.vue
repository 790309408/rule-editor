<template>
 <Codemirror
    v-model:value="modelCode"
    :options="cmOptions"
    ref="cmRef"
    border
    placeholder="请输入过滤函数"
    :height="300"
    @input="onInput"
  />
</template>
<script setup lang='ts'>
import {ref,onMounted,nextTick,watch} from 'vue'
import Codemirror from "codemirror-editor-vue3";
import type { CmComponentRef } from "codemirror-editor-vue3"
// placeholder
import "codemirror/addon/display/placeholder.js";
// language
import "codemirror/mode/javascript/javascript.js";
// theme
import "codemirror/theme/dracula.css";
const emit = defineEmits(['update:value']);
const props = defineProps({
  value:{
    type:String,
    default:()=> ''
  },
  mode:{
    type:String,
    default:()=> 'text/javascript'
  }
})
const modelCode = ref('')
const cmRef = ref<CmComponentRef>()
const cmOptions = ref({
  mode: "text/javascript",
  gutters: ["CodeMirror-lint-markers"],
  theme:'default',
})
const onInput = (value: string) => {
  modelCode.value = value
  emit('update:value',value)
}
watch(
  () => props.value,
  (newVal) => {
    if(newVal){
      modelCode.value = newVal
      cmOptions.value.mode = props.mode
    }
  },{
    deep: true,
    immediate: true
  }
)
onMounted(() => {
  nextTick(()=>{
    cmRef.value?.refresh()
  })
})

</script>
<style scoped lang="less">
#code{
  width: 100%;
}
:deep(.CodeMirror-line) {
  text-align: left;
}

</style>