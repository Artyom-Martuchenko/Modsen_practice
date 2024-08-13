import './BigCard.css';
import {useState} from 'react';
import noImage from '../../assets/no_image.png'
import culture from'@/culture.png';
import nature from'@/nature.png';
import history from '@/history.png';
import industry from'@/Property 1=fa-solid_industry.png';
import car from'@/Property 1=fa_car.png';
import market from'@/Property 1=fontisto_shopping-basket.png';
import bank from'@/bank.png';
import park from'@/Property 1=majesticons_ferris-wheel.png';
import bicycle_road from'@/Property 1=ph_bicycle.png';
import cenzured from'@/18+.png';
import sport from'@/Property 1=fluent_sport-soccer-16-filled.png';
import church from'@/church.png';
import food from'@/food.png';
import hotels from'@/hotels.png';
import interesting_places from '@/other.png';
import situated from '@/big_card_icon_direction_off.png';
import walk from '@/big_card_icon_walk.png';
import button_car from '@/big_card_icon_car.png'
import save_off from '@/big_card_icon_save_off.png';
import save_on from '@/big_card_icon_save_on.png';
import { useEffect } from 'react';

export function BigCard({savedTopics, data, endPositionHandler, profile, deleteSavedTopics, addSavedTopics} : {savedTopics: any, deleteSavedTopics: (id:string) => void, addSavedTopics: (data:any) => void, profile : null | 'driving-car' | 'foot-walking', data : any, endPositionHandler: (value : number[] | null, prof: "driving-car" | "foot-walking" | null) => void}) {
  const [active, setActive] = useState(false);

  const clickHandler = () =>{
    setActive((prev) => !prev);
    if(active){
      deleteSavedTopics(data.xid)
    }else{
      addSavedTopics(data)
    }
  }

  useEffect(()=>{
    let result = false;
    for(let topic of savedTopics){
      if(topic.xid == data.xid){
        result = !result
      }
    }
    setActive(result)
  },[data.xid]);

  const clickHandlerDirection = () => {
    endPositionHandler(profile !== 'driving-car' ? [data.point.lat, data.point.lon] : null, profile === null ? 'foot-walking' : profile === 'foot-walking' ? 'driving-car' : null)
    console.log(profile);
  }

  const defineType = (prop: string) => {
    let result = [];
    if (prop.includes("nature")) {
      result.push(nature);
    }

    if (prop.includes("histor")) {
      result.push(history);
    }

    if (prop.includes("industr")) {
      result.push(industry);
    }

    if (prop.includes("car")) {
      result.push(car);
    }

    if (prop.includes("shop") || prop.includes("market")) {
      result.push(market);
    }
    
    if (prop.includes("bicycl")) {
      result.push(bicycle_road);
    }
    
    if (prop.includes("bank")) {
      result.push(bank);
    }
    
    if (prop.includes("park")) {
      result.push(park);
    }
    
    if (prop.includes("gym") || prop.includes("stadium")) {
      result.push(sport);
    }
    
    if (prop.includes("cultur")) {
      result.push(culture);
    }
    
    if (prop.includes("church") || prop.includes("religion")) {
      result.push(church);
    }
    
    if (prop.includes("food")) {
      result.push(food);
    }
    
    if (prop.includes("adult")) {
      result.push(cenzured);
    }
    
    if (prop.includes("accomodations")){
      result.push(hotels);
    }

    if (prop.includes("interest")){
      result.push(interesting_places);
    }

    return result;
  };

  return (
    <div className="big_cards_main" key={data.xid}>
      <img className="big_cards_photo" src={data.preview !== undefined && data.preview.source !== undefined ? data.preview.source : noImage} alt=''/>
      <div id="big_cards_group">
        <div>
          <div className="big_cards_div">
            {defineType(data.kinds).map((el:string) => <img className="big_cards_attributes" src={el} alt=''/>)}
          </div>
          <h2 className="big_card_name">{data.name}</h2>
          <h4 className="big_card_text">{data.wikipedia_extracts !== undefined && data.wikipedia_extracts.text !== undefined? data.wikipedia_extracts.text : data.kinds}</h4>
        </div>
        <div id="big_cards_group_buttons">
          {active ? <button id='big_card_save' className='button_save_active' onClick={clickHandler}>
            <img className='big_card_button_icon' src={save_on} alt=''/>
            <h3 className='big_card_button_text'>Сохранено</h3>
          </button> : 
          <button className='button_save_disactive' onClick={clickHandler}>
            <img className='big_card_button_icon' src={save_off} alt=''/>
            <h3 className='big_card_button_text'>Сохранить</h3>
          </button>}
          {profile == null && <button onClick={clickHandlerDirection}  id='big_card_direction' className='button_search_disactive'>
            <img className='big_card_button_icon' src={situated} alt=''/>
            <h3 className='big_card_button_text'>Машрут</h3>
          </button>}
          {profile == 'foot-walking' && <button onClick={clickHandlerDirection} id='big_card_walking' className='button_save_active'>
            <img className='big_card_button_icon' src={walk} alt=''/>
            <h3 className='big_card_button_text'>Пешком</h3>
          </button>}
          {profile == 'driving-car' && <button onClick={clickHandlerDirection} id='big_card_car' className='button_save_active'>
            <img className='big_card_button_icon' src={button_car} alt=''/>
            <h3 className='big_card_button_text'>На машине</h3>
          </button>}
        </div>
      </div>
    </div>
  );
}
