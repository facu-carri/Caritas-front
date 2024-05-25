/* eslint-disable react-hooks/exhaustive-deps */
import { APIProvider, AdvancedMarker, InfoWindow, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import Button from "src/components/Button";
import AgregarFilialModal from "src/components/modals/AgregarFilial";
import { useCustomModal } from "src/context/CustomModalContext";
import { GeoPosition, Location, LocationResponse } from "src/types/Types";
import { User } from "src/utils/User";
import { endPoints, roles } from "src/utils/constants";
import { deleteData, getData } from "src/utils/request/httpRequests";

function Maps() {
    const { showModal, isOpen, dialogId } = useCustomModal()
    const [currentMarker, setCurrentMarker] = useState<Location>(null)
    const [locations, setLocations] = useState<Location[]>([])
    const { getRole } = User()
    const minZoom = 12
    const defaultPosition = { lat: -34.9042364, lng: -57.9399872 };

    useEffect(() => {
        getData(endPoints.location)
            .then((locations: LocationResponse[]) => {
                const locationsParsed = locations.map(location => getLocationParsed(location))
                const filtered = locationsParsed.filter(loc => loc != null)
                setLocations(filtered)
            })
    }, [])

    useEffect(() => {
        if (dialogId == 'agregarFilial' && !isOpen) setCurrentMarker(null)
    }, [isOpen])

    const canEdit = () => getRole() == roles.ADMIN

    const getLocationParsed = (location: LocationResponse): Location => {
        try {
            return {
                ...location,
                geoPosition: JSON.parse(location.coordinates),
            }
        } catch (err) {
            return null
        }
    }

    const addLocation = (location: LocationResponse) => {
        const parsed = getLocationParsed(location)
        if (parsed == null) return
        setLocations(locations.concat([parsed]))
    }

    const removeLocation = (selectedLocation: Location) => {
        const filteredLocations = locations.filter(location => location.id != selectedLocation.id)
        setLocations(filteredLocations)
    }

    const handleMapClick = (ev: MapMouseEvent) => {
        ev.stop()
        setCurrentMarker(null)

        if (!canEdit()) return

        showModal(<AgregarFilialModal geoPosition={ev.detail.latLng} handleSuccess={addLocation} />, 'agregarFilial')
    }

    const isSamePosition = (pos1: GeoPosition, pos2: GeoPosition) => {
        return pos1.lat == pos2.lat && pos1.lng == pos2.lng
    }

    const showMarkerInfo = (position: GeoPosition) => {
        if(!currentMarker) return false
        return isSamePosition(currentMarker.geoPosition, position)
    }

    const eliminarFilial = () => {
        deleteData(`${endPoints.location}/${currentMarker.id}`, null)
            .then(() => removeLocation(currentMarker))
            .then(() => setCurrentMarker(null))
            //.catch((errCode: number) => handleError(errCode))
    }

    const getLocationsMarkers = () => {
        return locations && locations.map((location, index) => (
            <div key={index}>
            <AdvancedMarker position={location.geoPosition} title={location.description ?? ''} onClick={() => setCurrentMarker(location)} key={index}>
            </AdvancedMarker>
            {showMarkerInfo(location.geoPosition) && 
                <InfoWindow className="p-1" position={location.geoPosition} onCloseClick={() => setCurrentMarker(null)}>
                    <div className="ml-2 flex flex-col justify-center items-center text-[100%]">
                        <h2 className="font-bold text-base">{location.description ?? ''}</h2>
                        <Button attrs="mt-2" visible={canEdit()} onClick={eliminarFilial}>Eliminar</Button>
                    </div>
                </InfoWindow>
            }
            </div>
        ))
    }

    return (
    <>
        <div style={{ height: "100vh" }}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <Map
                mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                disableDefaultUI={true}
                defaultZoom={minZoom}
                minZoom={minZoom}
                zoomControl={false}
                center={canEdit() ? null : defaultPosition}
                defaultCenter={defaultPosition}
                fullscreenControl={false}
                onClick={handleMapClick}
            >
            {getLocationsMarkers()}
            </Map>
        </APIProvider>
        </div>
    </>
    );
}

export default Maps;