let cube: shapes3d.Cube = new shapes3d.Cube([0, 0, 40], 80, 60, 40, 1, 1)
let rightWall: shapes3d.Cube = new shapes3d.Cube([40, 0, 40], 10, 60, 300, 1, 1)
let leftWall: shapes3d.Cube = new shapes3d.Cube([-40, 0, 40], 10, 60, 300, 1, 1)
let otherCube: shapes3d.Cube = new shapes3d.Cube([240, 0, 40], 80, 60, 40, 1, 1)
otherCube.rotate(Math.PI / 4, shapes3d.Axis.Y)
let camera: number[] = [0, 0, -200, 0]


game.onUpdateInterval(50, function () {
    cube.rotate(Math.PI / 20, shapes3d.Axis.X)
    cube.rotate(Math.PI / 30, shapes3d.Axis.Y)
    cube.rotate(Math.PI / 40, shapes3d.Axis.Z)
    //cube.translate(2 * Math.sin(control.millis() / 1000), shape.Axis.X)
    //cube.translate(2 * Math.sin(control.millis() / 1000), shape.Axis.Y)
    //cube.translate(5 * Math.sin(control.millis() / 1000), shape.Axis.Z)
})

game.onPaint(function () {
    screen.fill(0)
    cube.draw(camera)
    rightWall.draw(camera)
    leftWall.draw(camera)
    otherCube.draw(camera)
})

game.onUpdate(function () {
    camera[0] += -controller.dy(30) * Math.sin(camera[3])
    camera[2] += -controller.dy(30) * Math.cos(camera[3])
    camera[3] += controller.dx(1)
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    camera[2] = -200
})


controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    camera[2] = -75
})

