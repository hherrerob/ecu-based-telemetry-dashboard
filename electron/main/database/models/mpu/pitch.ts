import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Pitch extends Trace {
    @Column(DataType.FLOAT)
    declare pitch: number
}
