import * as THREE from 'three'

const pointsArr = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(20, 80),
    new THREE.Vector2(0, 150),
]

// LatheGeometry 轴对称性的网格
const latheGeometry = new THREE.LatheGeometry(pointsArr, 10)
const latheMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink')
})

const LatheMesh = new THREE.Mesh(latheGeometry, latheMaterial)

const p1 = new THREE.Vector3(-100, 0, 0)
const p2 = new THREE.Vector3(50, 100, 0)
const p3 = new THREE.Vector3(100, 20, 100)
const p4 = new THREE.Vector3(0, 0, 100)
const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4)
const lineGeometry = new THREE.BufferGeometry()
lineGeometry.setFromPoints([p1, p2, p3, p4])
const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange')
})
const lineMesh = new THREE.Line(lineGeometry, lineMaterial)
// TubeGeometry 沿着三维曲线延伸的管道  路径 分段 半径 横截面分段 闭合与否
const tubeGeometry = new THREE.TubeGeometry(curve, 50, 20, 20, false)
const tubeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    wireframe: true,
})
const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
tubeMesh.add(lineMesh)

const points = [
    new THREE.Vector2(100, 0),
    new THREE.Vector2(0, 100),
    new THREE.Vector2(-100, 0)
];

const shape = new THREE.Shape(points)
// const shape = new THREE.Shape()
// shape.moveTo(100, 0)
// shape.lineTo(50, 20)
// shape.lineTo(0, 0)
// shape.lineTo(0, 0)
// shape.lineTo(0, 50)
// shape.lineTo(50, 100)
// Path 二维路径
const path = new THREE.Path()
// arc 弧线 中心点 x y 半径 起始角 终止角 顺时针
path.arc(0, 40, 20)
// holes 孔洞数组
shape.holes.push(path)

// const shapeGeometry = new THREE.ShapeGeometry(shape)
// ExtrudeGeometry 从一 个二维的形状中挤压出来的一个三位盒子
const shapeGeometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100,
})
const shapeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide,
})
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial)

// CatmullRomCurve3 一条平滑的三维样条曲线，三维点数组、是否闭合、类型、张力
const catMullRomPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, -100, -100),
    new THREE.Vector3(-50, -40, 0),
    new THREE.Vector3(10, 0, 50),
    new THREE.Vector3(100, 50, 60),
    new THREE.Vector3(120, 120, 80),
    new THREE.Vector3(120, 160, 120),
])
const catMullRomGeometry = new THREE.TubeGeometry(catMullRomPath, 100, 10, 30)
const texture = new THREE.TextureLoader().load('/src/generate-geometry/tube.jpg')
texture.wrapS = THREE.RepeatWrapping
texture.repeat.x = 20
texture.colorSpace = THREE.SRGBColorSpace
const catMullRomMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('pink'),
    side: THREE.DoubleSide,
    map: texture,
    aoMap: texture,
})
const catMullRomMesh = new THREE.Mesh(catMullRomGeometry, catMullRomMaterial)
const tubePoints = catMullRomPath.getPoints(1000)

// CylinderGeometry 圆柱体 顶部、底部半径 高度 横截面分段 竖截面分段 圆扇区是否开口 分段起始角度 底面中心角
const cylinderGeometry = new THREE.CylinderGeometry(30, 50, 1000, 32, 32, true)
const cylinderTexture = new THREE.TextureLoader().load('/src/generate-geometry/storm.jpg')
cylinderTexture.wrapS = THREE.RepeatWrapping
cylinderTexture.wrapT = THREE.RepeatWrapping
cylinderTexture.colorSpace = THREE.SRGBColorSpace
cylinderTexture.repeat.set(1, 2)
const cylinderMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    alphaMap: cylinderTexture, // 一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）
    side: THREE.BackSide,
})
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)

export {
    LatheMesh,
    tubeMesh,
    shapeMesh,
    catMullRomMesh,
    tubePoints,
    cylinderMesh,
}