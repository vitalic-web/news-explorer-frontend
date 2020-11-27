import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  return (
    <div className="NewsCardList">
      {props.articles.map((article, index) =>
        <NewsCard
          key={index}
          link={article.urlToImage}
          date={article.publishedAt}
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