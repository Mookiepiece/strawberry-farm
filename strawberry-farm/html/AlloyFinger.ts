type Vector2 = { x: number; y: number };

function getLen(v: Vector2) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
function dot(v1: Vector2, v2: Vector2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function getAngle(v1: Vector2, v2: Vector2) {
  var mr = getLen(v1) * getLen(v2);
  if (mr === 0) return 0;
  var r = dot(v1, v2) / mr;
  if (r > 1) r = 1;
  return Math.acos(r);
}

function cross(v1: Vector2, v2: Vector2) {
  return v1.x * v2.y - v2.x * v1.y;
}

function getRotateAngle(v1: Vector2, v2: Vector2) {
  var angle = getAngle(v1, v2);
  if (cross(v1, v2) > 0) {
    angle *= -1;
  }

  return (angle * 180) / Math.PI;
}


/**
 * AlloyFinger v0.1.15
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 * 
 * @license MIT
 * 
 */
export const AlloyFinger = {

}