import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class RelativeThrottlePos extends Trace {
    @Column(DataType.FLOAT)
    declare relative_throttle_pos: number
}
