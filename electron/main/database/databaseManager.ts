import { Sequelize } from 'sequelize'


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
        dialectOptions: { mode: 2 }
      })

      await this.db.authenticate()

      const [results, metadata] = await this.db.query("SELECT * FROM Accelerometer")

      console.log(results)
      console.log(metadata)
    }
  }

  const instance = new DatabaseManager();

  export function getInstance(): IDatabaseManager {
    return instance;
  }
}
