import './Navigation.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import logoutIcon from '../../images/Navigation__logout.svg';
import logoutIconSavedNews from '../../images/Navigation__logout_saved-news.svg';
import burgerMenuBlack from '../../images/burgerMenu_black.svg';
import burgerMenuWhite from '../../images/burgerMenu_white.svg';
import closeIcon from '../../images/popup__close-icon.svg';
import useWindowSize from '../../utils/useWindowSize';

function Navigation(props) {
  const history = useHistory();
  const savedArticles = history.location.pathname === '/saved-news'; // проверка на адрес страниццы сохраненных новостей
  const windowSize = useWindowSize();
  const mobileSize = (windowSize.width >= 320) && (windowSize.width <= 767); // проверка на размер экрана 320-767
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const clickBurger = () => {
    props.burger(true);
    setBurgerMenu(true);
    setBurgerMenuActive(true);
    document.body.style.overflow = 'hidden';
  }

  const closeMenu = () => {
    props.burger(false);
    setBurgerMenu(false);
    setBurgerMenuActive(false);
    document.body.style.overflow = '';
  }

  return (
    <>
      {mobileSize
        ?
        <nav>
          {burgerMenuActive
          ?
          <img className="Navigation__burger-menu-icon" src={closeIcon} alt="иконка закрытия меню" onClick={closeMenu} />
          :
          <img className="Navigation__burger-menu-icon" src={savedArticles ? burgerMenuBlack : burgerMenuWhite} alt="иконка мобильного меню" onClick={clickBurger} />
          }
          <section className={`Navigation__burger-menu ${burgerMenu && 'Navigation__burger-menu_active'}`}>
            <div className="Navigation__burger-menu-container">
              <a className="Navigation__burger-menu-link" href="/">Главная</a>
              <a className="Navigation__burger-menu-link" href="/saved-news">Сохранённые статьи</a>
              {savedArticles
              ?
              <button className="Navigation__auth Navigation__auth_mobile">
                <p className="Navigation__auth-name Navigation__auth-name_mobile">{props.userName}</p>
                <img className="Navigation__logout Navigation__logout_mobile" src={logoutIcon} alt="Иконка выхода" />
              </button>
              :
              <button className="Navigation__auth Navigation__auth_mobile" onClick={props.open}>
                <p className="Navigation__auth-name Navigation__auth-name_mobile">Авторизоваться</p>
              </button>
              }
            </div>
          </section>
        </nav>
        :
        <nav className="Navigation">
          <a className={`Navigation__main ${savedArticles && 'Navigation__main_saved-news'}`} href="/">
            Главная
          </a>
          {!savedArticles &&
            <button className={`Navigation__auth ${savedArticles && 'Navigation__auth_saved-news'}`} onClick={props.open}>
              <p className="Navigation__auth-name">Авторизоваться</p>
            </button>
          }
          <a className={`Navigation__saved-articles ${savedArticles && 'Navigation__saved-articles_saved-news'}`}
            href="/saved-news">
            Сохраненные статьи
          </a>
          <button className={`Navigation__auth ${savedArticles && 'Navigation__auth_saved-news'}`}>
            <p className="Navigation__auth-name">{props.userName}</p>
            <img className="Navigation__logout"
              src={savedArticles ? logoutIconSavedNews : logoutIcon}
              alt="Иконка выхода" />
          </button>
        </nav>
      }
    </>
  );
}

export default Navigation;