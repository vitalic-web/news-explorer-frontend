import Navigation from '../Navigation/Navigation';
import '../Navigation/Navigation.css';

function Header() {
  return (
    <header className="Header">
      <p className="Header__name">NewsExplorer</p>
      <Navigation />
    </header>
  );
}

export default Header;