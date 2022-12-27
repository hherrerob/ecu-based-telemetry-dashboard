import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class ThrottlePos extends Trace {
    @Column(DataType.FLOAT)
    declare throttle_pos: number
}
