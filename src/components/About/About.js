import './About.css';
import catAvatar from '../../images/9cd0ddd9fb4d9d3910ce3b1d19ca7145.jpg';

function About() {
  return (
    <div className="About">
      <div className="About__avatar">
        <img className="About__avatar-image" src={catAvatar} alt="cat avatar" />
      </div>
      <div className="About__description">
        <h3 className="About__description-title">Об авторе</h3>
        <p className="About__description-text">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
        <p className="About__description-text">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.
        </p>
      </div>
    </div>
  );
}

export default About;