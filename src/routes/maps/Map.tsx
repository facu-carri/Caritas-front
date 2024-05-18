import { APIProvider, AdvancedMarker, InfoWindow, Map } from "@vis.gl/react-google-maps"
import { useState } from "react"

function Maps(){

    const [open, setOpen] = useState(false)

    const position = {
        lat: 53.54,
        lng: 10
    }

    return (
        <div style={{ height: '100vh'}}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
                <Map disableDefaultUI={true} defaultZoom={9} zoomControl={true} defaultCenter={position} fullscreenControl={false} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}>
                    <AdvancedMarker position={position} title="Testing!" onClick={() => setOpen(true)}>
                    </AdvancedMarker>
                    {open && (
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                            <h2>Caritas sede - La plata</h2>
                            <p>Direccion: 152 y 59</p>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </div>
    )
}

export default Maps