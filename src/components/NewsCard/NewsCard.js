import NewsCardBookmark from '../../images/NewsCard__bookmark.svg';

function NewsCard(props) {
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
        <img className="NewsCard__bookmark-image" src={NewsCardBookmark} alt="bookmark"/>
      </div>
      <button className="NewsCard__bookmark-button">Войдите, чтобы сохранять статьи</button>
    </div>
  );
}

export default NewsCard;