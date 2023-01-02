import { Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import Session from './session'

export default class Trace extends Model {
    @Column(DataType.DATE)
    declare received_time_utc: Date

    @ForeignKey(() => Session)
    @Column(DataType.INTEGER)
    declare session_id

    public static getName(): string {return 'Trace'}
    public static getConfig(): TraceMetadata {return null}
    public static getFields(): string[] {return []}
}
