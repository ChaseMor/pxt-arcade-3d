let cube: shape.Cube = new shape.Cube([0, 0, -40], 40, 80, 60, 1)
let camera: number[] = [0, 0, 180]


game.onUpdateInterval(100, function () {
    cube.rotate(Math.PI / 20, shape.Axis.X)
    cube.rotate(Math.PI / 30, shape.Axis.Y)
    cube.rotate(Math.PI / 40, shape.Axis.Z)
    //cube.translate(2 * Math.sin(control.millis() / 1000), shape.Axis.X)
    //cube.translate(2 * Math.sin(control.millis() / 1000), shape.Axis.Y)
    cube.translate(5 * Math.sin(control.millis() / 1000), shape.Axis.Z)
})

game.onPaint(function () {
    screen.fill(0)
    cube.draw(camera)
})

