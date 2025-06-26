import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import sunMesh from './sun.js';
import { generatePlanet } from './generate.js';
import { planets } from './config.js';

const scene = new THREE.Scene();
const gui = new GUI();

const width = window.innerWidth
const height = window.innerHeight

const planetUpdateFun = {}

scene.add(sunMesh)

Object.keys(planets).filter(item => !['sun', 'moon'].includes(item)).forEach(planet => {
    const { mesh = {}, track = {}, updateMeshPosition = () => { } } = generatePlanet(planet)
    scene.add(mesh, track)
    planetUpdateFun[planet] = updateMeshPosition
})

const pointLight = new THREE.PointLight(0xffffff, 10000000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x333333, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(50000);
scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(60, width / height, 1, Math.pow(10, 8));
camera.position.set(600, 0, 0);
camera.rotation.set(Math.PI / 2, 0, 0)
camera.lookAt(0, 0, 0);
const cameraFolder = gui.addFolder('相机控件')
const obj = {
    cameraDist: 1,
}
cameraFolder.add(obj, 'cameraDist').min(-100).step(0.1).onChange((val) => {
    // const position = camera.position
    // position.set(val + 100, val + 0, val + 600)
    // camera.updateProjectionMatrix()
})

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    const time = Date.now() * 0.00001
    Object.values(planetUpdateFun).forEach(updateMeshPosition => {
        updateMeshPosition && updateMeshPosition(time)
    });
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.addEventListener('change', () => {
    // console.log(camera.position);
})

/**
 * 实现球体发光
 * @param color 颜色的r,g和b值,比如：“123,123,123”;
 * @returns {Element} 返回canvas对象
 */
const generateSprite = function (color) {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2,
        canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(' + color + ',1)');
    gradient.addColorStop(0.2, 'rgba(' + color + ',1)');
    gradient.addColorStop(0.4, 'rgba(' + color + ',.6)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
};
// 添加太阳发光效果
const centerBallLite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(generateSprite('255, 252, 63')),
    blending: THREE.AdditiveBlending
}));
centerBallLite.scale.x = centerBallLite.scale.y = centerBallLite.scale.z = 1;
scene.add(centerBallLite);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})