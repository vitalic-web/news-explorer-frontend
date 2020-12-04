import './NewsCard.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import noImage from '../../images/no-image.png';

function NewsCard(props) {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const savedArticles = history.location.pathname === '/saved-news'; // проверка на роут страницы сохраненных новостей

  const toggleBookmark = (e) => {
    e.preventDefault();

    if (click || props.articles[props.number].saved) {
      props.deleteNewsCard(props.articles[props.number], setClick);
      props.articles[props.number].saved = false;
    } else {
      props.addNewsCard(props.articles[props.number], setClick);
      props.getUserNewsCards();
    }
  }

  const deleteArticle = (e) => {
    e.preventDefault();

    props.deleteNewsCardSaved(props.articles[props.number], setClick);
  }

  const openLoginPopup = () => {
    props.open(true);
  }

  return (
    <div className="NewsCard-area">
      <a className="NewsCard" href={props.sourceLink} rel="noreferrer" target="_blank">
        <div className="NewsCard__content">
          <img className="NewsCard__image" src={props.link || noImage} alt={props.title} />
          <p className="NewsCard__date">{props.date}</p>
          <h3 className="NewsCard__title">{props.title}</h3>
          <p className="NewsCard__text">{props.text}</p>
        </div>
        <p className="NewsCard__source">{props.sourceName}</p>
      </a>

      {savedArticles
        ?
        <>
          <button className="NewsCard__bookmark-button NewsCard__bookmark-button_tagged">{props.tag}</button>
          <div className="NewsCard__bookmark">
            <div onClick={deleteArticle} className="NewsCard__bookmark-delete-image" />
            <button className="NewsCard__bookmark-button NewsCard__bookmark-button_logged-in">Убрать из сохранённых</button>
          </div>
        </>
        :
        <div className="NewsCard__bookmark">
          <div onClick={props.isLogin ? toggleBookmark : openLoginPopup} className={`NewsCard__bookmark-image ${click && 'NewsCard__bookmark-image_checked'} ${props.isLogin && 'NewsCard__bookmark-image_logged'} ${props.saved && 'NewsCard__bookmark-image_checked'}`} />
          {!props.isLogin && <button className="NewsCard__bookmark-button">Войдите, чтобы сохранять статьи</button>}
        </div>
      }
    </div>
  );
}

export default NewsCard;
