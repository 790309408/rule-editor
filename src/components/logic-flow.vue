<template>
    <div id="logicflow-container" ref="container"></div>
</template>

<script>
import { LogicFlow, ModelController } from '@logicflow/core/lib';
import '@logicflow/core/dist/index.css';
export default {
  name: 'LogicFlowDemo',
  mounted() {
    this.initLogicFlow();
  },
  methods: {
    initLogicFlow() {
      const lf = new LogicFlow({
        container: this.$refs.container,
        // 设置 LogicFlow 的配置项
        width: 800,
        height: 600,
        grid: true,
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
      // 配置 ModelController
      // const modelController = new ModelController({
      //   lf: lf,
      // });

      // 你可以在这里添加更多 LogicFlow 的配置和逻辑
      // 例如，添加节点和边，设置节点和边的样式等

      // 存储逻辑流实例
      
      this.lf = lf;
      lf.render(graphData)
   //   this.modelController = modelController;
    },
  },
};
</script>

<style>
#logicflow-container {
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
}
</style>