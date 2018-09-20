let cube: shape.Cube = new shape.Cube([0, 0, -40], 40, 80, 60, 1)
let camera: number[] = [0, 0, 180]

game.onUpdateInterval(100, function () {
    cube.rotate(Math.PI / 20, shape.Axis.X)
    cube.rotate(Math.PI / 30, shape.Axis.Y)
    cube.rotate(Math.PI / 40, shape.Axis.Z)
})

game.onPaint(function () {
    screen.fill(0)
    cube.draw(camera)
})



/*let point8: number[] = []
let point7: number[] = []
let point6: number[] = []
let point5: number[] = []
let point4: number[] = []
let point3: number[] = []
let point2: number[] = []
let point1: number[] = []
let center: number[] = []
let camera: number[] = []
let plane = 0
let angle = 0



plane = 0
camera = [0, 0, 180]
center = [0, 0, -40]
point1 = [20, 20, -20]
point2 = [20, -20, -20]
point3 = [-20, 20, -20]
point4 = [-20, -20, -20]
point5 = [20, 20, -60]
point6 = [20, -20, -60]
point7 = [-20, 20, -60]
point8 = [-20, -20, -60]


function convertToScreen(point: number[]): number[] {
    let factor = - point[2] / (point[2] - camera[2])
    return [point[0] + (factor * (point[0] - camera[0])), point[1] + (factor * (point[1] - camera[1]))]
}
function translateToCenter(point: number[], scale: number): number[] {
    return [(scale * point[0]) + (scene.screenWidth() / 2), (scale * point[1]) + (scene.screenHeight() / 2)]
}
game.onPaint(function () {
    screen.fill(0)
    let scale = 1
    let convertedPoint1 = translateToCenter(convertToScreen(point1), scale)
    let convertedPoint2 = translateToCenter(convertToScreen(point2), scale)
    let convertedPoint3 = translateToCenter(convertToScreen(point3), scale)
    let convertedPoint4 = translateToCenter(convertToScreen(point4), scale)
    drawLine(convertedPoint1, convertedPoint2)
    drawLine(convertedPoint2, convertedPoint4)
    drawLine(convertedPoint4, convertedPoint3)
    drawLine(convertedPoint3, convertedPoint1)

    let convertedPoint5 = translateToCenter(convertToScreen(point5), scale)
    let convertedPoint6 = translateToCenter(convertToScreen(point6), scale)
    let convertedPoint7 = translateToCenter(convertToScreen(point7), scale)
    let convertedPoint8 = translateToCenter(convertToScreen(point8), scale)
    drawLine(convertedPoint5, convertedPoint6)
    drawLine(convertedPoint6, convertedPoint8)
    drawLine(convertedPoint8, convertedPoint7)
    drawLine(convertedPoint7, convertedPoint5)

    drawLine(convertedPoint1, convertedPoint5)
    drawLine(convertedPoint2, convertedPoint6)
    drawLine(convertedPoint3, convertedPoint7)
    drawLine(convertedPoint4, convertedPoint8)
})
function drawLine(a: number[], b: number[]) {
    screen.drawLine(a[0], a[1], b[0], b[1], 1)
}
function rotate(point: number[], angle: number): number[] {

    let x = (Math.cos(angle) * point[0]) - (Math.sin(angle) * (point[2] + 40))
    let z = (Math.sin(angle) * point[0]) + (Math.cos(angle) * (point[2] + 40)) - 40

    let out: number[] = [x, point[1], z]

    return out
}

function rotate2(point: number[], angle: number): number[] {

    let x = (Math.cos(angle) * point[0]) - (Math.sin(angle) * (point[1]))
    let y = (Math.sin(angle) * point[0]) + (Math.cos(angle) * (point[1]))

    let out: number[] = [x, y, point[2]]

    return out
}

function rotate3(point: number[], angle: number): number[] {

    let y = (Math.cos(angle) * point[1]) - (Math.sin(angle) * (point[2] + 40))
    let z = (Math.sin(angle) * point[1]) + (Math.cos(angle) * (point[2] + 40)) - 40

    let out: number[] = [point[0], y, z]

    return out
}

game.onUpdateInterval(100, function () {
    rotateAll()
    //camera[2] = 5 + 3 * Math.sin(control.millis() / 1000)
})

function rotateAll() {
    angle = -controller.dx(100 * (Math.PI / 60))

    point1 = rotate(point1, angle)
    point2 = rotate(point2, angle)
    point3 = rotate(point3, angle)
    point4 = rotate(point4, angle)
    point5 = rotate(point5, angle)
    point6 = rotate(point6, angle)
    point7 = rotate(point7, angle)
    point8 = rotate(point8, angle)


    angle = -controller.dy(100 * (Math.PI / 60))
    point1 = rotate3(point1, angle)
    point2 = rotate3(point2, angle)
    point3 = rotate3(point3, angle)
    point4 = rotate3(point4, angle)
    point5 = rotate3(point5, angle)
    point6 = rotate3(point6, angle)
    point7 = rotate3(point7, angle)
    point8 = rotate3(point8, angle)


    if (controller.A.isPressed()) {
        angle = 2 * (Math.PI / 60)
    } else if (controller.B.isPressed()) {
        angle = -2 * (Math.PI / 60)
    } else {
        angle = 0
    }
    point1 = rotate2(point1, angle)
    point2 = rotate2(point2, angle)
    point3 = rotate2(point3, angle)
    point4 = rotate2(point4, angle)
    point5 = rotate2(point5, angle)
    point6 = rotate2(point6, angle)
    point7 = rotate2(point7, angle)
    point8 = rotate2(point8, angle)

    console.log("p1 x = " + point1[0] + ", y = " + point1[1] + ", z = " + point1[2])
    console.log("p2 x = " + point2[0] + ", y = " + point2[1] + ", z = " + point2[2])
    console.log("p3 x = " + point3[0] + ", y = " + point3[1] + ", z = " + point3[2])
    console.log("p4 x = " + point4[0] + ", y = " + point4[1] + ", z = " + point4[2])

    console.log("p5 x = " + point5[0] + ", y = " + point5[1] + ", z = " + point5[2])
    console.log("p6 x = " + point6[0] + ", y = " + point6[1] + ", z = " + point6[2])
    console.log("p7 x = " + point7[0] + ", y = " + point7[1] + ", z = " + point7[2])
    console.log("p8 x = " + point8[0] + ", y = " + point8[1] + ", z = " + point8[2])


}
*/
