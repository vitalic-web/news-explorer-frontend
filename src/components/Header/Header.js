import './Header.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const history = useHistory();
  const savedArticles = history.location.pathname === '/saved-news';
  const [burger, setBurger] = useState(false);

  return (
    <header className={`Header ${savedArticles && 'Header_saved-news'} ${burger && 'Header_burger'}`}>
      <p className="Header__name">NewsExplorer</p>
      <Navigation open={props.open} burger={setBurger} />
    </header>
  );
}

export default Header;