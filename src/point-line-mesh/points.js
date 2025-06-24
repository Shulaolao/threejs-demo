import * as THREE from 'three'

const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    0, 0, 100,
    100, 100, 0
])

// attribute 存储的是三元组（例如顶点空间坐标、法向量或颜色值）则itemSize的值应该是3
const attribute = new THREE.BufferAttribute(vertices, 3)
geometry.attributes.position = attribute

const material = new THREE.PointsMaterial({
    color: new THREE.Color('organe'),
    size: 10,
})

export const points = new THREE.Points(geometry, material)
