import './Main.css';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Popup from '../Popup/Popup';
import NewsApi from '../../utils/NewsApi';
import NoResult from '../NoResult/NoResult';
import Preloader from '../Preloader/Preloader';

function Main() {
  const tetsApi = new NewsApi(); // экземпляр апи по поиску новостей
  const [isOpen, setIsOpen] = useState(false); // открытие/закрытие попапа
  const [searchResult, setSearchResult] = useState([]); // найденные новости
  const [searchResultMain, setSearchResultMain] = useState([]); // новости для вывода на страниццу
  const [searchWord, setSearchWord] = useState(''); // слово поиска
  const [searchForm, setSearchForm] = useState(false); // видимость результатов поиска
  const [noResult, setNoResult] = useState(false);
  const [preloader, setPreloader] = useState(false);

  // функция открытия попапа
  const openPopup = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  // функция закрытия попапа
  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }

  // функция сортировки результатов поиска по дате, начиная с самой актуальной
  const sortByDate = arr => {
    return arr.sort(function (a, b) {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    })
  }

  // функция поиска новостей
  const addResult = (e) => {
    e.preventDefault();

    setPreloader(true);
    setNoResult(false);
    setSearchForm(false);

    tetsApi.getNews(searchWord)
      .then(res => {

        setPreloader(false);

        if (res.totalResults === 0) {
          setNoResult(true);
          setSearchForm(false);
        } else {
          setNoResult(false);
          setSearchForm(true);
          setSearchResult(sortByDate(res.articles));
          setSearchResultMain(sortByDate(res.articles).slice(0, 3));
        }
      })
  }

  // метод для добавляения новых карточек при нажатии на кнопку Показать еще
  const addMoreResults = () => {
    setSearchResultMain([...searchResultMain, ...searchResult.slice(searchResultMain.length, searchResultMain.length + 3)]);
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
        <Header open={openPopup} />
        <div className="Main__search">
          <h1 className="Main__title">Что творится в мире?</h1>
          <h2 className="Main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h2>
          <SearchForm addResult={addResult} searchWord={setSearchWord} />
        </div>
      </div>
      {noResult && <NoResult />}
      {preloader && <Preloader />}
      {searchForm
        &&
        <div className="Main__search-result">
          <p className="Main__search-result-title">Результаты поиска</p>
          <NewsCardList articles={searchResultMain} tag={searchWord} />
          <button className="Main__search-button" onClick={addMoreResults}>Показать еще</button>
        </div>
      }
      <Popup isOpen={isOpen} onClose={closePopup} />
      <About />
    </main>
  );
}

export default Main;