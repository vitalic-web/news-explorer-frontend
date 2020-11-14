import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews(props) {
  return (
    <div className="SavedNews">
      <SavedNewsHeader
        articles_amount="5"
        tags_amount="4"
        tag1="Природа"
        tag2="Тайга" />
    </div>
  );
}

export default SavedNews;