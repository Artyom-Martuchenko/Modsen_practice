import { useState } from "react";
import "./SideBar.css";
import { FirstSideBar } from "../FirstSideBar/FirstSideBar";
import { fetchSearch } from "utils/fetchSearch";
import { SavedBar } from "components/SavedBar/SavedBar";
import { SearchBar } from "components/SearchBar/SearchBar";

interface ListItems {
  dist: number;
  point: { lon: number; lat: number };
  name: string;
  kinds: string;
  osm: string;
  xid: string;
  rate: number;
}

type actionType = "delete" | "add";

interface Element {
  name: string;
  img: string;
  id: number;
  active: boolean;
  kinds: string;
}

export function SideBar({
  radius,
  radiusHandler,
  infrastructure,
  filterOptionsHandler,
  searchName,
  searchNameHandler,
  xid
}: {
  radius: number;
  radiusHandler: (value: number) => void;
  infrastructure: ListItems[];
  searchName: string | undefined;
  searchNameHandler: (value:string) => void;
  filterOptionsHandler: (element: Element, action: actionType) => void;
  xid: string | undefined;
}) {
  const [mode, setMode] = useState({ saved: false, search: false });
  const [searchData, setSearchData] = useState();

  const searchDataHandler = (value: any) => {
    setSearchData(value);
  };

  const searchHandler = () => {
    console.log(searchName);
    if (typeof searchName !== "undefined") {
      fetchSearch({ searchDataHandler, xid });
    }
    console.log(searchData);
  };

  const savedHandler = (prop: string) => {
    setMode((prevState) => {
      return prop == "saved"
        ? !prevState.search
          ? { ...prevState, saved: !prevState.saved }
          : { search: !prevState.search, saved: !prevState.saved }
        : !prevState.saved
        ? { ...prevState, search: !prevState.search }
        : { search: !prevState.search, saved: !prevState.saved };
    });
  };

  return (
    <div id="sidebar">
      <FirstSideBar mode={mode} savedHandler={savedHandler} />
      {mode.saved && <SavedBar searchNameHandler={searchNameHandler}/>}
      {mode.search && (
        <SearchBar
          radius={radius}
          infrastructure={infrastructure}
          filterOptionsHandler={filterOptionsHandler}
          radiusHandler={radiusHandler}
          searchHandler={searchHandler}
          searchNameHandler={searchNameHandler}
        />
      )}
    </div>
  );
}
