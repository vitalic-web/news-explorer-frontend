import GHlogo from '../../images/Github-icon.svg';
import FBlogo from '../../images/FB-icon.svg';

function Footer() {
  return (
    <footer className="Footer">
      <p className="Footer__copyright">© 2020 Supersite, Powered by News API</p>
      <nav className="Footer__navigation">
        <a className="Footer__navigation-link" href="/">Главная</a>
        <a className="Footer__navigation-link" href="https://praktikum.yandex.ru/" rel="noreferrer" target="_blank">
          Яндекс.Практикум
        </a>
        <a className="Footer__navigation-link" href="https://github.com/vitalic-web/" rel="noreferrer" target="_blank">
          <img src={GHlogo} alt="github logo" />
        </a>
        <a className="Footer__navigation-link" href="https://ru-ru.facebook.com/" rel="noreferrer" target="_blank">
          <img src={FBlogo} alt="facebook logo" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;