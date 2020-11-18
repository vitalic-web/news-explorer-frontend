import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  return (
    <header className={`Header ${props.saved_news && 'Header_saved-news'}`}>
      <p className="Header__name">NewsExplorer</p>
      <Navigation open={props.open} saved_news={props.saved_news} />
    </header>
  );
}

export default Header;