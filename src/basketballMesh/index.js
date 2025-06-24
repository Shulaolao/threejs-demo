import * as THREE from 'three'
import GUI from 'three/addons/libs/lil-gui.module.min.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(100, 10, 10)
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#671406'),
    side: THREE.DoubleSide,
    wireframe: true,
})
const bkbMesh = new THREE.Mesh(geometry, material)
bkbMesh.position.set(0, 0, 0)
scene.add(bkbMesh)

const ambientLight = new THREE.AmbientLight(0xffffff, 10)
scene.add(ambientLight)

const width = window.innerWidth
const height = window.innerHeight
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(500)
scene.add(axesHelper)

const gui = new GUI()
gui.add(ambientLight, 'intensity').step(0.01)
gui.addColor(bkbMesh.material, 'color')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()

document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)