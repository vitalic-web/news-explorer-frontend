import './NewsCard.css';
import { useState } from 'react';

function NewsCard(props) {
  const [click, setClick] = useState(false);
  const toggleBookmark = (e) => {
    e.preventDefault();
    click ? setClick(false) : setClick(true);
  }

  const deleteArticle = (e) => e.preventDefault();

  return (
    <a className="NewsCard" href={props.sourceLink} rel="noreferrer" target="_blank">
      <div className="NewsCard__content">
        <img className="NewsCard__image" src={props.link} alt={props.title} />
        <p className="NewsCard__date">{props.date}</p>
        <h3 className="NewsCard__title">{props.title}</h3>
        <p className="NewsCard__text">{props.text}</p>
      </div>
      <p className="NewsCard__source">{props.sourceName}</p>
      {props.isLogin
        ? <div className="NewsCard__bookmark">
            <div onClick={deleteArticle} className="NewsCard__bookmark-delete-image" />
            <button className="NewsCard__bookmark-button NewsCard__bookmark-button_logged-in">Убрать из сохранённых</button>
            <button className="NewsCard__bookmark-button NewsCard__bookmark-button_tagged">{props.tag}</button>
          </div>
        : <div className="NewsCard__bookmark">
            <div onClick={toggleBookmark} className={`NewsCard__bookmark-image ${click && 'NewsCard__bookmark-image_checked'}`} />
            <button className="NewsCard__bookmark-button">Войдите, чтобы сохранять статьи</button>
          </div>
      }
    </a>

    // <div className="NewsCard">
    //   <div className="NewsCard__content">
    //     <img className="NewsCard__image" src={props.link} alt={props.title} />
    //     <p className="NewsCard__date">{props.date}</p>
    //     <h3 className="NewsCard__title">{props.title}</h3>
    //     <p className="NewsCard__text">{props.text}</p>
    //   </div>
    //   <a className="NewsCard__source" href={props.sourceLink} rel="noreferrer" target="_blank">{props.sourceName}</a>
    //   {props.isLogin
    //     ? <div className="NewsCard__bookmark">
    //         <div className="NewsCard__delete-image" />
    //         <button className="NewsCard__bookmark-button NewsCard__bookmark-button_logged-in">Убрать из сохранённых</button>
    //         <button className="NewsCard__bookmark-button NewsCard__bookmark-button_tagged">{props.tag}</button>
    //       </div>
    //     : <div className="NewsCard__bookmark">
    //         <div onClick={toggleBookmark} className={`NewsCard__bookmark-image ${click && 'NewsCard__bookmark-image_checked'}`} />
    //         <button className="NewsCard__bookmark-button">Войдите, чтобы сохранять статьи</button>
    //       </div>
    //   }
    // </div>
  );
}

export default NewsCard;
