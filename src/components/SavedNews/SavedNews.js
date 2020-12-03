import './SavedNews.css';
import { useContext } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews(props) {
  const currentUser = useContext(CurrentUserContext);

  console.log(props.savedArticlesData);

  return (
    <div className="SavedNews">
      <SavedNewsHeader
        isLogin={props.isLogin}
        userName={currentUser.name}
        articles_amount={props.savedArticlesData.length}
        tags_amount="4"
        tag1="Природа"
        tag2="Тайга"
        signOut={props.signOut} />

      {props.savedArticlesData.length > 0 && <NewsCardList articles={props.savedArticlesData} isLogin={true} />}
    </div>
  );
}

export default SavedNews;