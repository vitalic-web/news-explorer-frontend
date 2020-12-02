import './SavedNews.css';
import { useContext } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="SavedNews">
      <SavedNewsHeader
        isLogin={props.isLogin}
        userName={currentUser.name}
        articles_amount="5"  // searchResultSaved.length
        tags_amount="4"
        tag1="Природа"
        tag2="Тайга"
        signOut={props.signOut} />

      {/* <NewsCardList articles={searchResultSaved} isLogin={true} /> */}
    </div>
  );
}

export default SavedNews;