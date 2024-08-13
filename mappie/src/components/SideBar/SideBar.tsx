import { useState } from "react";
import "./SideBar.css";
import { FirstSideBar } from "../FirstSideBar/FirstSideBar";
import { fetchSearch } from "../../utils/fetchSearch";
import { SavedBar } from "../SavedBar/SavedBar";
import { SearchBar } from "../SearchBar/SearchBar";
import { BigCard } from "../BigCard/BigCard"
import { useEffect } from "react";
import arrow from "../../assets/arrow180.png";
import { actionType, Element, ListItems } from "./SideBarTypes";

export function SideBar({
  radius,
  radiusHandler,
  infrastructure,
  filterOptionsHandler,
  searchName,
  searchNameHandler,
  xidHandler,
  xid,
  endPositionHandler,
  profile
}: {
  profile : null | 'driving-car' | 'foot-walking';
  endPositionHandler: (value : number[] | null, prof: "driving-car" | "foot-walking" | null) => void;
  radius: number;
  radiusHandler: (value: number) => void;
  infrastructure: ListItems[];
  searchName: string | undefined;
  searchNameHandler: (value: string) => void;
  filterOptionsHandler: (element: Element, action: actionType) => void;
  xidHandler: (value: string | undefined) => void;
  xid: string | undefined;
}) {
  const [mode, setMode] = useState({ saved: false, search: false });
  const [searchData, setSearchData] = useState<any>();
  const [savedTopics, setSavedTopics] = useState<object[]>([])

  const searchDataHandler = (value: any) => {
    setSearchData(value);
  };

  const deleteSavedTopics = (id:string) => {
    setSavedTopics((prevState:any) => prevState.filter((item:any) => item.xid !== id))
  }

  const addSavedTopics = (topic: any) => {
    setSavedTopics((prevState: any) => {
      return [...prevState, topic]
    })
  }

  useEffect(() => {
    if (typeof xid != "undefined") {
      fetchSearch({ searchDataHandler, xid });
    }
    
    if(mode.saved || mode.search){
      savedHandler(mode.saved? 'saved' : 'search')
    }

  }, [xid]);

  const backHandler = () => {
    setSearchData(undefined)
    xidHandler(undefined)
  }

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
      {mode.saved && typeof xid === "undefined" && (
        <SavedBar xidHandler={xidHandler} searchNameHandler={searchNameHandler} savedTopics={savedTopics} deleteSavedTopics={deleteSavedTopics}/>
      )}
      {mode.search && typeof xid === "undefined" && (
        <SearchBar
          radius={radius}
          infrastructure={infrastructure}
          filterOptionsHandler={filterOptionsHandler}
          radiusHandler={radiusHandler}
          searchNameHandler={searchNameHandler}
        />
      )}
      {typeof xid !== "undefined" && typeof searchData !== "undefined" && (
        <div className="details_div">
          <button id="button_exit" onClick={backHandler}>
            <img src={arrow} alt=""/>
            <h2 className="text_favourite_addition_info">
              Избранное
            </h2>
          </button>
          <BigCard savedTopics={savedTopics} endPositionHandler={endPositionHandler} data={searchData.data} profile={profile} deleteSavedTopics={deleteSavedTopics} addSavedTopics={addSavedTopics}/>
        </div>
      )}
    </div>
  );
}