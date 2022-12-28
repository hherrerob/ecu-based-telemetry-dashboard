import { Sequelize } from 'sequelize-typescript'
import {
  Accelerometer,
  EngineLoad, GPS,
  Gyroscope,
  Pitch,
  RelativeThrottlePos,
  Roll,
  RPM,
  Session,
  Speed,
  ThrottlePos
} from './models'


export namespace DatabaseManager {
  export interface IDatabaseManager {
    db: Sequelize,
    loadDatabase: Function
    pathToDatabase: string
    databaseName: string
    dataModels: any[]
    dataModelsMap
  }

  class DatabaseManager implements IDatabaseManager {
    db: Sequelize
    pathToDatabase: string
    databaseName: string
    dataModels: any[] = [
        Accelerometer, Gyroscope, Pitch, Roll, EngineLoad, RelativeThrottlePos, RPM, Speed, ThrottlePos, GPS]

    // TODO: Refactor this
    dataModelsMap = {
      'Accelerometer': Accelerometer,
      'Gyroscope': Gyroscope,
      'Pitch': Pitch,
      'Roll': Roll,
      'EngineLoad': EngineLoad,
      'RelativeThrottlePos': RelativeThrottlePos,
      'RPM': RPM,
      'Speed': Speed,
      'ThrottlePos': ThrottlePos,
      'GPS': GPS,
    }

    constructor () {}

    async loadDatabase (pathToDatabase, databaseName) {
      this.databaseName = databaseName
      this.pathToDatabase = pathToDatabase.replace(databaseName, '')

      this.db = new Sequelize({
        dialect: 'sqlite',
        storage: pathToDatabase,
        dialectOptions: { mode: 2 },
        define: {
          freezeTableName: true,
          timestamps: false
        },
        models: [Session, ...this.dataModels]
      })

      await this.db.authenticate()
    }
  }

  const instance = new DatabaseManager();

  export function getInstance(): IDatabaseManager {
    return instance;
  }
}
