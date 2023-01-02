import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Speed extends Trace {
    @Column(DataType.FLOAT)
    declare speed: number

    public static getName (): string {return 'Speed'}

    public static getMetadata (): TraceMetadata {
        return {unit: 'Degrees', min: 0, max: 360}
    }

    public static getFields (): string[] {
        return ['speed']
    }
}
