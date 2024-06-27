import './List.css';
import { useState } from 'react';
import { Element, actionType, dummy_items } from '../../constants/constants';

export function List ({radius, infrastructure, filterOptionsHandler}:{radius : number, infrastructure : any[], filterOptionsHandler : (element : Element, action : actionType) => void}){
  const [items, setItems] = useState(dummy_items)

  const itemFilter = (value : { kinds: string }) => {
    if(infrastructure.length !== 0 && radius !== 0){
      for(let index = 0; index < infrastructure.length; index++){
        if(infrastructure[index].kinds.includes(value.kinds)){
          return true
        } 
      }
    }
    return infrastructure.length == 0 || radius === 0
  }

  const itemHandler = (item : Element) => {
    if(item.active){
      filterOptionsHandler(item, 'delete')
      setItems((prev) => [...prev, {...item, active: false}])
    }else{
      filterOptionsHandler(item, 'add')
      setItems((prev) => [...prev, {...item, active: true}])
    }
  }

  return (
  <div className="list_border">
    <div className="scrolling">
      <div className="list">
        {items.filter((item) => itemFilter(item)).map((item) => <button className="button_list" key={item.id} onClick={() => itemHandler(item)}>
          <img className="types_img" src={item.img} alt="type"/>
          <h4 className="types_text">{item.name}</h4>
        </button>)}
      </div>
    </div>
  </div>
  )
}