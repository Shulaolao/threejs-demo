import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const texture = loader.load('/solar-system/images/sun.jpg')
texture.colorSpace = THREE.SRGBColorSpace
texture.wrapS = THREE.RepeatWrapping // 水平
texture.wrapT = THREE.RepeatWrapping // 竖直
const geometry = new THREE.SphereGeometry(80)
const material = new THREE.MeshBasicMaterial({
    map: texture,
    emissive: 0xffffee,  // 自发光颜色
    emissiveIntensity: 1.5
})
const mesh = new THREE.Mesh(geometry, material)

// 创建光晕层
const sunGlowGeometry = new THREE.SphereGeometry(5.5, 32, 32);
const sunGlowMaterial = new THREE.ShaderMaterial({
    uniforms: {
        glowColor: { value: new THREE.Color(0xffee88) },
        intensity: { value: 1.8 }
    },
    vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 glowColor;
    uniform float intensity;
    varying vec3 vNormal;
    
    void main() {
      float glow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(glowColor, glow * intensity);
    }
  `,
    transparent: true,
    side: THREE.BackSide
});
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
// mesh.add(sunGlow)

export default mesh;
