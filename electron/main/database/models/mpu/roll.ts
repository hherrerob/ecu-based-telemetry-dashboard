import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class Roll extends Trace {
    @Column(DataType.FLOAT)
    declare roll: number

    public static getName (): string {return 'Roll'}

    public static getConfig (): TraceMetadata {
        return {unit: 'Degrees', min: 0, max: 360}
    }

    public static getFields (): string[] {
        return ['roll']
    }
}
