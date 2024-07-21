import { ref, onScopeDispose, effectScope } from 'vue';

// 创建一个可复用的useMouse composable
function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const handler = (e:MouseEvent) => {
    x.value = e.clientX;
    y.value = e.clientY;
  };

  // 使用effectScope来管理副作用的生命周期
  const scope = effectScope(true); // true 表示创建一个分离的作用域

  scope.run(() => {
    // 添加事件监听器
    window.addEventListener('mousemove', handler);

    // 返回鼠标位置对象
    return { x, y };
  });

  // 使用onScopeDispose来注册一个当作用域销毁时调用的回调
  onScopeDispose(() => {
    window.removeEventListener('mousemove', handler);
  });

  return { x, y };
}

export default useMouse;