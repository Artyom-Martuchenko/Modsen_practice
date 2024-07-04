import axios from "axios";
import { ListItems, kinds } from "../constants/constants";

export const fetchInfrastructure = async ({
  radius,
  position,
  infrastructureHandler,
  infrastructure,
}: {
  radius: number;
  position: { lat: number; lng: number };
  infrastructureHandler: (value: any) => any;
  infrastructure: ListItems[];
}) => {
  const responseFilter = (e: ListItems) => {
    if (e.name == "") {
      return false;
    }

    for (let index = 0; index < infrastructure.length; index++) {
      if (infrastructure[index].xid === e.xid) {
        return false;
      }
    }
    return true;
  };

  const apiUrl = process.env.OPEN_TRIP_MAP_API_INFRASTRUCTURE;
  const apiKey = process.env.OPEN_TRIP_MAP_API_KEY;

  try {
    if (apiUrl !== undefined && apiKey !== undefined) {
      infrastructureHandler([]);
      for (let kind of kinds) {
        const response = await axios.get(apiUrl, {
          params: {
            radius: radius, // radius in meters
            lon:
              position.lat == 0 && position.lng == 0 ? 37.617578 : position.lng, // longitude
            lat:
              position.lat == 0 && position.lng == 0 ? 55.755826 : position.lat, // latitude
            apikey: apiKey,
            format: "json",
            kinds: kind,
          },
        });
        response.data = response.data.filter((e: ListItems) =>
          responseFilter(e)
        );
        const result = Array.from(new Set([...infrastructure, response.data]));
        if (result[0].length > 0) {
          console.log(result[0]);
          infrastructureHandler(result[0]);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching infrastructure:", error);
  }
};
