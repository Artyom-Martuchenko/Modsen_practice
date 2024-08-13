import {Card} from '../Card/Card';
import { SearchInput } from '../SearchInput/SearchInput';
import './SavedBar.css';

export function SavedBar({searchNameHandler, savedTopics, deleteSavedTopics, xidHandler}:{xidHandler: (xid:string) => void, deleteSavedTopics: (id:string) => void, savedTopics:object[] | undefined, searchNameHandler:(value:string) => void}){
    return (
    <div className='second_sidebar_div'>
        <SearchInput searchNameHandler={searchNameHandler} />

        <h2 className='text_favourite'>Избранное:</h2>

        <div className="card_div">
            {savedTopics !== undefined && savedTopics.map((item) => <Card xidHandler={xidHandler} data={item} deleteSavedTopics={deleteSavedTopics}/>)}
        </div>
    </div>
    );
}