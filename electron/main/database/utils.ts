import { Session } from './models'
import { Op } from 'sequelize'

export async function getSessionData(model: any, session: Session) {
    return await model.findAll({
        where: {
            session_id: session.id,
            received_time_utc: {[Op.gte]: session.video_start_time}
        },
        order: ['received_time_utc']
    })
}

export function splitDataIntoChunks(rawData: any[], fieldName: string, timeOffset: number) {
    let dataChunks = {}
    const chunkSize = 100 // ms
    let index
    let timeWithOffset

    for (const trace of rawData) {
        timeWithOffset = trace.received_time_utc.getTime() - timeOffset
        index = Math.floor(timeWithOffset / chunkSize)

        if (!(index in dataChunks)) dataChunks[index] = []

        dataChunks[index].push({
            y: trace[fieldName],
            x: timeWithOffset,
        })
    }

    return dataChunks
}