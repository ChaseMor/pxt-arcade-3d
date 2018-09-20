namespace shape {
    export class Cube implements Shape {
        center: number[]
        color: number

        points: number[][]
        constructor(center: number[], width: number, height: number, length: number, color?: number) {
            this.center = center
            this.points = [[], [], [], [], [], [], [], []]
            //front-half
            this.points[0] = [center[0] + width / 2, center[1] + height / 2, center[2] + length / 2]
            this.points[1] = [center[0] + width / 2, center[1] - height / 2, center[2] + length / 2]
            this.points[2] = [center[0] - width / 2, center[1] - height / 2, center[2] + length / 2]
            this.points[3] = [center[0] - width / 2, center[1] + height / 2, center[2] + length / 2]

            //back-half
            this.points[4] = [center[0] + width / 2, center[1] + height / 2, center[2] - length / 2]
            this.points[5] = [center[0] + width / 2, center[1] - height / 2, center[2] - length / 2]
            this.points[6] = [center[0] - width / 2, center[1] - height / 2, center[2] - length / 2]
            this.points[7] = [center[0] - width / 2, center[1] + height / 2, center[2] - length / 2]

            this.color = color ? color : 1
        }

        rotate(angle: number, axis: Axis) {
            switch (axis) {
                case Axis.X:
                    for (let i = 0; i < this.points.length; i++) {
                        let x = this.points[i][0]
                        let y = (Math.cos(angle) * (this.points[i][1] - this.center[1]))
                            - (Math.sin(angle) * ((this.points[i][2] - this.center[2]))) + this.center[1]
                        let z = (Math.sin(angle) * (this.points[i][1] - this.center[1]))
                            + (Math.cos(angle) * ((this.points[i][2] - this.center[2]))) + this.center[2]
                        this.points[i] = [x, y, z]
                    }
                    break
                case Axis.Y:
                    for (let i = 0; i < this.points.length; i++) {
                        let x = (Math.cos(angle) * (this.points[i][0] - this.center[0]))
                            - (Math.sin(angle) * ((this.points[i][2] - this.center[2]))) + this.center[0]
                        let y = this.points[i][1]
                        let z = (Math.sin(angle) * (this.points[i][0] - this.center[0]))
                            + (Math.cos(angle) * ((this.points[i][2] - this.center[2]))) + this.center[2]
                        this.points[i] = [x, y, z]
                    }
                    break
                case Axis.Z:
                    for (let i = 0; i < this.points.length; i++) {
                        let x = (Math.cos(angle) * (this.points[i][0] - this.center[0]))
                            - (Math.sin(angle) * ((this.points[i][1] - this.center[1]))) + this.center[0]
                        let y = (Math.sin(angle) * (this.points[i][0] - this.center[0]))
                            + (Math.cos(angle) * ((this.points[i][1] - this.center[1]))) + this.center[1]
                        let z = this.points[i][2]
                        this.points[i] = [x, y, z]
                    }
                    break
            }
        }



        translate(distance: number, axis: Axis) {
            for (let i = 0; i < this.points.length; i++) {
                this.points[i][axis] += distance
            }
            this.center[axis] += distance
        }
        draw(camera: number[]) {

            let scale = 1
            let convertedPoints: number[][] = [[], [], [], [], [], [], [], []]
            for (let i = 0; i < this.points.length; i++) {
                convertedPoints[i] = this.translateToCenter(this.convertToScreen(this.points[i], camera), scale)
            }


            for (let i = 0; i < 4; i++) {
                screen.drawLine(convertedPoints[i][0], convertedPoints[i][1],
                    convertedPoints[(i + 1) % 4][0], convertedPoints[(i + 1) % 4][1], this.color)
            }

            for (let i = 0; i < 4; i++) {
                screen.drawLine(convertedPoints[i + 4][0], convertedPoints[i + 4][1],
                    convertedPoints[((i + 1) % 4) + 4][0], convertedPoints[((i + 1) % 4) + 4][1], this.color)
            }

            for (let i = 0; i < 4; i++) {
                screen.drawLine(convertedPoints[i][0], convertedPoints[i][1],
                    convertedPoints[i + 4][0], convertedPoints[i + 4][1], this.color)
            }

        }


        convertToScreen(point: number[], camera: number[]): number[] {
            let factor = - point[2] / (point[2] - camera[2])
            return [point[0] + (factor * (point[0] - camera[0])), point[1] + (factor * (point[1] - camera[1]))]
        }
        translateToCenter(point: number[], scale: number): number[] {
            return [(scale * point[0]) + (scene.screenWidth() / 2), (scale * point[1]) + (scene.screenHeight() / 2)]
        }


    }
}