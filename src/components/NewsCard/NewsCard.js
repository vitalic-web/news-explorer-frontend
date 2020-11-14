import './NewsCard.css';
import { useState } from 'react';

function NewsCard(props) {
  const [click, setClick] = useState(false);
  const toggleBookmark = () => click ? setClick(false) : setClick(true);

  return (
    <div className="NewsCard">
      <div className="NewsCard__content">
        <img className="NewsCard__image" src={props.link} alt="tttt" />
        <p className="NewsCard__date">{props.date}</p>
        <h3 className="NewsCard__title">{props.title}</h3>
        <p className="NewsCard__text">{props.text}</p>
      </div>
      <a className="NewsCard__source" href={props.sourceLink} rel="noreferrer" target="_blank">{props.sourceName}</a>
      <div className="NewsCard__bookmark">
        <div onClick={toggleBookmark} className={`NewsCard__bookmark-image ${click && 'NewsCard__bookmark-image_checked'}`}/>
      </div>
      <button className="NewsCard__bookmark-button">Войдите, чтобы сохранять статьи</button>
    </div>
  );
}

export default NewsCard;
