import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  // const testDate = new Date('2020-11-28T10:46:00Z');

  // const monthDayDate = new Intl.DateTimeFormat('ru', {
  //   month: "long",
  //   day: "numeric",
  // }).format(testDate);

  // const newsCardDate = `${monthDayDate}, ${testDate.getFullYear()}`;

  // console.log(newsCardDate);

  const dateFormat = date => {
    const testDate = new Date(date);

    const monthDayDate = new Intl.DateTimeFormat('ru', {
      month: "long",
      day: "numeric",
    }).format(testDate);

    const newsCardDate = `${monthDayDate}, ${testDate.getFullYear()}`;

    return newsCardDate;
  }

  return (
    <div className="NewsCardList">
      {props.articles.map((article, index) =>
        <NewsCard
          key={index}
          link={article.urlToImage}
          date={dateFormat(article.publishedAt)}
          title={article.title}
          text={article.description}
          sourceName={article.source.name}
          sourceLink={article.url}
          tag={props.tag}
        />
      )}
    </div>
  );
}

export default NewsCardList;