import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class EngineLoad extends Trace {
    @Column(DataType.FLOAT)
    declare engine_load: number

    public static getName (): string {return 'Engine Load'}

    public static getConfig (): TraceMetadata {
        return {unit: 'Percentage', min: 0, max: 100}
    }

    public static getFields (): string[] {
        return ['engine_load']
    }
}
