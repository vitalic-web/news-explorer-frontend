import './SavedNews.css';
import { useContext } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="SavedNews">
      <SavedNewsHeader
        isLogin={props.isLogin}
        userName={currentUser.name}
        articles_amount={props.savedArticlesData.length}
        signOut={props.signOut}
        savedArticlesData={props.savedArticlesData}
        setSavedArticles={props.setSavedArticles}
      />
      {
        props.savedArticlesData.length > 0
        &&
        <NewsCardList articles={props.savedArticlesData} isLogin={true} deleteNewsCardSaved={props.deleteNewsCardSaved} />
      }
    </div>
  );
}

export default SavedNews;