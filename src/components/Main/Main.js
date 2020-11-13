import Header from '../Header/Header';
import '../Header/Header.css';
import SearchForm from '../SearchForm/SearchForm';
import '../SearchForm/SearchForm.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import '../NewsCardList/NewsCardList.css';
import About from '../About/About';
import '../About/About.css';
import Footer from '../Footer/Footer';
import '../Footer/Footer.css';
import NoResult from '../NoResult/NoResult';
import '../NoResult/NoResult.css';
import Preloader from '../Preloader/Preloader';
import '../Preloader/Preloader.css';

function Main() {
  return (
    <main className="Main">
      <div className="Main__search">
        <Header />
        <h1 className="Main__title">Что творится в мире?</h1>
        <h2 className="Main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h2>
        <SearchForm />
      </div>
      {/* <Preloader /> */}
      {/* <NoResult /> */}
      <div className="Main__search-result">
        <p className="Main__search-result-title">Результаты поиска</p>
        <NewsCardList />
        <button className="Main__search-button">Показать еще</button>
      </div>
      <About />
      <Footer />
    </main>
  );
}

export default Main;