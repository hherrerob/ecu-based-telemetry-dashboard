import { Sequelize, Model } from 'sequelize-typescript'
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
  }

  class DatabaseManager implements IDatabaseManager {
    db: Sequelize

    constructor () {}

    async loadDatabase (pathToDatabase) {
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
