import * as THREE from 'three'

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    0, 0, 100,
    100, 100, 0,
    0, 0, 50
]);
const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange')
});

// 连续的线
export const line = new THREE.Line(geometry, material);
// 头尾相接
export const lineLoop = new THREE.LineLoop(geometry, material);
// 每两个顶点一组
export const lineSegments = new THREE.LineSegments(geometry, material);
