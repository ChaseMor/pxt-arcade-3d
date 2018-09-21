namespace shapes3d {
    export class Cube extends Shape {

        constructor(center: number[], width: number, height: number, length: number, scale?: number, color?: number) {
            super(center, scale, color)
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


            this.lines = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]

        }
    }
}