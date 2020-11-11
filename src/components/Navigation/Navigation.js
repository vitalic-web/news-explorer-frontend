import logoutIcon from '../../images/Navigation__logout.svg';

function Navigation() {
  return (
    <nav className="Navigation">
      <a className="Navigation__main" href="/">Главная</a>
      <a className="Navigation__saved-articles" href="/saved-news">Сохраненные статьи</a>
      <button className="Navigation__auth">
        <p className="Navigation__auth-name">Vitalic</p>
        <img className="Navigation__logout" src={logoutIcon} alt="Иконка выхода" />
      </button>
    </nav>
  );
}

export default Navigation;