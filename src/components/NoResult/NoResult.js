import './NoResult.css';
import noResult from '../../images/NoResult.svg';

function NoResult(props) {
  console.log(props.newsSearchError);

  return (
    <div className="NoResult">
      <img className="NoResult__image" src={noResult} alt="no result"/>
      <h3 className="NoResult__title">{props.newsSearchError}</h3>
      <p className="NoResult__text">К сожалению по вашему запросу ничего не найдено.</p>
    </div>
  );
}

export default NoResult;