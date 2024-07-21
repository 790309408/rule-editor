
<template>
  <div @click="testClick">
  <h1>count:{{ obj.count }}</h1>
  <h1 @click="addRaw">toRawObj:{{ toRawObj.count }}</h1>
  <h1 @click="addShallowRef">shallowobj:{{ shallowobj.count }}</h1>
  <h1>unRefCount:{{ unRefCount }}</h1>
  <h1 @click="testTestCustomRef">TestCustomRef:{{ TestCustomRef }}</h1>
  <h1 @click="testShallowReactiveMethod">{{ testShallowReactive.count }}</h1>
  <h1>{{ testShallowReactive.deepCount.count }}</h1>
  <div>
    <h2 @click="testRaw">测试toRaw</h2>
  </div>
  <div>
    <h2 @click="testMarkRaw">测试MarkRaw{{markRawCount.count}}</h2>
    <h2>{{ mouse.x }}-{{ mouse.y }}</h2>
  </div>
  </div>
</template>
<script setup lang="ts">
import useMouse from './js/useMouse'; //假设useMouse已经定义在useMouse.js
import { ref,shallowRef,toRaw,unref,customRef,reactive,shallowReactive,isReactive,markRaw } from 'vue'
const count = ref(0)
count.value++
const obj = ref({count:1})
const toRawObj = toRaw(obj)

toRawObj.value.count++
const shallowobj = shallowRef({count:1})
const unRefCount = unref(count)
const testShallowReactiveObj = shallowReactive({count:1,deepCount:{count:2}})
const testShallowReactive = shallowReactive(testShallowReactiveObj)
const newtestShallowReactive = markRaw(testShallowReactive)
const reactiveObj = reactive({count:1,deepCount:{count:2}})
const TestCustomRef = useDebouncedRef(5,1000)
const markRawCount = markRaw({count:1})
function useDebouncedRef(value:any,delay=200){
  let timeout:any = null
  return customRef((track,trigger)=>{
    return {
      get(){
        track()
        return value
      },
      set(newvalue){
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newvalue
          trigger()
        }, delay)
      }
    }
  })
}
const addShallowRef = ()=>{
  shallowobj.value.count++
}
const addRaw = ()=>{
  toRawObj.value.count++
  
}
const testTestCustomRef = ()=>{
  TestCustomRef.value++
}
const mouse = useMouse();

const testClick = ()=>{
 
  //console.log('mouse',mouse.x,mouse.y)

}
const testShallowReactiveMethod =()=>{
  testShallowReactive.count++
  testShallowReactive.deepCount.count++
  console.log(isReactive(testShallowReactive.deepCount))
}
const testRaw = ()=>{
  console.log(isReactive(testShallowReactive))
 const dd =  toRaw(testShallowReactiveObj)
 dd.count++
 console.log('ddd',dd)
}

const testMarkRaw = ()=> {
  markRawCount.count++
  console.log(markRawCount.count)
  newtestShallowReactive.count++

}


</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
