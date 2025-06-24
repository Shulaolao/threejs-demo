import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const geometry = new THREE.SphereGeometry(80)
const texture = loader.load('/material-texture/muxing/muxing.jpg')
texture.colorSpace = THREE.SRGBColorSpace
texture.wrapS = THREE.RepeatWrapping // 水平
texture.wrapT = THREE.RepeatWrapping // 竖直

const material = new THREE.MeshBasicMaterial({
    map: texture,
})

export default new THREE.Mesh(geometry, material)
