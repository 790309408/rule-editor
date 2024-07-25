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
    <el-form-item label="是否需要全匹配" prop="fullMatch">
      <el-switch v-model="formData.fullMatch" />
    </el-form-item>
    <el-form-item label="组内节点ID,多个与','隔开"  prop="groupId">
      <el-input v-model="formData.groupId"  />
    </el-form-item>
    <el-form-item label="组内执行超时，单位秒，默认0"  prop="executionTime">
      <el-input v-model="formData.executionTime"  />
      <p>默认0，代表不超时</p>
    </el-form-item>
    <el-form-item label="描述"  prop="describe">
      <el-input v-model="formData.describe" type="textarea" :rows="2" placeholder="请输入节点描述"  />
    </el-form-item>
 </el-form>
</template>
<script setup lang='ts'>
import {watch,reactive,ref} from 'vue'
import type {FormRules } from 'element-plus'
import {NodeFilterGroup} from  '../types/SinoRuleEditor'
const props = defineProps({
  nodeInfo:{
    type:Object,
    default:()=>({})
  }
})
const formData = ref<Partial<NodeFilterGroup>>({
  id:'',
  text:'',
  fullMatch: false,
  describe: '',
  groupId: '',
  executionTime:0,
  Debug:false
})
const rules = reactive<FormRules<NodeFilterGroup>>({
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
    formData.value.fullMatch = newVal.properties.fullMatch
    formData.value.describe = newVal.properties.describe
    formData.value.groupId = newVal.properties.groupId
    formData.value.executionTime = newVal.properties.executionTime
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
 :deep(.el-form-item__label){
  justify-content: flex-start;
 }
</style>