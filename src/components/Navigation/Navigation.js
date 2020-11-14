import './Navigation.css';
import logoutIcon from '../../images/Navigation__logout.svg';
import logoutIconSavedNews from '../../images/Navigation__logout_saved-news.svg';

function Navigation(props) {
  return (
    <nav className="Navigation">
      <a className={`Navigation__main ${props.saved_news && 'Navigation__main_saved-news'}`}
        href="/">
        Главная
      </a>
      <a className={`Navigation__saved-articles ${props.saved_news && 'Navigation__saved-articles_saved-news'}`}
        href="/saved-news">
        Сохраненные статьи
      </a>
      <button className={`Navigation__auth ${props.saved_news && 'Navigation__auth_saved-news'}`}>
        <p className="Navigation__auth-name">Vitalic</p>
        <img className="Navigation__logout"
          src={props.saved_news ? logoutIconSavedNews : logoutIcon}
          alt="Иконка выхода" />
      </button>
    </nav>
  );
}

export default Navigation;