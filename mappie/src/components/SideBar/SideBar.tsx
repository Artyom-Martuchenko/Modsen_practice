import { Card } from '../Card/Card';
import search_icon from '../../assets/search-icon.png';
import {useState} from 'react';
import './SideBar.css';
import { List } from '../List/List';
import { FirstSideBar } from '../FirstSideBar/FirstSideBar';
import search_btn from '../../assets/search-btn/big-2.png';

interface ListItems {
    dist : number;
    point : { lon : number, lat : number};
    name : string;
    kinds : string;
    osm : string;
    xid : string;
    rate : number;
}

type actionType = 'delete' | 'add'; 

interface Element {
  name: string
  img: string,
  id: number,
  active: boolean,
  kinds: string,
}

export function SideBar({ radius, radiusHandler, infrastructure, filterOptionsHandler} : { radius:number, radiusHandler : (value : number) => void, infrastructure : ListItems[], filterOptionsHandler : (element : Element, action : actionType) => void }){
    const [mode, setMode] = useState({ saved: false, search: false})
    
    const savedHandler = (prop : string) => {
        setMode((prevState) => {
            return prop == 'saved'? !prevState.search ? {...prevState, saved: !prevState.saved} : {search: !prevState.search, saved: !prevState.saved} : !prevState.saved ? {...prevState, search: !prevState.search} : {search: !prevState.search, saved: !prevState.saved};
        })
    }


    return (
    <div id='sidebar'>
        <FirstSideBar mode={mode} savedHandler={savedHandler}/>
        {mode.saved &&
        <div className='second_sidebar_div'>
            <div className='search_sidebar_div'>
                <img src={search_icon} className='search_sidebar_icon' alt=''/>
                <input type='text' className="search_sidebar_input" placeholder='Место, адрес...'/>  
            </div>
            
            <h2 className='text_favourite'>Избранное:</h2>

            <div className="card_div">
                <Card/>
            </div>
        </div>}
        {
            mode.search &&
            <div className='second_sidebar_div'>
                <div className='search_sidebar_div'>
                    <img src={search_icon} className='search_sidebar_icon' alt=''/>
                    <input type='text' className="search_sidebar_input" placeholder='Место, адрес...'/>  
                </div>
                <h3 className="text_favourite">Искать:</h3>
                <List radius={radius} infrastructure={infrastructure} filterOptionsHandler={filterOptionsHandler}/>
                <h3 className="text_favourite">В радиусе</h3>
                <div className="RadiusDiv">
                    <input type="number" className="RadiusInput" placeholder="1 - 4" onChange={(val) => radiusHandler(Number(val.target.value))}/>
                    <h3 className='RadiusText'>км</h3>
                </div>
                <div className="search_btn_div">
                    <button className="search_btn">
                        <img className="search_img" src={search_btn} alt='search_button'/>
                    </button>
                </div>
            </div>
        }
    </div>)
}