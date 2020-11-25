import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import NewsCardPic1 from '../../images/NewsCard__pic1.png';
import NewsCardPic2 from '../../images/NewsCard__pic2.png';
import NewsCardPic3 from '../../images/NewsCard__pic3.png';

function SavedNews() {
  const searchResultSaved = [
    {
      _id: 1,
      link: NewsCardPic1,
      date: "2 августа, 2019",
      title: "Национальное достояние – парки",
      text: "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
      sourceName: "ЛЕНТА.РУ",
      sourceLink: "https://lenta.ru/",
      tag: "Природа"
    },
    {
      _id: 2,
      link: NewsCardPic2,
      date: "2 августа, 2019",
      title: "Лесные огоньки: история одной фотографии",
      text: "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
      sourceName: "МЕДУЗА",
      sourceLink: "https://meduza.io/",
      tag: "Природа"
    },
    {
      _id: 3,
      link: NewsCardPic3,
      date: "2 августа, 2019",
      title: "Первозданная тайга»: новый фотопроект Игоря Шпиленка",
      text: "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где dfgdgdfgdfg dfgdf gdfgdfd gdgdfgdf dgdgdf dfgdfg  dfgdf g",
      sourceName: "РИА",
      sourceLink: "https://ria.ru/",
      tag: "Тайга"
    },
    {
      _id: 4,
      link: NewsCardPic1,
      date: "2 августа, 2019",
      title: "Национальное достояние – парки",
      text: "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
      sourceName: "ЛЕНТА.РУ",
      sourceLink: "https://lenta.ru/",
      tag: "Парки"
    },
    {
      _id: 5,
      link: NewsCardPic2,
      date: "2 августа, 2019",
      title: "Лесные огоньки: история одной фотографии",
      text: "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
      sourceName: "МЕДУЗА",
      sourceLink: "https://meduza.io/",
      tag: "Фотография"
    },
  ]

  return (
    <div className="SavedNews">
      <SavedNewsHeader
        userName="Васёк"
        articles_amount={searchResultSaved.length}
        tags_amount="4"
        tag1="Природа"
        tag2="Тайга" />

      <NewsCardList articles={searchResultSaved} isLogin={true} />
    </div>
  );
}

export default SavedNews;