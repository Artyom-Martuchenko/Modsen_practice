import save_symbol from '../../assets/save_cards.png';
import arrow_symbol from '../../assets/arrow_cards.png';
import cards_photo from '../../assets/cards_photo.png';
import './Card.css';

export function Card(){
    return(
        <div className='main_div'>
            <div className='head'>
                <img className='photo' src={cards_photo} alt='photo'/>
                <h3 className='name'>Name</h3>
            </div>
            <h2 className='decription'>description</h2>
            <div className='low_buttons'>
                <img src={save_symbol} alt='save symbol'/>
                <img src={arrow_symbol} alt='arrow symbol'/>
            </div>
        </div>
    )
}