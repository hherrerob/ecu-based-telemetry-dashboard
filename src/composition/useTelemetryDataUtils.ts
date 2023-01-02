const cropLastItemsOfArray = (array: any[], nItems: number) => {
    return array.slice(array.length - nItems, array.length)
}

const prepareTelemetryDataForCharts = (telemetryData: any[]) => {
    const data: any = {}
    for(const t of telemetryData) {
        data[t.name] = t.series.map((seriesItem: any) => {
            return {
                name: seriesItem.name,
                data: []
            }
        })
    }

    return data
}

export { cropLastItemsOfArray, prepareTelemetryDataForCharts }
