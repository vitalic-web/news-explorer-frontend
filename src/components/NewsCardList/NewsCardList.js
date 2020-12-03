import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useHistory } from 'react-router-dom';

function NewsCardList(props) {
  const history = useHistory();
  const savedArticles = history.location.pathname === '/saved-news';

  const dateFormat = date => {
    const newsDate = new Date(date);

    const monthDayDate = new Intl.DateTimeFormat('ru', {
      month: "long",
      day: "numeric",
    }).format(newsDate);

    const newsCardDate = `${monthDayDate}, ${newsDate.getFullYear()}`;

    return newsCardDate;
  }

  return (
    <div className="NewsCardList">
      {props.articles.map((article, index) =>
        <NewsCard
          key={index}
          articles={props.articles}
          number={index}
          link={savedArticles ? article.image : article.urlToImage}
          date={dateFormat(savedArticles ? article.date : article.publishedAt)}
          title={article.title}
          text={savedArticles ? article.text : article.description}
          sourceName={savedArticles ? article.source : article.source.name}
          sourceLink={savedArticles ? article.link : article.url}
          tag={article.keyword}
          isLogin={props.isLogin}
          addNewsCard={props.addNewsCard}
          deleteNewsCard={props.deleteNewsCard}
          getUserNewsCards={props.getUserNewsCards}
        />
      )}
    </div>
  );
}

export default NewsCardList;