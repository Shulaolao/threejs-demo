import * as THREE from 'three'

// EllipseCurve 椭圆曲线
const arc = new THREE.EllipseCurve(0, 0, 100, 100, 0, Math.PI / 2)
const pointsList = arc.getPoints(50) // 获取分段的顶点坐标

const geometry = new THREE.BufferGeometry()
geometry.setFromPoints(pointsList) // 设置分段顶点坐标，保存 Vector2 或 Vector3 的实例

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange'),
    side: THREE.DoubleSide,
})

const curve = new THREE.Line(geometry, material)

const arr = [
    new THREE.Vector2(-100, 0),
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, -50),
    // new THREE.Vector2(100, -30),
    new THREE.Vector2(100, 0)
]

// SplineCurve 平滑的二维样条曲线，连接多个点
const spline = new THREE.SplineCurve(arr)
const pointsArr = spline.getPoints(20)

const splineGeometry = new THREE.BufferGeometry()
splineGeometry.setFromPoints(pointsArr)
const splineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange'),
    // side: THREE.DoubleSide,
})
const splineLine = new THREE.Line(splineGeometry, splineMaterial)

const pointsMaterial = new THREE.PointsMaterial({
    color: new THREE.Color('pink'),
    size: 5,
})
const points = new THREE.Points(splineGeometry, pointsMaterial)
splineLine.add(points)

const geometry2 = new THREE.BufferGeometry()
geometry2.setFromPoints(arr)
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('green'),
    size: 10,
})
const point = new THREE.Points(geometry2, material2)
const line = new THREE.Line(geometry2, new THREE.LineBasicMaterial())
splineLine.add(point, line)

const v1 = new THREE.Vector2(0, 0)
const v2 = new THREE.Vector2(-40, 100)
const v3 = new THREE.Vector2(100, 0)
// QuadraticBezierCurve 二次贝塞尔曲线
const bezierCurve = new THREE.QuadraticBezierCurve(v1, v2, v3)
const bezierPoints = bezierCurve.getPoints(20)
const bezierGeometry = new THREE.BufferGeometry()
bezierGeometry.setFromPoints(bezierPoints)
const bezierMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange'),
})
const bezierLine = new THREE.Line(bezierGeometry, bezierMaterial)

const geometry3 = new THREE.BufferGeometry()
geometry3.setFromPoints([v1, v2, v3])
const material3 = new THREE.PointsMaterial({
    color: new THREE.Color('green'),
    size: 10,
})
const point2 = new THREE.Points(geometry3, material3)
const line2 = new THREE.Line(geometry3, new THREE.LineBasicMaterial())
bezierLine.add(point2, line2)

const p1 = new THREE.Vector3(50, 0, 50)
const p2 = new THREE.Vector3(50, 100, 0)
const p3 = new THREE.Vector3(-100, 0, 0)
const p4 = new THREE.Vector3(-100, 50, 100)
// CubicBezierCurve3 三次贝塞尔曲线
const bezierCurve3 = new THREE.QuadraticBezierCurve3(p1, p2, p3, p4)
const bezier3Points = bezierCurve3.getPoints(20)
const bezier3Geometry = new THREE.BufferGeometry()
bezier3Geometry.setFromPoints(bezier3Points)
const bezier3Material = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange'),
})
const bezier3Line = new THREE.Line(bezier3Geometry, bezier3Material)

const geometry4 = new THREE.BufferGeometry()
geometry4.setFromPoints([p1, p2, p3, p4])
const material4 = new THREE.PointsMaterial({
    color: new THREE.Color('green'),
    size: 10,
})
const point3 = new THREE.Points(geometry4, material4)
const line3 = new THREE.Line(geometry4, new THREE.LineBasicMaterial())
bezier3Line.add(point3, line3)

const p5 = new THREE.Vector3(40, -50, 100)
const p6 = new THREE.Vector3(70, 100, -100)
// LineCurve 连接两个端点的直线线段
const lineCurve1 = new THREE.LineCurve(p1, p2)
const lineCurve2 = new THREE.LineCurve(p3, p4)
const lineCurve3 = new THREE.LineCurve3(p1, p2, p3)
const lineCurve4 = new THREE.LineCurve3(p4, p5, p6)
// CurvePath 传入多条曲线，组合起来
const curvePath = new THREE.CurvePath()
curvePath.add(lineCurve1)
curvePath.add(lineCurve2)
curvePath.add(lineCurve3)
curvePath.add(lineCurve4)
curvePath.add(arc)
const curvePathPoints = curvePath.getPoints(20)
const geometry5 = new THREE.BufferGeometry()
geometry5.setFromPoints(curvePathPoints)
const material5 = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange'),
})
const compositeLine = new THREE.Line(geometry5, material5)

export {
    curve,
    splineLine,
    bezierLine,
    bezier3Line,
    compositeLine,
}