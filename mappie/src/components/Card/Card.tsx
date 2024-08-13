import save_symbol from '@/save_cards.png';
import arrow_symbol from '@/arrow_cards.png';
import culture from '@/culture.png';
import history from '@/history.png';
import './Card.css';
import styled from 'styled-components';

import nature from'@/nature.png';
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
import no_image from '@/no_image.png';

const DivPhoto = styled.div<{ $photo?: string; }>`
    background-image: url(${props => props.$photo});
    margin-right: 1.25rem;
    flex-basis: 50%;
    border-radius: 0.5rem;
    width: 14.438rem;
    height: 6.188rem;
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    display: flex;
    justify-content: end;
    align-items: end;
`

export function Card({data, deleteSavedTopics, xidHandler}:{ xidHandler: (xid:string) => void, deleteSavedTopics: (id:string)=>void, data : any}){
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
    return(
        <div className='card' key={data.xid}>
            <div className='head'>
                <DivPhoto $photo={data.preview !== undefined && data.preview.source !== undefined? data.preview.source : no_image}>
                    {defineType(data.kinds).map(element => <img src={element} className='attributes' alt='attributes'/>)}
                </DivPhoto>
                <h3 className='name'>{data.name}</h3>
            </div>
            {data.wikipedia_extracts !== undefined && <h2 className='description'>{data.wikipedia_extracts.text}</h2>}
            <div className='low_buttons'>
                <button onClick={() => deleteSavedTopics(data.xid)}>
                    <img src={save_symbol} alt='save symbol'/>
                </button>
                <button onClick={() => xidHandler(data.xid)}>
                    <img src={arrow_symbol} alt='arrow symbol'/>
                </button>
            </div>
        </div>
    )
}