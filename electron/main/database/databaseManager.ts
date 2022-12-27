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
  }

  class DatabaseManager implements IDatabaseManager {
    db: Sequelize
    pathToDatabase: string
    databaseName: string

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
        models: [Session, Accelerometer, Gyroscope, Pitch, Roll, EngineLoad, RelativeThrottlePos, RPM, Speed,
          ThrottlePos, GPS]
      })

      await this.db.authenticate()
    }
  }

  const instance = new DatabaseManager();

  export function getInstance(): IDatabaseManager {
    return instance;
  }
}
