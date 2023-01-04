import L, { LatLngExpression, Map, Marker, Polyline } from 'leaflet'

export default class LiveMapManager {
    map: Map
    currentPositionMarker: Marker
    route: Polyline
    
    public constructor (initialPosition: LatLngExpression) {
        this.map = L.map('map').setView(initialPosition, 17)
        this.getTileLayer().addTo(this.map)
        this.currentPositionMarker = this.createMarker(initialPosition).addTo(this.map)
        this.route = this.initializeRoute(initialPosition).addTo(this.map)
    }
    
    public getIcon() {
        return L.icon({
            iconUrl: 'mapicon.png',
            iconSize: [24, 24],
        })
    }
    
    public getTileLayer() {
        return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19, 
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    }
    
    public createMarker(position: LatLngExpression) {
        return L.marker(position, {icon: this.getIcon()})
    }
    
    public initializeRoute(position: LatLngExpression) {
        return L.polyline([position], {color: '#4d9eff'})
    }

    public move (moveTo: LatLngExpression) {
        this.currentPositionMarker.setLatLng(moveTo)
        this.route.addLatLng(moveTo)
        this.map.setView(moveTo)
    }
}
