import axios from "axios";
import { ListItems, kinds } from "../constants/constants";
import { useState } from 'react';

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
    for(let index = 0; index < infrastructure.length; index++){
      if(infrastructure[index].xid === e.xid){
        return false;
      }
    }
    return true;
  };

  try {
    infrastructureHandler([])
    for (let kind of kinds) {
      const response = await axios.get(
        "https://api.opentripmap.com/0.1/ru/places/radius",
        {
          params: {
            radius: radius, // radius in meters
            lon:
              position.lat == 0 && position.lng == 0 ? 37.617578 : position.lng, // longitude
            lat:
              position.lat == 0 && position.lng == 0 ? 55.755826 : position.lat, // latitude
            apikey: "5ae2e3f221c38a28845f05b63c4541753ad62fc8c2b126b0b6433cb6",
            format: "json",
            kinds: kind,
          },
        }
      );
      response.data = response.data.filter((e: ListItems) => responseFilter(e));
      infrastructureHandler(response.data);
    }
    infrastructureHandler((prev : ListItems[]) => prev.reduce((o:ListItems[], i:ListItems) => {
      if(!o.find(v => v.xid===i.xid)){
        o.push(i)
      }
      return o;
    }, []))
  } catch (error) {
    console.error("Error fetching infrastructure:", error);
  }
};
