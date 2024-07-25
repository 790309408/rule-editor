import { RectNode, RectNodeModel,h } from '@logicflow/core'
import LogicFlow from '@logicflow/core'
import { getIcon } from '../../utils/icon';
const NodeWidth = 200,NodeHeight = 50;
class ExpressionFilterNode extends RectNode {

  getIcon () {
    const { width, height,type } = this.props.model;
    return h('image', {
      width: 60,
      height: 25,
      x: - width / 2,
      y: - height/2 + 12.5 ,
      href: getIcon(type)
    });
  }
  customMouseDown = () => {
    const { model, graphModel } = this.props;
    graphModel.eventCenter.emit('custom-event:clone-team', model);
  }
  getShape() {
    const {
      x,
      y,
      width,
      height,
      radius
    } = this.props.model;
    const style = this.props.model.getNodeStyle()
    return h(
      'g',
      {
        className: 'lf-team-node',
        onMouseDown: this.customMouseDown,
      },
      [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          rx: radius,
          ry: radius
        }),
        h('g', {
          style: 'pointer-events: none;',
          transform: `translate(${x}, ${y})`
        }, [
          h('rect', {
            x: - width / 2,
            y: - height / 2,
            width: 60,
            height: 50,
            fill: '#000',
            fillOpacity: 0.05,
            stroke: 'none',
          }),
          this.getIcon(),
          // h('path', {
          //   d: `M ${30 - width / 2} ${1 -height / 2 } l 0 28`,
          //   stroke: '#000',
          //   strokeOpacity: 0.1,
          //   strokeWidth: 1
          // })
        ])
      ]
    )
  }
}
class ExpressionFilterModel extends RectNodeModel {
  initNodeData(data:LogicFlow.NodeConfig){
    super.initNodeData(data)
    //也可以写在setAttributes()中
    this.width = NodeWidth;
    this.height = NodeHeight;
    // 节点名称不让编辑
    this.text.editable = false;
  }
  setAttributes() {
    //在initNodeData中不起作用
    this.radius = 5;
  }
  // 设置文本样式
  getTextStyle(): LogicFlow.TextNodeTheme {
    //节点properties对象属性
    const { refX = 0, refY = 0 } = this.properties 
    const style = super.getTextStyle();
    style.color = '#333'
    style.fontSize = 16;
    // 通过 transform 重新设置 text 的位置
    return {
      ...style,
      transform: `matrix(1 0 0 1 ${refX+30} ${refY})`,//修改文本的位置
      lengthAdjust:'spacing'
    };
  }
  // 节点样式重写
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = '#dddddd'; //属性定义了给定图形元素的外轮廓的颜色--边框颜色。
    style.strokeDasharray  = 0; // 属性可控制用来描边的点划线的图案范式 --边框虚线样式
    style.strokeWidth  = 1; // 属性指定了当前对象的轮廓的宽度。--边框大小
    style.fill  = '#f7f8f9'; // 属性用来定义给定图形元素内部的颜色。--内部填充色
    //style.fillOpacity  = 0.5;//属性指定了填色的不透明度或当前对象的内容物的不透明度。--内部填充色透明度
    return style;
  }
}
export default {
  type: 'expression-filter',
  view: ExpressionFilterNode,
  model: ExpressionFilterModel,
};
