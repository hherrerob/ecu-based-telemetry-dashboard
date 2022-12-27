import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class EngineLoad extends Trace {
    @Column(DataType.FLOAT)
    declare engine_load: number
}
