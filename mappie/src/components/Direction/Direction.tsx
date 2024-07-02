import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression, LatLngBounds} from "leaflet";

interface RoutingResponse {
  routes: {
    geometry: { coordinates: any[] }; //string { coordinates : number[][] }
    properties: object;
    distance: number;
    duration: number;
  }[];
  features: {geometry: { coordinates: any[] }}[];
}

class OpenRouteService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.openrouteservice.org/v2/directions",
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization: this.apiKey,
      },
    });
  }

  async getRoute(
    startLat: number,
    startLon: number,
    endLat: number,
    endLon: number,
    profile: "driving-car" | "foot-walking",
  ): Promise<RoutingResponse> {
    const response: AxiosResponse<RoutingResponse> = await this.client.get(
      `/${profile}`,
      {
        params: {
          start: `${startLon},${startLat}`,
          end: `${endLon},${endLat}`,
          options: "overview",
        },
      }
    );

    return response.data;
  }
}

export function Direction({
  start,
  end,
  profile,
}: {
  start: number[];
  end: number[];
  profile: "driving-car" | "foot-walking" | null;
}) {
  const apiKey = "5b3ce3597851110001cf62483fa5a58ee172490c9e958d4a7382d1dd";
  const ors = new OpenRouteService(apiKey);
  const [routeData, setRouteData] = useState<any[][]>([]);
  console.log(start)
  console.log(end)
  console.log(profile)

  useEffect(()=>{
    if(profile !== null){
      ors
      .getRoute(Number(start[0].toFixed(6)), Number(start[1].toFixed(6)), Number(end[0].toFixed(6)), Number(end[1].toFixed(6)), profile)
      .then((response) => {
        const result = response.features[0].geometry.coordinates;
        setRouteData([])
        result.map((item) => setRouteData((prev) => [...prev, item.reverse()]));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  }, [profile])
    
  return <>
    {profile !== null && <Polyline pathOptions={{ color: "red" }} positions={routeData}/>}  
  </>
}
