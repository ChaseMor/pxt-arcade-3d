namespace shape {
    export enum Axis {
        X,
        Y,
        Z
    }
    export interface Shape {
        rotate(angle: number, axis: Axis): void

        draw(camera: number[]): void
    }
} 