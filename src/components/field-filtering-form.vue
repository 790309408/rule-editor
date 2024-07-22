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
    <el-form-item label="是否满足需要所有字段key存在" prop="existKey">
      <el-switch v-model="formData.existKey" />
    </el-form-item>
    <el-form-item label="msg data字段key"  prop="dataKey">
      <el-input v-model="formData.dataKey"  />
      <p>多个与逗号隔开</p>
    </el-form-item>
    <el-form-item label="meta data字段key"  prop="metaDataKey">
      <el-input v-model="formData.metaDataKey"  />
      <p>多个与逗号隔开</p>
    </el-form-item>
    <el-form-item label="描述"  prop="describe">
      <el-input v-model="formData.describe" type="textarea" :rows="2" placeholder="请输入节点描述"  />
    </el-form-item>
 </el-form>
</template>
<script setup lang='ts'>
import {watch,reactive,ref} from 'vue'
import type {FormRules } from 'element-plus'
import {NodeFieldFiltering} from  '../types/SinoRuleEditor'
const props = defineProps({
  nodeInfo:{
    type:Object,
    default:()=>({})
  }
})
const formData = ref<Partial<NodeFieldFiltering>>({
  id:'',
  text:'',
  dataKey: '',
  describe: '',
  metaDataKey: '',
  existKey: false,
  Debug:false
})
const rules = reactive<FormRules<NodeFieldFiltering>>({
  id: [
    { required: true, message: '请输入节点ID', trigger: 'blur' },
  ]
})
watch(
  () => props.nodeInfo,
  (newVal) => {
    console.log('newVal',newVal)
    formData.value = newVal
    formData.value.text = typeof newVal.text === 'string' ? newVal.text : newVal.text.value
  },
  {
    deep: true,
    immediate: true
  }
)
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
 ::v-deep .el-form-item {
  flex-direction: column;
 }
 ::v-deep .el-form-item__label {
  justify-content: flex-start;
 }
</style>