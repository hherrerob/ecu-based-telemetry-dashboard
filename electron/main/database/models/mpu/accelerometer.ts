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
}
