import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'; 
import { ResetCenterView } from "../../utils/ResetCenterView/ResetCenterView";
import {useState} from 'react';
import './Map.css';


export function Map(){
    const [position, setPosition] = useState({ lat: 0, lng: 0 })
    
    navigator.geolocation.watchPosition(
        (position) => {
          setPosition({lat: position.coords.latitude, lng: position.coords.longitude});
        },
        (error) => {
          console.error('Error getting location:', error);
        }
    );

    const customIcon = new Icon({
        iconUrl: require('../../assets/self_location.png'),
        iconSize: [30, 30]
    })

    return (
        <MapContainer center={[53.904109, 27.567796]} zoom={13}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Вы находитесь здесь
                </Popup>
            </Marker>
            <ResetCenterView selectPosition={{lat: 53.904109, lon:27.567796}} />
        </MapContainer>
    );
}
