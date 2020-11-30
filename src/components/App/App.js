import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import NewsApi from '../../utils/NewsApi';
import MainApi from '../../utils/MainApi';

function App() {
  const [isOpen, setIsOpen] = useState(false); // открытие/закрытие попапа
  const [searchResult, setSearchResult] = useState([]); // найденные новости
  const [searchResultMain, setSearchResultMain] = useState([]); // новости для вывода на страниццу
  const [searchWord, setSearchWord] = useState(''); // слово поиска
  const [searchForm, setSearchForm] = useState(false); // видимость результатов поиска
  const [noResult, setNoResult] = useState(false); // нет результатов
  const [preloader, setPreloader] = useState(false); // прелоудер
  const [email, setEmail] = useState(''); // значение инпута емейл
  const [password, setPassword] = useState(''); // значение инпута пароль
  const [name, setName] = useState(''); // значение инпута имя
  const [sameUser, setSameUser] = useState(false); // проверка юзера в базе

  // console.log(`e: ${email}, p: ${password}, n: ${name}`);

  const newsApi = new NewsApi(); // экземпляр апи по поиску новостей
  const mainApi = new MainApi(); // экземпляр главного апи

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

    newsApi.getNews(searchWord)
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

  const registration = (popup) => {
    mainApi.register(email, password, name, setSameUser, popup)
    .then(res => console.log(res))
  }

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
    <div className="App">
      <Switch>
        <Route path="/saved-news">
          <SavedNews />
        </Route>

        <Route path="/">
          <Main open={openPopup} addResult={addResult} setSearchWord={setSearchWord} noResult={noResult} preloader={preloader}
            searchForm={searchForm} searchResultMain={searchResultMain} searchWord={searchWord} addMoreResults={addMoreResults} />
        </Route>
      </Switch>

      <Popup isOpen={isOpen} onClose={closePopup} email={email} setEmail={setEmail}
        password={password} setPassword={setPassword} name={name} setName={setName}
        registration={registration} sameUser={sameUser} />

      <Footer />
    </div>
  );
}

export default App;
