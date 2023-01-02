import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Gyroscope extends Trace {
    @Column(DataType.FLOAT)
    declare x_angular_speed: number

    @Column(DataType.FLOAT)
    declare y_angular_speed: number

    @Column(DataType.FLOAT)
    declare z_angular_speed: number

    public static getName (): string {return 'Gyroscope'}

    public static getMetadata (): TraceMetadata {
        return {unit: 'Degrees/s', min: -2000, max: 2000}
    }

    public static getFields (): string[] {
        return ['x_angular_speed', 'y_angular_speed', 'z_angular_speed']
    }
}
