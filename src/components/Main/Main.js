import './Main.css';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Popup from '../Popup/Popup';

import NewsCardPic1 from '../../images/NewsCard__pic1.png';
import NewsCardPic2 from '../../images/NewsCard__pic2.png';
import NewsCardPic3 from '../../images/NewsCard__pic3.png';

// импорт компонентов "Нет результатов" и "Прелоудер" для проверки
// добавлены в разметку и закомментированы в конце страницы после компонента "Об авторе"
import NoResult from '../NoResult/NoResult';
import Preloader from '../Preloader/Preloader';

function Main() {
  // результаты поиска новостей
  const searchResult = [
    {
      _id: 1,
      link: NewsCardPic1,
      date: "2 августа, 2019",
      title: "Национальное достояние – парки",
      text: "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
      sourceName: "ЛЕНТА.РУ",
      sourceLink: "https://lenta.ru/"
    },
    {
      _id: 2,
      link: NewsCardPic2,
      date: "2 августа, 2019",
      title: "Лесные огоньки: история одной фотографии",
      text: "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
      sourceName: "МЕДУЗА",
      sourceLink: "https://meduza.io/"
    },
    {
      _id: 3,
      link: NewsCardPic3,
      date: "2 августа, 2019",
      title: "Первозданная тайга»: новый фотопроект Игоря Шпиленка",
      text: "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где dfgdgdfgdfg dfgdf gdfgdfd gdgdfgdf dgdgdf dfgdfg  dfgdf g",
      sourceName: "РИА",
      sourceLink: "https://ria.ru/"
    },
    {
      _id: 4,
      link: NewsCardPic1,
      date: "2 августа, 2019",
      title: "1Национальное достояние – парки",
      text: "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
      sourceName: "ЛЕНТА.РУ",
      sourceLink: "https://lenta.ru/",
      tag: "Парки"
    },
    {
      _id: 5,
      link: NewsCardPic2,
      date: "2 августа, 2019",
      title: "2Лесные огоньки: история одной фотографии",
      text: "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
      sourceName: "МЕДУЗА",
      sourceLink: "https://meduza.io/",
      tag: "Фотография"
    },
    {
      _id: 6,
      link: NewsCardPic1,
      date: "2 августа, 2019",
      title: "3Национальное достояние – парки",
      text: "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
      sourceName: "ЛЕНТА.РУ",
      sourceLink: "https://lenta.ru/"
    },
    {
      _id: 7,
      link: NewsCardPic2,
      date: "2 августа, 2019",
      title: "4Лесные огоньки: история одной фотографии",
      text: "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
      sourceName: "МЕДУЗА",
      sourceLink: "https://meduza.io/"
    },
    {
      _id: 8,
      link: NewsCardPic3,
      date: "2 августа, 2019",
      title: "5Первозданная тайга»: новый фотопроект Игоря Шпиленка",
      text: "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где dfgdgdfgdfg dfgdf gdfgdfd gdgdfgdf dgdgdf dfgdfg  dfgdf g",
      sourceName: "РИА",
      sourceLink: "https://ria.ru/"
    },
    {
      _id: 9,
      link: NewsCardPic1,
      date: "2 августа, 2019",
      title: "6Национальное достояние – парки",
      text: "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
      sourceName: "ЛЕНТА.РУ",
      sourceLink: "https://lenta.ru/",
      tag: "Парки"
    },
    {
      _id: 10,
      link: NewsCardPic2,
      date: "2 августа, 2019",
      title: "7Лесные огоньки: история одной фотографии",
      text: "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
      sourceName: "МЕДУЗА",
      sourceLink: "https://meduza.io/",
      tag: "Фотография"
    },
  ]

  // стейт для выгрузки нужного количества новостей на страницу
  const [searchResultMain, setSearchResultMain] = useState(searchResult.slice(0, 3));

  // метод для добавляения новых карточек при нажатии на кнопку Показать еще
  const addMoreResults = () => {
    setSearchResultMain([...searchResultMain, ...searchResult.slice(searchResultMain.length, searchResultMain.length + 3)]);
  }

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('Popup_active')) {
        closePopup();
      }
    }

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }

    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  return (
    <main className="Main">
      <div className="Main__search-pic">
        <Header open={openPopup} userName="Васёк" />
        <div className="Main__search">
          <h1 className="Main__title">Что творится в мире?</h1>
          <h2 className="Main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h2>
          <SearchForm />
        </div>
      </div>
      <div className="Main__search-result">
        <p className="Main__search-result-title">Результаты поиска</p>
        <NewsCardList articles={searchResultMain} />
        <button className="Main__search-button" onClick={addMoreResults}>Показать еще</button>
      </div>
      <Popup isOpen={isOpen} onClose={closePopup} />
      <About />
      {/* <NoResult /> */}
      {/* <Preloader /> */}
    </main>
  );
}

export default Main;