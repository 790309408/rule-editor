import ExpressionFilter from './custom-node/expression-filter';
import FieldFilter from './custom-node/field-filter';
import FilterGroup from './custom-node/filter-group'
import JsFilter from './custom-node/js-filter'
import JsRouter from './custom-node/js-router'
import MessageRouter from './custom-node/message-router'
import Bezier from './custom-edge/Bezier';
import LogicFlow from '@logicflow/core';
export function registerCustomNode(instance:LogicFlow){
  instance.batchRegister(
    [
      ExpressionFilter,
      FieldFilter,
      FilterGroup,
      JsFilter,
      JsRouter,
      MessageRouter,
      Bezier
    ]
  )
}