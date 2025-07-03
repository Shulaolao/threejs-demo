export const planets = {
    sun: {
        radius: 50,
    },
    // 月球
    moon: {
        radius: 0.27,
        au: 0,
        eccentricity: 0,
        inclination: 0,
        map: 'moon.jpg',
    },
    earth: {
        radius: 1,
        au: 10, // 轨道半径 1au: 50-100
        eccentricity: 0.017, // 轨道偏心率
        inclination: 0, // 轨道倾斜角
        map: 'earth_specular.tif',
        day_map: 'earth_day.jpg',
        night_map: 'earth_night.jpg',
        revolutionSpeed: 1, // 公转速度
    },
    // 水星
    mercury: {
        radius: 0.4,
        au: 4,
        eccentricity: 0.206,
        inclination: 7,
        map: 'mercury.jpg',
        revolutionSpeed: 0.24,
    },
    // 金星
    venus: {
        radius: 0.85,
        au: 7.5,
        eccentricity: 0.007,
        inclination: 3.4,
        map: 'venus_surface.jpg',
        revolutionSpeed: 0.62,
    },
    // 火星
    mars: {
        radius: 0.6,
        au: 15,
        eccentricity: 0.093,
        inclination: 1.9,
        map: 'mars.jpg',
        revolutionSpeed: 1.88,
    },
    // 木星
    jupiter: {
        radius: 4,
        au: 20,
        eccentricity: 0.048,
        inclination: 1.3,
        map: 'jupiter.jpg',
        revolutionSpeed: 11.86,
    },
    // 土星
    saturn: {
        radius: 3,
        au: 25,
        eccentricity: 0.056,
        inclination: 2.5,
        map: 'saturn.jpg',
        revolutionSpeed: 29.46,
    },
    // 天王星
    uranus: {
        radius: 2,
        au: 30,
        eccentricity: 0.046,
        inclination: 0.8,
        map: 'uranus.jpg',
        revolutionSpeed: 84.01,
    },
    // 海王星
    neptune: {
        radius: 1.8,
        au: 35,
        eccentricity: 0.01,
        inclination: 1.8,
        map: 'neptune.jpg',
        revolutionSpeed: 164.8,
    },
}