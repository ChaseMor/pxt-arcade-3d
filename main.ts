let cube: shapes3d.Cube = new shapes3d.Cube([0, 0, 40], 40, 80, 60, 1, 1)
let camera: number[] = [0, 0, -200]


game.onUpdateInterval(100, function () {
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
})

game.onUpdate(function () {
    cube.translate(-controller.dy(), shapes3d.Axis.Z)
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    camera[2] = -200
})


controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    camera[2] = -75
})

