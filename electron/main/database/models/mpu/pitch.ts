import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Pitch extends Trace {
    @Column(DataType.FLOAT)
    declare pitch: number

    public static getName (): string {return 'Pitch'}

    public static getConfig (): TraceMetadata {
        return {unit: 'Degrees', min: 0, max: 360}
    }

    public static getFields (): string[] {
        return ['pitch']
    }
}
