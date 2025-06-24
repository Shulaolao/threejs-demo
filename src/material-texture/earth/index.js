import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const geometry = new THREE.SphereGeometry(500)
const texture = loader.load('/material-texture/diqiu.jpg')
texture.colorSpace = THREE.SRGBColorSpace

const material = new THREE.MeshBasicMaterial({
    map: texture,
})

export default new THREE.Mesh(geometry, material)
