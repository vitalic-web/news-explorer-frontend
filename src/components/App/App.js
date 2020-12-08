import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import NewsApi from '../../utils/NewsApi';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { numOfArticles } from '../../utils/constants';

function App() {
  const [isOpen, setIsOpen] = useState(false); // открытие/закрытие попапа
  const [searchResultMain, setSearchResultMain] = useState(JSON.parse(localStorage.getItem('articlesDataMain')));
  const [searchWord, setSearchWord] = useState(''); // слово поиска
  const [searchForm, setSearchForm] = useState(localStorage.articlesDataMain && true); // видимость результатов поиска
  const [noResult, setNoResult] = useState(false); // нет результатов
  const [preloader, setPreloader] = useState(false); // прелоудер
  const [email, setEmail] = useState(''); // значение инпута емейл
  const [password, setPassword] = useState(''); // значение инпута пароль
  const [name, setName] = useState(''); // значение инпута имя
  const [sameUser, setSameUser] = useState(false); // проверка юзера в базе
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false); //localStorage.isLogin
  const [authError, setAuthError] = useState(false);
  const [savedArticles, setSavedArticles] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const [loginError, setLoginError] = useState('');
  const [savedArticlesData, setSavedArticlesData] = useState(JSON.parse(localStorage.getItem('savedArticlesData')));
  const [newsSearchError, setNewsSearchError] = useState('');

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

  const addNewsCard = (newsCard, setClick) => {
    authApi.addNewArticle(newsCard)
      .then(res => {
        setClick(true);
        setSavedArticlesData([...savedArticlesData, res.data]);
        localStorage.setItem('savedArticlesData', JSON.stringify([...savedArticlesData, res.data]));
      })
      .catch((err) => console.log(err));
  }

  const deleteNewsCard = (newsCard, setClick) => {
    authApi.getSavedArticles()
      .then(res => {
        const deletedCard = res.data.find(item => item.link === (savedArticles ? newsCard.link : newsCard.url));

        authApi.deleterAticle(deletedCard)
          .then(res => {
            deletedCard.saved = false;
            setClick(false);
            setSavedArticlesData(savedArticlesData.filter(item => item.link !== deletedCard.link));
            localStorage.setItem('savedArticlesData', JSON.stringify(savedArticlesData.filter(item => item.link !== deletedCard.link)));
          })
      })
      .catch((err) => console.log(err));
  }

  const getUserNewsCards = () => {
    authApi.getSavedArticles()
      .then(res => {
        localStorage.setItem('savedArticlesData', JSON.stringify(res.data));
        setSavedArticlesData([]);
        setSavedArticlesData(res.data);
      })
      .catch((err) => console.log(err));
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
      .then((res) => {
        if (res.token) {
          setIsLogin(true);
          setCurrentUser(email, password);
        }
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
    localStorage.removeItem('articlesDataMain');
    setSavedArticlesData([]);

    if (savedArticles) {
      setIsOpen(true);
      setEmail('');
      setPassword('');
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
          setNewsSearchError('Ничего не найдено');
          setSearchForm(false);
        } else {
          setNoResult(false);
          setSearchForm(true);

          if (isLogin) { // проверка на наличие найденных карт в сохраненных
            res.articles.forEach(item => {
              if (savedArticlesData.find(savedArticle => savedArticle.link === item.url)) {
                item.saved = true;
              }
            })
            localStorage.setItem('articlesData', JSON.stringify(sortByDate(res.articles)));
            localStorage.setItem('articlesDataMain', JSON.stringify(sortByDate(res.articles).slice(0, numOfArticles)));
            setSearchResultMain(sortByDate(res.articles).slice(0, numOfArticles));

          } else {
            localStorage.setItem('articlesData', JSON.stringify(sortByDate(res.articles)));
            localStorage.setItem('articlesDataMain', JSON.stringify(sortByDate(res.articles).slice(0, numOfArticles)));
            setSearchResultMain(sortByDate(res.articles).slice(0, numOfArticles));
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setPreloader(false);
        setNoResult(true);
        setNewsSearchError('Проблема на сервере');
      });
  }

  // метод для добавляения новых карточек при нажатии на кнопку Показать еще
  const addMoreResults = () => {
    setSearchResultMain([...searchResultMain, ...JSON.parse(localStorage.getItem('articlesData')).slice(searchResultMain.length, searchResultMain.length + numOfArticles)]);
    localStorage.setItem('articlesDataMain', JSON.stringify([...searchResultMain, ...JSON.parse(localStorage.getItem('articlesData')).slice(searchResultMain.length, searchResultMain.length + numOfArticles)]));
  }

  // проверка на сохраненные новости
  useEffect(() => {
    setSearchWord(localStorage.searchWord);

    const localData = JSON.parse(localStorage.getItem('articlesData'));
    const localMain = JSON.parse(localStorage.getItem('articlesDataMain'));

    if (!savedArticles && isLogin) {

      localData.forEach(item => {
        if (savedArticlesData.find(savedArticle => savedArticle.link === item.url)) {
          item.saved = true;
        } else {
          item.saved = false;
        }
      })

      localStorage.setItem('articlesData', JSON.stringify(sortByDate(localData)));

      localMain.forEach(item => {
        if (savedArticlesData.find(savedArticle => savedArticle.link === item.url)) {
          item.saved = true;
        } else {
          item.saved = false;
        }
      })

      setSearchResultMain(localMain);
    }

  }, [savedArticles, savedArticlesData])

  // функция открытия попапа
  const openPopup = () => {
    setIsOpen(true);
    setEmail('');
    setPassword('');
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
              deleteNewsCardSaved={deleteNewsCard}
              openPopup={openPopup}
              setSavedArticles={setSavedArticles}
            >
            </ProtectedRoute>

            <Route path="/">
              <Main open={openPopup} addResult={addResult} setSearchWord={setSearchWord} noResult={noResult} preloader={preloader}
                searchForm={searchForm} searchResultMain={searchResultMain} searchWord={searchWord} addMoreResults={addMoreResults}
                isLogin={isLogin} signOut={signOut} addNewsCard={addNewsCard} deleteNewsCard={deleteNewsCard}
                getUserNewsCards={getUserNewsCards} newsSearchError={newsSearchError} setSavedArticles={setSavedArticles} />
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
