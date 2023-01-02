import { Table, Column, DataType } from 'sequelize-typescript'
import Trace from '../trace'

@Table
export default class RelativeThrottlePos extends Trace {
    @Column(DataType.FLOAT)
    declare relative_throttle_pos: number

    public static getName (): string {return 'Relative Throttle Position'}

    public static getConfig (): TraceMetadata {
        return {unit: 'Percentage', min: 0, max: 100}
    }

    public static getFields (): string[] {
        return ['relative_throttle_pos']
    }
}
