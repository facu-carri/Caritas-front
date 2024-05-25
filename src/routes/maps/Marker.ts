import { GeoPosition } from "src/types/Types"

export class Marker{

    private position: GeoPosition

    equals(marker: Marker) {
        return this.position.lat == marker.position.lat && this.position.lng == marker.position.lng
    }
}