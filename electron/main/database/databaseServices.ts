import { DatabaseManager } from './databaseManager'
import { Session } from './models'
import { getSessionData, splitDataIntoChunks } from './utils'

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
  return await Session.findAll({raw: true})
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
