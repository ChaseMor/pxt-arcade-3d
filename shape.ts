namespace shapes3d {
    export enum Axis {
        X,
        Y,
        Z
    }
    export class Shape {

        center: number[]
        scale: number
        color: number

        points: number[][]
        lines: number[][]

        constructor(center: number[], scale?: number, color?: number) {
            this.center = center
            this.scale = scale
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

            let relativePoints: number[][] = []

            for (let i = 0; i < this.points.length; i++) {
                relativePoints[i] = this.getRelativePoint(this.points[i], camera)
            }

            let convertedPoints: number[][] = [[], [], [], [], [], [], [], []]
            for (let i = 0; i < this.points.length; i++) {
                convertedPoints[i] = this.translateToCenter(this.convertToPlane(relativePoints[i], camera), this.scale)
            }


            for (let i = 0; i < this.lines.length; i++) {
                let p1 = convertedPoints[this.lines[i][0]]
                let p2 = convertedPoints[this.lines[i][1]]

                if (relativePoints[this.lines[i][0]][2] > 0 && relativePoints[this.lines[i][1]][2] > 0) {
                    screen.drawLine(p1[0], p1[1], p2[0], p2[1], this.color)
                } else if (relativePoints[this.lines[i][0]][2] > 0 || relativePoints[this.lines[i][1]][2] > 0) {
                    let xDiff = relativePoints[this.lines[i][0]][0] - relativePoints[this.lines[i][1]][0]
                    let yDiff = relativePoints[this.lines[i][0]][1] - relativePoints[this.lines[i][1]][1]
                    let zDiff = relativePoints[this.lines[i][0]][2] - relativePoints[this.lines[i][1]][2]

                    let newX = relativePoints[this.lines[i][0]][0] - (xDiff / zDiff) * (relativePoints[this.lines[i][0]][2] - camera[2])
                    let newY = relativePoints[this.lines[i][0]][1] - (yDiff / zDiff) * (relativePoints[this.lines[i][0]][2] - camera[2])
                    let newPoint = this.translateToCenter(this.convertToPlane([newX, newY, 0], camera), this.scale)
                    if (relativePoints[this.lines[i][0]][2] > 0) {
                        screen.drawLine(p1[0], p1[1], newPoint[0], newPoint[1], this.color)
                    } else if (relativePoints[this.lines[i][1]][2] > 0) {
                        screen.drawLine(newPoint[0], newPoint[1], p2[0], p2[1], this.color)
                    }
                }
            }

        }

        getRelativePoint(point: number[], camera: number[]): number[] {
            let directon = camera[3]

            let x = ((point[0] - camera[0]) * Math.cos(directon) - (point[2] - camera[2]) * Math.sin(directon))
            let y = (point[1] - camera[1])
            let z = ((point[0] - camera[0]) * Math.sin(directon) + (point[2] - camera[2]) * Math.cos(directon))

            return [x, y, z]
        }

        convertToPlane(point: number[], camera: number[]): number[] {

            let directon = camera[3]
            let x = point[0] + camera[0]
            let y = point[1] + camera[1]
            let z = point[2] + camera[2]
            let factor = - z / (z - camera[2])

            return [x + (factor * (x - camera[0])), y + (factor * (y - camera[1]))]
        }
        translateToCenter(point: number[], scale: number): number[] {
            return [(scale * point[0]) + (scene.screenWidth() / 2), (scale * point[1]) + (scene.screenHeight() / 2)]
        }
    }
} 