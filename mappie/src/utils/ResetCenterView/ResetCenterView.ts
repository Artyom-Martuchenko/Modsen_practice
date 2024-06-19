import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import * as L from 'leaflet'

interface SelectionData {
    lat: number;
    lon: number;
}

export function ResetCenterView({ selectPosition } : {selectPosition : SelectionData}):null {
    const map = useMap();
  
    useEffect(() => {
      if (selectPosition) {
        map.setView(
          L.latLng(selectPosition?.lat, selectPosition?.lon),
          map.getZoom(),
          {
            animate: true
          }
        )
      }
    }, [selectPosition]);
  
    return null;
}