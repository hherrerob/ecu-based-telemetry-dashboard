import { DatabaseManager } from './databaseManager'


export async function loadDatabase (pathToDatabase) {
  try {
    DatabaseManager.getInstance().loadDatabase(pathToDatabase)
  } catch (e) {
    console.log(e)
    return false
  }

  return true
}
