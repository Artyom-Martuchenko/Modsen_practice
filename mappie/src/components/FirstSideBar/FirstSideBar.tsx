import logo from '../../assets/logo.png';
import saved_on from '../../assets/saved=on.png';
import saved_off from '../../assets/saved=off.png';
import search_off from '../../assets/search=off.png';
import search_on from '../../assets/search=on.png';
import user_image from '../../assets/user_image.png';
import { Prop } from '../../constants/constants';

export function FirstSideBar({mode, savedHandler} : Prop){
    return(
        <div className="first_sidebar_div">
            <div className="group_first_sidebar_div">
                <img className='logo' src={logo} alt='logo'/>
            
                <button className="search_button" onClick={() => savedHandler('search')}>
                    {mode.search ? <img src={search_on} alt='search_on'/> : <img src={search_off} alt='search_off'/>}
                </button>

                <button className="saved_button" onClick={() => savedHandler('saved')}>
                    {mode.saved ? <img src={saved_on} alt='saved_on'/> : <img src={saved_off} alt='saved_off'/>}
                </button>

                <button id="user_icon">
                    <img src={user_image} alt='user_icon'/>
                </button>
            </div>
        </div>
    )
}