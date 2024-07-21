<template>
<div id="logicflow-container" ref="container"></div>
</template>
<script setup lang='ts'>
import {ref,onMounted} from 'vue'
import { LogicFlow, ModelController } from '@logicflow/core/lib';
import { DndPanel, SelectionSelect } from "@logicflow/extension";
import '@logicflow/core/dist/index.css';
    const lf = ref(null);
    const initLogicFlow = ()=> {
       lf.value = new LogicFlow({
        container: document.querySelector('#logicflow-container'),
        width: 800,
        height: 600,
        grid: true,
        plugins: [DndPanel, SelectionSelect]
      });
      const graphData = {
        nodes: [
            {
              id: "node_id_1",
              type: "rect",
              x: 100,
              y: 100,
              text: { x: 100, y: 100, value: '节点1' },
              properties: {}
            },
            {
              id: "node_id_2",
              type: "circle",
              x: 200,
              y: 300,
              text: { x: 300, y: 300, value: '节点2' },
              properties: {}
            }
        ],
        edges: [
          {
            id: "edge_id",
            type: "polyline",
            sourceNodeId: "node_id_1",
            targetNodeId: "node_id_2",
            text: { x: 139, y: 200, value: "连线" },
            startPoint: { x: 100, y: 140 },
            endPoint: { x: 200, y: 250 },
            pointsList: [ { x: 100, y: 140 }, { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 200, y: 250 } ],
            properties: {}
          }
        ]
      }
      lf.value.render(graphData)
    }
    onMounted(()=>{
      initLogicFlow()
    })
  
</script>
<style scoped>
#logicflow-container {
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
}
</style>