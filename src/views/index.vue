<template>
    <main-content></main-content>
</template>
<script setup lang='ts'>

import MainContent from './components/main-content.vue'
</script>
<style scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  position: relative;
}
.search-box {
  width:100%;
  height: 32px;
}
:deep(.el-main) {
  padding:0px;
}
</style>