import { Card } from '../../utils/Card/Card';
import logo from '../../assets/logo.png';
import saved_on from '../../assets/saved=on.png';
import search_off from '../../assets/search=off.png';
import './SideBar.css';

export function SideBar(){
    return (<div className="main_div">
            <div className="first_sidebar_div">
                <img className='logo' src={logo} alt='logo'/>
            
                <button className="search_button">
                    <img src={search_off} alt='search_off'/>
                </button>

                <button className="saved_button">
                    <img src={saved_on} alt='saved_on'/>
                </button>
            </div>
            
            <div className="second_sidebar_div">
                <form className="search_form">   
                    <div className="div_search_upper">
                        <div className="div_search_lower">
                            <svg className="svg_search" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="input_search" placeholder="Место, адрес..." required />
                    </div>
                </form>
                
                <h1 className="text_favourite">Избранное:</h1>

                <div className="card_div">
                    <Card/>
                </div>
            </div>
        </div>)
}