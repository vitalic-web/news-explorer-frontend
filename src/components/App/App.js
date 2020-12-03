import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import NewsApi from '../../utils/NewsApi';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(localStorage.isLogin);
  const [authError, setAuthError] = useState(false);
  const history = useHistory();
  const savedArticles = history.location.pathname === '/saved-news';
  const jwt = localStorage.getItem('jwt');
  const [loginError, setLoginError] = useState('');
  const [savedArticlesData, setSavedArticlesData] = useState(JSON.parse(localStorage.getItem('savedArticlesData')));

  const newsApi = new NewsApi(); // экземпляр апи по поиску новостей
  const mainApi = new MainApi({ // экземпляр главного апи
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  const authApi = new MainApi({ // экземпляр главного апи для аутентийикации
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  });

  console.log(searchResult);
  console.log(savedArticlesData);

  const addNewsCard = (newsCard, setClick) => {
    authApi.addNewArticle(newsCard)
      .then(res => {
        setClick(true);
        setSavedArticlesData([...savedArticlesData, res.data]);
        localStorage.setItem('savedArticlesData', JSON.stringify([...savedArticlesData, res.data]));
      })
  }

  const deleteNewsCard = (newsCard, setClick) => {
    authApi.getSavedArticles()
      .then(res => {
        const deletedCard = res.data.find(item => item.link === newsCard.url);

        authApi.deleterAticle(deletedCard)
          .then(res => {
            setClick(false);
            setSavedArticlesData(savedArticlesData.filter(item => item.link !== deletedCard.link));
            localStorage.setItem('savedArticlesData', JSON.stringify(savedArticlesData.filter(item => item.link !== deletedCard.link)));
          })
      })
  }

  const getUserNewsCards = () => {
    authApi.getSavedArticles()
      .then(res => {
        localStorage.setItem('savedArticlesData', JSON.stringify(res.data));
      })
  }

  // регистрация пользователя
  const registration = (popup) => {
    mainApi.register(email, password, name, setSameUser, popup)
      .then(res => console.log(res))
      .catch((err) => console.log(err));
  }

  // авторизация пользователя
  const login = (e) => {
    e.preventDefault();

    authApi.login(email, password, setAuthError, closePopup, setLoginError)
      .then(() => {
        setIsLogin(true);
        setCurrentUser(email, password);
      })
      .catch((err) => console.log(err));
  }

  // проверка токена
  const tokenCheck = (jwt) => {

    if (jwt) {
      authApi.getProfileInfo()
        .then(res => {
          setIsLogin(true);
          setCurrentUser(res);
          getUserNewsCards();
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    tokenCheck(jwt);
  }, [isLogin]);

  // выход из учетной записи
  function signOut() {
    setIsLogin(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('savedArticlesData');

    if (savedArticles) {
      setIsOpen(true);
    }
  }

  // функция сортировки результатов поиска по дате, начиная с самой актуальной
  const sortByDate = arr => {
    return arr.sort(function (a, b) {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    })
  }

  // функция добавления тэга
  const addTag = (arr, tag) => {
    arr.map(item => item.tag = tag);
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
        addTag(res.articles, searchWord);

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
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser &&
        <div className="App">
          <Switch>
            <ProtectedRoute exact path="/saved-news" isLogin={isLogin}
              component={SavedNews}
              signOut={signOut}
              savedArticlesData={savedArticlesData}
            >
              {/* <SavedNews isLogin={isLogin} signOut={signOut}/> */}
            </ProtectedRoute>

            <Route path="/">
              <Main open={openPopup} addResult={addResult} setSearchWord={setSearchWord} noResult={noResult} preloader={preloader}
                searchForm={searchForm} searchResultMain={searchResultMain} searchWord={searchWord} addMoreResults={addMoreResults}
                isLogin={isLogin} signOut={signOut} addNewsCard={addNewsCard} deleteNewsCard={deleteNewsCard}
                getUserNewsCards={getUserNewsCards} />
            </Route>
          </Switch>

          <Popup isOpen={isOpen} onClose={closePopup} email={email} setEmail={setEmail} password={password}
            setPassword={setPassword} name={name} setName={setName} registration={registration} sameUser={sameUser}
            setSameUser={setSameUser} login={login} authError={authError} setAuthError={setAuthError}
            loginError={loginError} />

          <Footer />
        </div>
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
