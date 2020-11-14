import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <main className="Main">
      <div className="Main__search">
        <Header />
        <h1 className="Main__title">Что творится в мире?</h1>
        <h2 className="Main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h2>
        <SearchForm />
      </div>
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