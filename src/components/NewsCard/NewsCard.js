import './NewsCard.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NewsCard(props) {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const savedArticles = history.location.pathname === '/saved-news'; // проверка на роут страницы сохраненных новостей

  const toggleBookmark = (e) => {
    e.preventDefault();
    setClick(!click);
  }

  const deleteArticle = (e) => e.preventDefault();

  return (
    <div className="NewsCard-area">
      <a className="NewsCard" href={props.sourceLink} rel="noreferrer" target="_blank">
        <div className="NewsCard__content">
          <img className="NewsCard__image" src={props.link} alt={props.title} />
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
          <div onClick={toggleBookmark} className={`NewsCard__bookmark-image ${click && 'NewsCard__bookmark-image_checked'}`} />
          {!props.isLogin && <button className="NewsCard__bookmark-button">Войдите, чтобы сохранять статьи</button>}
        </div>
      }
    </div>
  );
}

export default NewsCard;
