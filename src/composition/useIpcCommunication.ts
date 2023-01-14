import { ipcRenderer } from 'electron'
import { GET_SESSIONS_ROUTE, GET_TELEMETRY_DATA_ROUTE, PURGE_DATABASE_ROUTE, SET_DATABASE_ROUTE } from '../constants'

const setDatabase = (fullDatabasePath: Nullable<String>, databaseName: Nullable<String>) => {
    return ipcRenderer.invoke(SET_DATABASE_ROUTE, [fullDatabasePath, databaseName])
}

const purgeDatabase = (fullDatabasePath: Nullable<String>, databaseName: Nullable<String>) => {
    return ipcRenderer.invoke(PURGE_DATABASE_ROUTE, [fullDatabasePath, databaseName])
}

const getTelemetryData = (sessionId: number) => {
    return ipcRenderer.invoke(GET_TELEMETRY_DATA_ROUTE, [sessionId])
}

const getSessions = () => {
    return ipcRenderer.invoke(GET_SESSIONS_ROUTE, [])
}

export { setDatabase, getTelemetryData, getSessions, purgeDatabase }
