import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import NoResult from '../NoResult/NoResult';
import Preloader from '../Preloader/Preloader';

function Main(props) {

  return (
    <main className="Main">
      <div className="Main__search-pic">
        <Header open={props.open} isLogin={props.isLogin} signOut={props.signOut} />
        <div className="Main__search">
          <h1 className="Main__title">Что творится в мире?</h1>
          <h2 className="Main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h2>
          <SearchForm addResult={props.addResult} setSearchWord={props.setSearchWord} searchWord={props.searchWord}
            preloader={props.preloader} />
        </div>
      </div>
      {props.noResult && <NoResult newsSearchError={props.newsSearchError} />}
      {props.preloader && <Preloader />}
      {localStorage.articlesDataMain &&
        <div className="Main__search-result">
          <p className="Main__search-result-title">Результаты поиска</p>
          <NewsCardList articles={props.searchResultMain} tag={props.searchWord} isLogin={props.isLogin} open={props.open}
            addNewsCard={props.addNewsCard} deleteNewsCard={props.deleteNewsCard} getUserNewsCards={props.getUserNewsCards} />
          <button className="Main__search-button" onClick={props.addMoreResults}>Показать еще</button>
        </div>
      }
      <About />
    </main>
  );
}

export default Main;