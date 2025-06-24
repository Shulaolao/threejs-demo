import * as THREE from 'three'
import { planets } from './config.js'

const radiuszoom = 14 // 放大半径
const revoluteRadUint = 100 // 轨道半径 1au

/**
 * 生成行星
 * @param {*} name
 * @returns { mesh, line }
 */
export const generatePlanet = (name) => {
    const planetInfo = planets[name]
    if (!Object.keys(planetInfo ?? {}).length) return ({})

    const { eccentricity: e, inclination: i, revolutionSpeed: r, au } = planetInfo
    const loader = new THREE.TextureLoader()
    const texture = loader.load(`/src/solar-system/images/${planetInfo.map}`)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping // 水平
    texture.wrapT = THREE.RepeatWrapping // 竖直
    const geometry = new THREE.SphereGeometry(planetInfo.radius * radiuszoom)
    const material = new THREE.MeshBasicMaterial({
        map: texture,
    })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(revoluteRadUint * au, 0, 0)
    const points = []
    for (let thera = 0; thera <= 2 * Math.PI; thera += 0.01) {
        const { x, y, z } = getMeshV3Position(thera)
        points.push(new THREE.Vector3(x, y, z))
    }

    const trackCurve = new THREE.EllipseCurve(0, 0, revoluteRadUint * au, revoluteRadUint * au * Math.sqrt(1 - e * e), 0, 2 * Math.PI, false, 0)
    const pointsList = trackCurve.getPoints(50)
    const trackGeo = new THREE.BufferGeometry()
    trackGeo.setFromPoints(points)
    const trackMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xffffff),
    })
    const track = new THREE.LineLoop(trackGeo, trackMaterial)

    function getMeshV3Position(thera) {
        const z = revoluteRadUint * au * Math.sqrt(1 - e ** 2) * Math.sin(thera)
        return {
            x: revoluteRadUint * au * Math.cos(thera),
            z,
            y: z * Math.sin(i)
        }
    }

    function updateMeshPosition(time) {
        const thera = time * r
        const { x, y, z } = getMeshV3Position(thera)
        mesh.position.set(x, y, z)
    }

    return {
        mesh,
        track,
        updateMeshPosition,
    }
}