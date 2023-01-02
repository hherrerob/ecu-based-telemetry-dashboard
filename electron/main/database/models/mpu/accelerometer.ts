import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Accelerometer extends Trace {
    @Column(DataType.FLOAT)
    declare x_acceleration: number

    @Column(DataType.FLOAT)
    declare y_acceleration: number

    @Column(DataType.FLOAT)
    declare z_acceleration: number

    public static getName (): string {return 'Accelerometer'}

    public static getConfig (): TraceMetadata {
        return {unit: 'g/s', min: -16, max: 16}
    }

    public static getFields (): string[] {
        return ['x_acceleration', 'y_acceleration', 'z_acceleration']
    }
}
