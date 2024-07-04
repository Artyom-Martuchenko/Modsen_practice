import { Marker, Popup } from "react-leaflet";
import {
  Element,
  ListItems,
  customNature,
  customHistory,
  customIndustry,
  customCar,
  customShop,
  customBicycleRoad,
  customBank,
  other,
  customPark,
  customSport,
  customCulture,
  customChurch,
  customHotels,
  customFood,
  customCenzured,
} from "../../constants/constants";

export interface List {
  listInfrastructure: ListItems[];
  filterOptions: Element[];
  searchName : string | undefined;
  endPositionHandler: (value: number[] | null, profile : "driving-car" | "foot-walking" | null) => void;
  xidHandler: (value : any) => any,
}

export function ListInfrastructure({
  listInfrastructure,
  filterOptions,
  endPositionHandler,
  searchName,
  xidHandler
}: List) {
  const keywords = [
    'nature', 'histor', 'industr', 'car', 'shop', 'market', 'bicycl',
    'bank', 'park', 'gym', 'stadium', 'cultur', 'church', 'religion',
    'food', 'adult', 'accomodations'
  ].sort();
  
  const defineType = (prop: string) => {
    const index = keywords.findIndex(kw => prop.includes(kw));
    if (index === -1) {
      return other;
    }
    switch (index) {
      case 0: return customNature;
      case 1: return customHistory;
      case 2: return customIndustry;
      case 3: return customCar;
      case 4: return customShop;
      case 5: return customShop;
      case 6: return customBicycleRoad;
      case 7: return customBank;
      case 8: return customPark;
      case 9: return customSport;
      case 10: return customSport;
      case 11: return customCulture;
      case 12: return customChurch;
      case 13: return customChurch;
      case 14: return customFood;
      case 15: return customCenzured;
      case 16: return customHotels;
      default: return other;
    }
  };

  const filterInfrastructure = (infrastructure: any, searchName: string) => {
    if (filterOptions.length != 0) {
      for (let index = 0; index < filterOptions.length; index++) {
        if (infrastructure.kinds.includes(filterOptions[index].kinds)) {
          return true;
        }
      }
    }

    if(searchName !== ''){
      if(infrastructure.name.includes(searchName)){
        return true;
      }else{
        return false;
      }
    }

    return filterOptions.length == 0;
  };

  return (
    <div>
      {listInfrastructure
        .filter((infrastructure) => filterInfrastructure(infrastructure, typeof searchName === 'undefined' ? '' : searchName))
        .map((el: ListItems) => (
          <Marker
            position={{ lat: el.point.lat, lng: el.point.lon }}
            key={Math.random()} //el.xid
            icon={defineType(el.kinds)}
          >
            <Popup>
              {el.name}
              <select title="type_moving" onChange={(e : any) => e.target.value != '' ? endPositionHandler([el.point.lat, el.point.lon], e.target.value) : endPositionHandler(null, null)}>
                <option value=''>-</option>
                <option value="foot-walking">Добраться пешком</option>
                <option value="driving-car">Добраться на машине</option>
              </select>
              <button onClick={()=>xidHandler(el.xid)}>Info</button>
            </Popup>
          </Marker>
        ))}
    </div>
  );
}
