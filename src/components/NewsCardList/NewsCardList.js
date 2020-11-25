import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  return (
    <div className="NewsCardList">
      {props.articles.map(article =>
        <NewsCard
          key={article._id}
          link={article.link}
          date={article.date}
          title={article.title}
          text={article.text}
          sourceName={article.sourceName}
          sourceLink={article.sourceLink}
          tag={article.tag}
        />
      )}
    </div>
  );
}

export default NewsCardList;