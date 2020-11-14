import './SavedNewsHeader.css';
import Header from '../Header/Header';

function SavedNewsHeader(props) {
  const amountRemain = props.tags_amount - 2;

  return (
    <div className="SavedNewsHeader">
      <Header saved_news={true} />
      <p className="SavedNewsHeader__title">Сохранённые статьи</p>
      <h1 className="SavedNewsHeader__main-title">Грета, у вас {props.articles_amount} сохранённых статей</h1>
      <p className="SavedNewsHeader__tags">По ключевым словам: <b>{props.tag1}</b>, <b>{props.tag2}</b> и <b>{amountRemain}-м другим</b></p>
    </div>
  );
}

export default SavedNewsHeader;