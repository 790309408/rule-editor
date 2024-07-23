import CustomRect from './custom-rect';
import LogicFlow from '@logicflow/core';
export function registerCustomNode(instance:LogicFlow){
  instance.register(CustomRect);
}