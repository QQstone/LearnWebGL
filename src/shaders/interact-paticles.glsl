attribute vec3 position; // 粒子的原始球面坐标
uniform vec2 uMouse;   // 平滑后的鼠标归一化坐标 (-1 to 1)
uniform float uTime;   // 时间

// 一个用于产生噪波效果的数学函数（例如噪波纹理或数学噪波）
vec3 getNoiseOffset(vec3 pos, float time);

void main() {
  vec3 pos = position; // 初始位置

  // 1. 将鼠标 2D 坐标映射到球面或计算它与粒子的接近度
  // 这里简化为一个简单的接近度计算示例
  float dist = distance(pos.xy, uMouse); // 简单的平面接近度

  // 2. 排斥逻辑
  float repulsionRadius = 0.5;
  if (dist < repulsionRadius) {
    // 计算排斥力（例如与距离平方反比）
    float force = (1.0 - dist / repulsionRadius) * 0.1;
    // 计算排斥方向
    vec2 dir = normalize(pos.xy - uMouse);
    // 应用排斥位移
    pos.xy += dir * force;
  }

  // 3. 添加噪波偏移（增加随机感和动态效果）
  vec3 noiseOffset = getNoiseOffset(position, uTime); // 基于原始位置产生一致噪波
  pos += noiseOffset;

  // 4. 设置最终位置
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}