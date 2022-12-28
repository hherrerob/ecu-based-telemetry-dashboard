import { getData, getSessions, loadDatabase } from './database/databaseServices'

export namespace EventManager {
  export interface Event {
    name: string,
    callback: Function
  }

  export const SET_DATABASE_EVENT: Event = {
    name: 'set-database',
    callback: loadDatabase
  }

  export const GET_DATA_EVENT: Event = {
    name: 'get-data',
    callback: getData
  }

  export const GET_SESSIONS_EVENT: Event = {
    name: 'get-sessions',
    callback: getSessions
  }

  export const allEvents: Event[] = [
    SET_DATABASE_EVENT,
    GET_DATA_EVENT,
    GET_SESSIONS_EVENT
  ]

  export const loadEvents = (ipcMain): void => {
    allEvents.forEach(event => {
      ipcMain.handle(event.name, (e, args) => event.callback(...args))
    })
  }
}
