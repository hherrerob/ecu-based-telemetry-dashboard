import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Speed extends Trace {
    @Column(DataType.FLOAT)
    declare speed: number
}
