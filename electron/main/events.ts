import { loadDatabase } from './database/databaseServices'

export namespace EventManager {
  export interface Event {
    name: string,
    callback: Function
  }

  export const SET_DATABASE_EVENT: Event = {
    name: 'set-database',
    callback: loadDatabase
  }

  export const allEvents: Event[] = [
    SET_DATABASE_EVENT
  ]

  export const loadEvents = (ipcMain): void => {
    allEvents.forEach(event => {
      ipcMain.handle(event.name, (e, args) => event.callback(...args))
    })
  }
}
