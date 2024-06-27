import { Marker, Popup } from "react-leaflet";
import {
  List,
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

export function ListInfrastructure({
  listInfrastructure,
  filterOptions,
}: List) {
  const difineType = (prop: string) => {
    if (prop.includes("nature")) {
      return customNature;
    } else if (prop.includes("histor")) {
      return customHistory;
    } else if (prop.includes("industr")) {
      return customIndustry;
    } else if (prop.includes("car")) {
      return customCar;
    } else if (prop.includes("shop") || prop.includes("market")) {
      return customShop;
    } else if (prop.includes("bicycl")) {
      return customBicycleRoad;
    } else if (prop.includes("bank")) {
      return customBank;
    } else if (prop.includes("park")) {
      return customPark;
    } else if (prop.includes("gym") || prop.includes("stadium")) {
      return customSport;
    } else if (prop.includes("cultur")) {
      return customCulture;
    } else if (prop.includes("church") || prop.includes("religion")) {
      return customChurch;
    } else if (prop.includes("food")) {
      return customFood;
    } else if (prop.includes("adult")) {
      return customCenzured;
    } else if (prop.includes("accomodations")) {
      return customHotels;
    } else {
      return other;
    }
  };

  const filterInfrastructure = (infrastructure: any) => {
    if (filterOptions.length != 0) {
      for (let index = 0; index < filterOptions.length; index++) {
        if (infrastructure.kinds.includes(filterOptions[index].kinds)) {
          return true;
        }
      }
    }
    return filterOptions.length == 0;
  };

  return (
    <div>
      {listInfrastructure
        .filter((infrastructure) => filterInfrastructure(infrastructure))
        .map((el: ListItems) => (
          <Marker
            position={{ lat: el.point.lat, lng: el.point.lon }}
            key={Math.random()}
            icon={difineType(el.kinds)}
          >
            <Popup>{el.name}</Popup>
          </Marker>
        ))}
    </div>
  );
}
