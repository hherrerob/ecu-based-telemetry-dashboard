import { DatabaseManager } from './databaseManager'
import { Accelerometer, Session } from './models'
import { getSessionData, splitDataIntoChunks } from './utils'
import validator from 'validator'
import toDate = validator.toDate

export async function loadDatabase (pathToDatabase, databaseName) {
  try {
    DatabaseManager.getInstance().loadDatabase(pathToDatabase, databaseName)
  } catch (e) {
    console.log(e)
    return false
  }

  return true
}

export async function getSessions() {
  const allSessions: any = await Session.findAll({raw: true})
  let offset: number
  for (const session of allSessions) {
    offset = toDate(session.video_start_time).getTime()
    session.end_time = await Accelerometer.max('received_time_utc', {
      where: {session_id: session.id}
    })

    session.end_time = session.end_time.getTime() - offset
  }

  return allSessions
}

export async function getTelemetryData(sessionId: number) {
  const session = await Session.findByPk(sessionId)
  const offset = session.video_start_time.getTime()
  let rawData: any[]
  const telemetryData = []

  for (const model of DatabaseManager.getInstance().dataModels) {
    rawData = await getSessionData(model, session)
    if (!rawData.length) break

    telemetryData.push({
      name: model.getName(),
      metadata: model.getMetadata(),
      series: model.getFields().map((fieldName) => {
        return {
          name: fieldName,
          data: splitDataIntoChunks(rawData, fieldName, offset)
        }
      })
    })
  }

  return telemetryData
}
