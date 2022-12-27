import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Roll extends Trace {
    @Column(DataType.FLOAT)
    declare roll: number
}
