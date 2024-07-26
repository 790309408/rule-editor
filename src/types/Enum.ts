
enum NodeType  {
  /**矩形 */
  React = 'rect',
  /**圆形 */
  Circle = 'circle',
  /**椭圆 */
  Ellipse = 'ellipse',
  /**多边形 */
  Polygon = 'polygon',
  /**菱形  */
  Diamond = 'diamond',
  /**文本 */
  Text = 'text',
  /**图片 */
  Image = 'image',
  /**Html */
  Html = 'html',
  /**自定义矩形 */
  CustomRect = 'custom-rect',
  /**表达式过滤 */
  ExpressionFilter = 'expression-filter',
  /**字段过滤 */
  FieldFilter = 'field-filter',
  /**过滤器组 */
  FilterGroup = 'filter-group',
  /**js过滤 */
  JsFilter = 'js-filter',
  /**js路由 */
  JsRouter = 'js-router',
  /**消息路由 */
  MessageRouter = 'message-router',

}
enum EdgeType {
  /**直线 */
  Line = 'line',
  /**直角曲线 */
  Polyline = 'polyline',
  /**贝塞尔曲线 */
  Bezier = 'bezier'
}
enum OperateType {
  /**查看数据 */
  View = 'view',
  /**将图保存成json文件下载 */
  DownLoadJson = 'downloadjson',
  /**将图保存成png文件下载 */
  SaveImg = 'saveimg',
  /**重置图 */
  ResetZoom = 'resetzoom',
  /**放大图 */
  ZoomIn = 'zoomin',
  /**缩小图 */
  ZoomOut = 'zoomout',
  /**切换模式 */
  ChangeMode = 'changemode'
}
export {
  NodeType,
  EdgeType,
  OperateType
}