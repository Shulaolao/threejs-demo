import * as THREE from 'three'

const loader = new THREE.TextureLoader()

// 地基
const foundationTexture = loader.load('./src/house/foundation.jpg')
foundationTexture.colorSpace = THREE.SRGBColorSpace

const foundationHeight = 300
const foundationWidth = 3000
const foundationLength = 4000
const foundGeometry = new THREE.BoxGeometry(foundationLength, foundationHeight, foundationWidth)
const foundMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('grey'),
    map: foundationTexture,
    aoMap: foundationTexture,
})
const foundMesh = new THREE.Mesh(foundGeometry, foundMaterial)
foundMesh.translateY(10)

// 侧壁
const shape = new THREE.Shape()
shape.moveTo(0, 3000)
shape.lineTo(-1500, 2000)
shape.lineTo(-1500, 0)
shape.lineTo(1500, 0)
shape.lineTo(1500, 2000)

const windowPath = new THREE.Path()
windowPath.moveTo(800, 700)
windowPath.lineTo(800, 1600)
windowPath.lineTo(-800, 1600)
windowPath.lineTo(-800, 700)
shape.holes.push(windowPath)

const depth = 100
const wallTexture = loader.load('./src/house/wall.jpg')
wallTexture.colorSpace = THREE.SRGBColorSpace
wallTexture.wrapS = THREE.RepeatWrapping
wallTexture.wrapT = THREE.RepeatWrapping
wallTexture.repeat.x = 0.0005
wallTexture.repeat.y = 0.0005
// 墙壁厚度
const sideWallGeometry = new THREE.ExtrudeGeometry(shape, {
    depth,
})
const sideWallMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgrey'),
    map: wallTexture,
    aoMap: wallTexture,
})
const sideWallMesh = new THREE.Mesh(sideWallGeometry, sideWallMaterial)
sideWallMesh.rotation.y = Math.PI / 2
sideWallMesh.translateY(foundationHeight / 2)
sideWallMesh.translateZ(-2000)

const sideWallMesh2 = new THREE.Mesh(sideWallGeometry, sideWallMaterial)
sideWallMesh2.rotation.y = Math.PI / 2
sideWallMesh2.translateY(foundationHeight / 2)
sideWallMesh2.translateZ(2000 - depth)

const bindTexture = loader.load('./src/house/wall.jpg') 
bindTexture.colorSpace = THREE.SRGBColorSpace
bindTexture.wrapS = THREE.RepeatWrapping
bindTexture.repeat.x = 2
const behindWallGeometry = new THREE.BoxGeometry(4000, 2000, depth)
const behindWallMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgrey'),
    map: bindTexture,
    aoMap: bindTexture,
})
const behindMesh = new THREE.Mesh(behindWallGeometry, behindWallMaterial)
// behindMesh.translateZ(-1500 + depth/2)
// behindMesh.translateY(1000 + foundationHeight / 2)
behindMesh.translateY(1150);
behindMesh.translateZ(-1450);

const frontShape = new THREE.Shape()
frontShape.moveTo(2000, 0)
frontShape.lineTo(2000, 2000)
frontShape.lineTo(-2000, 2000)
frontShape.lineTo(-2000, 0)

const middleLineYDist = 500
const doorWidth = 1100
const doorHeight = 1600
const doorPath = new THREE.Path()
doorPath.moveTo(-middleLineYDist, 0)
doorPath.lineTo(-middleLineYDist-doorWidth, 0)
doorPath.lineTo(-middleLineYDist-doorWidth, doorHeight)
doorPath.lineTo(-middleLineYDist, doorHeight)
frontShape.holes.push(doorPath)

const frontWinPath = new THREE.Path()
frontWinPath.moveTo(500, middleLineYDist)
frontWinPath.lineTo(doorHeight, middleLineYDist)
frontWinPath.lineTo(doorHeight, doorHeight)
frontWinPath.lineTo(500, doorHeight)
frontShape.holes.push(frontWinPath)

const frontWallGeometry = new THREE.ExtrudeGeometry(frontShape, {
    depth,
})
const frontWallMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('lightgrey'),
    map: wallTexture,
    aoMap: wallTexture,
})
const frontWallMesh = new THREE.Mesh(frontWallGeometry, frontWallMaterial)
frontWallMesh.translateZ(1500 - depth)
frontWallMesh.translateY(foundationHeight / 2)

const stepShape = new THREE.Shape()
stepShape.moveTo(0, 150)
stepShape.lineTo(-200, 150)
stepShape.lineTo(-200, 50)
stepShape.lineTo(-400, 50)
stepShape.lineTo(-400, -50)
stepShape.lineTo(-600, -50)
stepShape.lineTo(-600, -150)
stepShape.lineTo(0, -150)
const stepGeometry = new THREE.ExtrudeGeometry(stepShape, {
    depth: doorWidth
})
const stepTexture = loader.load('./src/house/foundation.jpg')
stepTexture.wrapS = THREE.RepeatWrapping;
stepTexture.wrapT = THREE.RepeatWrapping;
stepTexture.colorSpace = THREE.SRGBColorSpace
stepTexture.repeat.x = 0.001;
stepTexture.repeat.y = 0.001;
const stepMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('grey'),
    map: stepTexture,
    aoMap: stepTexture,
})
const stepMesh = new THREE.Mesh(stepGeometry, stepMaterial)
stepMesh.rotateY(Math.PI / 2)
stepMesh.position.set(-middleLineYDist - doorWidth, 0, foundationWidth / 2)

// 屋顶
const roof = {
    length: 4200,
    width: 2000,
    height: 100,
}
const roofTexture = loader.load('./src/house/roof.jpg')
const roofGeometry = new THREE.BoxGeometry(roof.length, roof.width, roof.height);
const roofMaterial = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('red'),
    map: roofTexture,
    aoMap: roofTexture,
});
const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial)
roofMesh.rotateX(Math.PI/180 * 56)
roofMesh.position.set(0, 2500 + 100, -800)
// roofMesh.translateZ(-Math.sqrt(roof.width**2, 2)/2)
// roofMesh.translateY(Math.sqrt(roof.width**2, 2)/2)
const roofMesh2 = roofMesh.clone()
roofMesh2.rotateX(70*Math.PI/180)
roofMesh2.position.z = -roofMesh.position.z

const texture = loader.load('./src/house/grass.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 20;
texture.repeat.y = 20;

const geometry = new THREE.PlaneGeometry(100000, 100000);
const material = new THREE.MeshLambertMaterial({
    // color: new THREE.Color('green'),
    map: texture,
    aoMap: texture
});
const grass = new THREE.Mesh(geometry, material);
grass.rotateX( -Math.PI / 2);
grass.position.y = -150;

const house = new THREE.Group()
house.add(foundMesh)
house.add(sideWallMesh)
house.add(sideWallMesh2)
house.add(behindMesh)
house.add(frontWallMesh)
house.add(stepMesh)
house.add(roofMesh)
house.add(roofMesh2)
house.add(grass)

export default house