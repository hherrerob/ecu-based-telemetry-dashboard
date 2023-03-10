import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class RPM extends Trace {
    @Column(DataType.FLOAT)
    declare rpm: number

    public static getName (): string {return 'RPM'}

    public static getMetadata (): TraceMetadata {
        return {unit: 'RPM', min: 0, max: 8000}
    }

    public static getFields (): string[] {
        return ['rpm']
    }
}
