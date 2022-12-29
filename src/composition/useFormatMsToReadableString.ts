const padZeros = (n: number, nPads: number) => { return n.toString().padStart(nPads, '0')}
const formatMsToReadableString = (millis: number) => {
    const milliseconds = Math.floor((millis % 1000) / 10)
    const seconds = Math.floor((millis / 1000) % 60)
    const minutes = Math.floor((millis / (1000 * 60)) % 60)
    const hours = Math.floor((millis / (1000 * 60 * 60)) % 24)

    return `${padZeros(hours, 2)}:${padZeros(minutes, 2)}:${padZeros(seconds, 2)}.${padZeros(milliseconds, 2)}`
}

export { formatMsToReadableString }
