import * as THREE from 'three'

const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    100, 100, 0
])

const attribute = new THREE.BufferAttribute(vertices, 3)
geometry.attributes.position = attribute

const indexes = new Uint16Array([
    0, 1, 2, 2, 1, 3
])
geometry.index = new THREE.BufferAttribute(indexes, 1)

// MeshBasicMaterial 基础网格材质
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    side: THREE.DoubleSide,
})

export const mesh = new THREE.Mesh(geometry, material)

// PlaneGeometry 平面缓冲几何
const geometryPlane = new THREE.PlaneGeometry(100, 100, 3, 2)

const materialPlane = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true,
})

export const meshPlane = new THREE.Mesh(geometryPlane, materialPlane)

// 圆柱缓冲几何
const geometryCylineder = new THREE.CylinderGeometry(50, 50, 80, 100)

const materialCylineder = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true,
})

export const meshCylineder = new THREE.Mesh(geometryCylineder, materialCylineder)
