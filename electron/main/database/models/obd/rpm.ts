import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class RPM extends Trace {
    @Column(DataType.FLOAT)
    declare rpm: number
}
