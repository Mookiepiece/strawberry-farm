const r=`type Vector2 = { x: number; y: number };\r
\r
function getLen(v: Vector2) {\r
  return Math.sqrt(v.x * v.x + v.y * v.y);\r
}\r
function dot(v1: Vector2, v2: Vector2) {\r
  return v1.x * v2.x + v1.y * v2.y;\r
}\r
\r
function getAngle(v1: Vector2, v2: Vector2) {\r
  var mr = getLen(v1) * getLen(v2);\r
  if (mr === 0) return 0;\r
  var r = dot(v1, v2) / mr;\r
  if (r > 1) r = 1;\r
  return Math.acos(r);\r
}\r
\r
function cross(v1: Vector2, v2: Vector2) {\r
  return v1.x * v2.y - v2.x * v1.y;\r
}\r
\r
function getRotateAngle(v1: Vector2, v2: Vector2) {\r
  var angle = getAngle(v1, v2);\r
  if (cross(v1, v2) > 0) {\r
    angle *= -1;\r
  }\r
\r
  return (angle * 180) / Math.PI;\r
}\r
\r
\r
/**\r
 * AlloyFinger v0.1.15\r
 * By dntzhang\r
 * Github: https://github.com/AlloyTeam/AlloyFinger\r
 * \r
 * @license MIT\r
 * \r
 */\r
export const AlloyFinger = {\r
\r
}`;export{r as default};
