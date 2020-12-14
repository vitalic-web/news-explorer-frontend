import './SavedNewsHeader.css';
import Header from '../Header/Header';

function SavedNewsHeader(props) {
  // метод сортировки сохраненных статей по количеству ключевых слов
  const sortArrByKeyword = arr => {
    const keywordArr = arr.map(item => item.keyword);
    let numOfKewords = [];

    for (let i = 0; i < keywordArr.length; i++) {
      let amount = 0;
      const keyword = keywordArr[i];

      keywordArr.forEach(item => {
        if (item === keyword) {
          amount++;
        }
      })

      if (!numOfKewords.find(item => item.keyword === keyword)) {
        numOfKewords.push({ keyword, amount })
      }
    }

    return numOfKewords.sort(function (a, b) {
      return b.amount - a.amount;
    });
  }

  const numOfKewords = sortArrByKeyword(props.savedArticlesData);
  const amountRemain = numOfKewords.length - 2;

  return (
    <div className="SavedNewsHeader">
      <Header isLogin={props.isLogin} signOut={props.signOut} setSavedArticles={props.setSavedArticles} />
      <div className="SavedNewsHeader__text">
        <p className="SavedNewsHeader__title">Сохранённые статьи</p>
        <h1 className="SavedNewsHeader__main-title">{props.userName}, у вас {props.articles_amount} сохранённых статей</h1>
        {
          numOfKewords.length > 3
          ?
          <p className="SavedNewsHeader__tags">
            По ключевым словам: <b>{numOfKewords[0].keyword}</b>, <b>{numOfKewords[1].keyword}</b> и <b>{amountRemain}-м другим</b>
          </p>
          :
          <>
          {
            numOfKewords.length === 3
            &&
            <p className="SavedNewsHeader__tags">
              По ключевым словам: <b>{numOfKewords[0].keyword}</b>, <b>{numOfKewords[1].keyword}</b>, <b>{numOfKewords[2].keyword}</b>
            </p>
          }

          {
            numOfKewords.length === 2
            &&
            <p className="SavedNewsHeader__tags">
              По ключевым словам: <b>{numOfKewords[0].keyword}</b>, <b>{numOfKewords[1].keyword}</b>
            </p>
          }

          {
            numOfKewords.length === 1
            &&
            <p className="SavedNewsHeader__tags">
              По ключевому слову: <b>{numOfKewords[0].keyword}</b>
            </p>
          }

          </>

        }
      </div>
    </div>
  );
}

export default SavedNewsHeader;