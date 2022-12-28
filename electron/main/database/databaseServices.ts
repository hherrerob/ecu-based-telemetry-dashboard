import { DatabaseManager } from './databaseManager'
import { Accelerometer, Session } from './models'


export async function loadDatabase (pathToDatabase, databaseName) {
  try {
    DatabaseManager.getInstance().loadDatabase(pathToDatabase, databaseName)
  } catch (e) {
    console.log(e)
    return false
  }

  return true
}

export async function getData(modelName, sessionId) {
  const modelsMap = DatabaseManager.getInstance().dataModelsMap
  if (modelName in modelsMap) {
    console.log(modelsMap[modelName])
    const data = await Accelerometer.findAll({
      raw: true,
      where: {
        session_id: sessionId
      }
    })

    console.log(data)

    return data
  }

  return []
}

export async function getSessions() {
  return await Session.findAll({raw: true})
}
