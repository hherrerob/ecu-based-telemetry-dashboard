import { DatabaseManager } from './databaseManager'


export async function loadDatabase (pathToDatabase, databaseName) {
  try {
    DatabaseManager.getInstance().loadDatabase(pathToDatabase, databaseName)
  } catch (e) {
    console.log(e)
    return false
  }

  return true
}
