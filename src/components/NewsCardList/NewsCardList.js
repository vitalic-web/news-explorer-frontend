import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
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
          link={article.urlToImage}
          date={dateFormat(article.publishedAt)}
          title={article.title}
          text={article.description}
          sourceName={article.source.name}
          sourceLink={article.url}
          tag={props.tag}
          isLogin={props.isLogin}
          addNewsCard={props.addNewsCard}
        />
      )}
    </div>
  );
}

export default NewsCardList;