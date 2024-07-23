
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
  CustomRect = 'custom-rect'

}
enum EdgeType {
  /**直线 */
  Line = 'line',
  /**直角曲线 */
  Polyline = 'polyline',
  /**贝塞尔曲线 */
  Bezier = 'bezier'
}
export {
  NodeType,
  EdgeType
}