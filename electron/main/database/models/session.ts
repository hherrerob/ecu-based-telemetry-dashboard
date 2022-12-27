import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class Session extends Model {
    @Column(DataType.DATE)
    declare start_time: Date

    @Column(DataType.STRING)
    declare path_to_video?: String

    @Column(DataType.DATE)
    declare video_start_time?: Date
}
