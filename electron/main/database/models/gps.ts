import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from './trace'

@Table
export default class GPS extends Trace {
    @Column(DataType.FLOAT)
    declare latitude: number

    @Column(DataType.FLOAT)
    declare longitude: number
}
