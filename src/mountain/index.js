import { createNoise2D } from 'simplex-noise'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100)
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
mesh.rotateX(Math.PI / 2)

const noise2D = createNoise2D()
function updatePosition() {
    const positions = geometry.attributes.position

    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)

        const z = noise2D(x / 300, y / 300) * 50
        const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10
        positions.setZ(i, z + sinNum)
    }
    positions.needsUpdate = true
}

scene.add(mesh)

const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper

const width = window.innerWidth
const height = window.innerHeight

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
camera.position.set(450, 150, 100)

camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)

function render() {
    updatePosition()
    mesh.rotateZ(0.003)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()

document.body.append(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
