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
}
