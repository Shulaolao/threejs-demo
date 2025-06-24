import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const texture = loader.load('/material-texture/zhuan.jpg')
texture.wrapS = THREE.RepeatWrapping // 水平
texture.wrapT = THREE.RepeatWrapping // 竖直
texture.repeat.set(3, 3) // 重复次数
texture.colorSpace = THREE.SRGBColorSpace

const geometry = new THREE.PlaneGeometry(1000, 1000)
const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    aoMap: texture,
})

export default new THREE.Mesh(geometry, material)