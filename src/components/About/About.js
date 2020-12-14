import './About.css';
import authorAvatar from '../../images/oKOapHDZKB8 (2).jpg';

function About() {
  return (
    <div className="About">
      <div className="About__avatar">
        <img className="About__avatar-image" src={authorAvatar} alt="author avatar" />
      </div>
      <div className="About__description">
        <h3 className="About__description-title">Об авторе</h3>
        <p className="About__description-text">
          Виталий Стекольщиков. Фронтенд-разработчик.
        </p>
        <p className="About__description-text">
          Данный сайт представляет собой дипломный проект Яндекс.Практикума.
          <br></br>
          При разработке использованы следующие технологии: HTML, CSS, JavaScript, React, Node.js, Express, Mongo DB, REST API.
        </p>
      </div>
    </div>
  );
}

export default About;