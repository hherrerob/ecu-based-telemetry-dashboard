import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class ThrottlePos extends Trace {
    @Column(DataType.FLOAT)
    declare throttle_pos: number
    public static getName (): string {return 'Throttle Position'}

    public static getConfig (): TraceMetadata {
        return {unit: 'Degrees', min: 0, max: 360}
    }
    public static getFields(): string[] {
        return ['throttle_pos']
    }
}
