import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'; 
import {useEffect, useState } from 'react';
import './Map.css';
import { ListInfrastructure } from "../ListInfrastructure/ListInfrastructure";
import { ResetCenterView } from "../../utils/ResetCenterView/ResetCenterView";
import { fetchInfrastructure } from "../../utils/fetchInfrastructure";
import { Marker_icon_height, Marker_icon_width, minsk_center_latitude, minsk_center_longitude} from "../../constants/constants";
import { Direction } from "../Direction/Direction";
import { ListItems, Element, intervalTime } from "./MapTypes";

export function Map({ xid, radius, infrastructure, infrastructureHandler, filterOptions, searchName, xidHandler, endPosition, profile}:{ xid: string | undefined, endPosition: number[] | null, profile: null | 'driving-car' | 'foot-walking', xidHandler: (value:string) => void, searchName : string | undefined,radius : number, infrastructure : ListItems[], infrastructureHandler : (value : ListItems[]) => void, filterOptions : Element[]}){
    const [position, setPosition] = useState({ lat: minsk_center_latitude, lng: minsk_center_longitude });
    

    useEffect(() => {
        fetchInfrastructure({radius, position, infrastructureHandler, infrastructure});
    }, [radius && radius !== 0]);

    navigator.geolocation.watchPosition(
        (position) => {
            setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
        },
        (error) => {
            console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
    );


    const customIcon = new Icon({
        iconUrl: require('../../assets/self_location.png'),
        iconSize: [Marker_icon_width, Marker_icon_height]
    })

    return (
        <div className="div_map">
            <MapContainer center={position.lat == 0 && position.lng == 0 ? [minsk_center_latitude, minsk_center_longitude] : [position.lat, position.lng]} zoom={13}>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {!(position.lat == 0) && !(position.lng == 0) && <Marker position={position} icon={customIcon}>
                    <Popup>
                        Вы находитесь здесь
                    </Popup>
                </Marker>}
                { 
                    infrastructure.length !== 0 && radius !== 0? <ListInfrastructure xid={xid} xidHandler={xidHandler} searchName={searchName} listInfrastructure={infrastructure} filterOptions={filterOptions}/> : undefined
                }
                <ResetCenterView selectPosition={position} />
                <Circle center={position.lat == 0 && position.lng == 0 ? [minsk_center_latitude, minsk_center_longitude] : [position.lat, position.lng]} radius={radius} color="blue"/>
                {endPosition !== null && profile !== null && <Direction start={[position.lat, position.lng]} end={endPosition} profile={profile} />}
            </MapContainer>
        </div>
    );
}