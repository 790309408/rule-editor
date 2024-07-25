<template>
 <el-form :model="formData" :rules="rules">
    <el-form-item label="节点ID" prop="id">
      <div class="w-100">
        <el-input v-model="formData.id" class="w-[80%] w-p-80" disabled placeholder="请输入节点ID" />
        <el-switch v-model="formData.Debug" /><span>调试模式</span>
      </div>
    </el-form-item>
    <el-form-item label="节点名称"  prop="text">
      <el-input v-model="formData.text" placeholder="请输入节点名称" />
    </el-form-item>
    <el-form-item label="描述"  prop="describe">
      <el-input v-model="formData.describe" type="textarea" :rows="2" placeholder="请输入节点描述"  />
    </el-form-item>
 </el-form>
</template>
<script setup lang='ts'>
import {watch,reactive,ref} from 'vue'
import type {FormRules } from 'element-plus'
import {NodeMessageRouter} from  '../types/SinoRuleEditor'
const props = defineProps({
  nodeInfo:{
    type:Object,
    default:()=>({})
  }
})
const formData = ref<Partial<NodeMessageRouter>>({
  id:'',
  text:'',
  describe: '',
  Debug:false
})
const rules = reactive<FormRules<NodeMessageRouter>>({
  id: [
    { required: true, message: '请输入节点ID', trigger: 'blur' },
  ]
})
/**获取表单数据 */
const getFormData = ()=>{
  return formData.value
}
watch(
  () => props.nodeInfo,
  (newVal) => {
    formData.value.id = newVal.id
    formData.value.text = typeof newVal.text === 'string' ? newVal.text : newVal.text.value
    formData.value.describe = newVal.properties.describe
    formData.value.Debug = newVal.properties.Debug
  },
  {
    deep: true,
    immediate: true
  }
)
defineExpose({
  getFormData
})
</script>
<style scoped lang="less">
 .w-p-80 {
  width: 80%;
  margin-right:10px;
 }
 .w-100 {
  width: 100%;
  display: flex;
  align-items: center;
 }
 :deep(.el-form-item) {
  flex-direction: column;
 }
 :deep(.el-form-item__label) {
  justify-content: flex-start;
 }
 :deep(.CodeMirror-line) {
  text-align: left;
}
 .code-box {
  width: 100%;
  display: flex;
  flex-direction: column
 }
</style>