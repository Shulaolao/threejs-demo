import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
// import mesh from './material-texture/earth/index.js'
// import mesh from './material-texture/wall/index.js'
// import mesh from './material-texture/muxing/index.js'
import { curve, splineLine, bezierLine, bezier3Line, compositeLine } from './material-texture/curve/index.js'
import { catMullRomMesh, LatheMesh, shapeMesh, tubeMesh, tubePoints } from './generate-geometry/index.js';

const scene = new THREE.Scene();

const gui = new GUI();

const width = window.innerWidth
const height = window.innerHeight

scene.add(catMullRomMesh);

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000000);
// camera.position.set(90, 230, 1175);
camera.position.set(0, 0, 200);
camera.lookAt(0, 0, 0);

// const pointLight = new THREE.PointLight(0xffffff, 10000);
// pointLight.position.set(80, 80, 80);
// scene.add(pointLight);

// 平行光可以投射阴影
const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(100, 100, 100)
scene.add(directionLight)

// 环境光会均匀的照亮场景中的所有物体
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

let i = 0
function render() {
    // mesh.material.map.offset.x += 0.001;
    if (i < tubePoints.length - 1) {
        camera.position.copy(tubePoints[i])
        camera.lookAt(tubePoints[i + 1])
        // i++
    } else {
        i = 0
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.addEventListener('change', () => {
    // console.log(camera.position);
})

document.addEventListener('keydown', (e) => {
    if (i > tubePoints.length - 1 || i < 0) {
        i = 0
        return
    }
    if (e.code === 'ArrowDown') {
        i++
    } else if (e.code === 'ArrowUp') {
        i--
    }
})
