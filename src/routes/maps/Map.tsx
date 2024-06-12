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
import StoreIcon from '@images/StoreIcon.png'
import EditarFilialModal from "src/components/modals/EditarFilial";
import ConfirmationModal from "src/components/modals/Confirmation";
import { useQueryClient } from "react-query";

function Maps() {
    const { showModal, closeModal } = useCustomModal()
    const [currentMarker, setCurrentMarker] = useState<Location>(null)
    const [locations, setLocations] = useState<Location[]>([])
    const { getRole } = User()
    const minZoom = 12
    const defaultPosition = { lat: -34.9042364, lng: -57.9399872 };

    const queryClient = useQueryClient()

    useEffect(() => {
        getData(endPoints.location)
            .then((locations: LocationResponse[]) => {
                const locationsParsed = locations.map(location => getLocationParsed(location))
                const filtered = locationsParsed.filter(loc => loc != null)
                setLocations(filtered)
            })
    }, [])

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

        agregarFilial(ev.detail.latLng)
    }

    const agregarFilial = (position:GeoPosition) => {
        showModal(<AgregarFilialModal geoPosition={position} handleSuccess={addLocation} />, () => setCurrentMarker(null))
    }

    const isSamePosition = (pos1: GeoPosition, pos2: GeoPosition) => {
        return pos1.lat == pos2.lat && pos1.lng == pos2.lng
    }

    const showMarkerInfo = (position: GeoPosition) => {
        if(!currentMarker) return false
        return isSamePosition(currentMarker.geoPosition, position)
    }

    const showEliminationConfirmation = () => {
        showModal(<ConfirmationModal title="Se eliminaran todos los ayudantes de esta filial" onAccept={eliminarFilial} onCancel={closeModal}/>)
    }
    
    const eliminarFilial = () => {
        deleteData(`${endPoints.location}/${currentMarker.id}`, null)
            .then(() => removeLocation(currentMarker))
            .then(() => setCurrentMarker(null))
            .then(() => queryClient.invalidateQueries(['location']))
            //.catch((errCode: number) => handleError(errCode))
    }

    const editLocation = (locationResponse: LocationResponse) => {
        const searched = locations.find(location => location.id == locationResponse.id)
        Object.assign(searched, locationResponse)
    }

    const editarFilial = () => {
        showModal(<EditarFilialModal location={currentMarker} handleSuccess={editLocation}/>)
    }

    const getLocationsMarkers = () => {
        return locations && locations.map((location, index) => (
            <div key={index}>
            <AdvancedMarker position={location.geoPosition} title={location.name ?? ''} onClick={() => setCurrentMarker(location)} key={index}>
                <img src={StoreIcon} className="scale-[.9] drop-shadow-white-multi"></img>
            </AdvancedMarker>
                {showMarkerInfo(location.geoPosition) && 
                <InfoWindow pixelOffset={[1,-35]} className="p-1" position={location.geoPosition} onCloseClick={() => setCurrentMarker(null)}>
                    <div className="ml-2 flex flex-col justify-center items-center text-[100%]">
                        <h2 className="font-bold text-base">{location.name ?? ''}</h2>
                        <div className="flex flex-row mt-2 gap-2">
                            <Button visible={canEdit()} onClick={editarFilial}>Editar</Button>
                            <Button visible={canEdit()} onClick={showEliminationConfirmation}>Eliminar</Button>
                        </div>
                    </div>
                </InfoWindow>
                }
            </div>
        ))
    }

    return (
    <main className="bg-grey-500 bg-gray-100">
        <div style={{ height: "100vh" }}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <Map
                mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                disableDefaultUI={true}
                defaultZoom={minZoom}
                minZoom={minZoom}
                zoomControl={false}
                defaultCenter={defaultPosition}
                fullscreenControl={false}
                onClick={handleMapClick}
                onDragstart={() => setCurrentMarker(null)}
            >
            {getLocationsMarkers()}
            </Map>
        </APIProvider>
        </div>
    </main>
    );
}

export default Maps;