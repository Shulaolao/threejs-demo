import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { mesh as mesh2, meshCylineder, meshPlane } from '../point-line-mesh/mesh.js'
import bkbMesh from '../basketballMesh/index.js'

const scene = new THREE.Scene()

{
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color('orange'),
        side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    // scene.add(mesh)
    // scene.add(meshCylineder)
    scene.add(bkbMesh)

    const gui = new GUI()

    const meshFolder = gui.addFolder('立方体')
    meshFolder.addColor(mesh.material, 'color')
    meshFolder.add(mesh.position, 'x').step(0.1)
    meshFolder.add(mesh.position, 'y').step(0.1)
    meshFolder.add(mesh.position, 'z').step(0.1)

    const pointLight = new THREE.PointLight(0xffffff, 10000)
    pointLight.position.set(80, 80, 80)
    scene.add(pointLight)

    const lightFolder = gui.addFolder('灯光')
    lightFolder.add(pointLight.position, 'x').step(0.1)
    lightFolder.add(pointLight.position, 'y').step(0.1)
    lightFolder.add(pointLight.position, 'z').step(0.1)
    lightFolder.add(pointLight, 'intensity').step(10)

    const axesHelper = new THREE.AxesHelper(500)
    scene.add(axesHelper)

    const otherFolder = gui.addFolder('其他控件')
    const obj = {
        a: 1,
        b: '2',
        c: 1,
        d: 'aaa',
        logic: () => {
        }
    }

    otherFolder.add(obj, 'a').min(1).max(10).step(0.01).onChange((value) => {
        console.log(value)
    })
    otherFolder.add(obj, 'b')
    otherFolder.add(obj, 'c', [1, 2, 3])
    otherFolder.add(obj, 'd', { Aaa: 0, Bbb: 1, Ccc: 2 })
}
{
    const width = window.innerWidth
    const height = window.innerHeight

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    camera.position.set(200, 200, 200)
    camera.lookAt(0, 0, 0)

    const camera2 = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300)
    let cameraHelper = new THREE.CameraHelper(camera2)
    // scene.add(cameraHelper)

    const gui = new GUI()
    function onChange() {
        camera2.updateProjectionMatrix()
        cameraHelper.update()
    }
    gui.add(camera2, 'fov', [30, 60, 10]).onChange(onChange)
    gui.add(camera2, 'aspect', {
        '16/9': 16 / 9,
        '4/3': 4 / 3,
    })
    gui.add(camera2, 'near', 0, 300).onChange(onChange)
    gui.add(camera2, 'far', 300, 800).onChange(onChange)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)

    function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    render()

    document.body.append(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
}