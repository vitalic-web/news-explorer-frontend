import './Popup.css';
import { useState, useEffect } from 'react';

function Popup(props) {
  const [validationMessage, setValidationMessage] = useState({ email: '', password: '', name: '' });
  const [validityEmail, setValidityEmail] = useState(false);
  const [validityPassword, setValidityPassword] = useState(false);
  const [validityName, setValidityName] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [registration, setRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sameUser, setSameUser] = useState(true);

  const validateEmail = (e) => {
    setEmail(e.target.value);
    setValidationMessage({ email: 'Неправильный формат email' });
    setValidityEmail(e.target.validity.valid);
  }

  const validatePassword = (e) => {
    setPassword(e.target.value);
    setValidationMessage({ password: 'Пароль должен быть не менее 6 символов' });
    setValidityPassword(e.target.validity.valid);
  }

  const validateName = (e) => {
    setName(e.target.value);
    setValidationMessage({ name: 'Имя должно быть не менее 2 символов' });
    setValidityName(e.target.validity.valid);
  }

  const toggleAuth = () => {
    setRegistration(!registration);
    setButtonDisabled(true);
    setEmail('');
    setPassword('');
    setName('');
  }

  useEffect(() => {
    if (registration) {
      if (validityEmail && validityPassword && validityName) {
        setButtonDisabled(false);
      }
    } else {
      if (validityEmail && validityPassword) {
        setButtonDisabled(false);
      }
    }

  });

  return (
    <section className={`Popup ${props.isOpen && 'Popup_active'}`}>

      <form className="Popup__container" onSubmit={props.onSubmit}>
        <h3 className="Popup__title">{registration ? 'Регистрация' : 'Вход'}</h3>

        <label className="Popup__input-label" htmlFor="email">Email</label>
        <div className="Popup__input-area">
          <input className="Popup__input" onChange={validateEmail} name="email" type="email" required
            value={email} minLength="2" maxLength="40" id="email" placeholder="Введите почту" />
          <span className="Popup__input-error-message" id="email-input-error">{!validityEmail && validationMessage.email}</span>
        </div>

        <label className="Popup__input-label" htmlFor="password">Пароль</label>
        <div className="Popup__input-area">
          <input className="Popup__input" onChange={validatePassword} name="password" type="password" required
            value={password} minLength="6" maxLength="200" id="password" placeholder="Введите пароль" />
          <span className="Popup__input-error-message" id="password-input-error">{!validityPassword && validationMessage.password}</span>
        </div>

        {registration &&
          <>
            <label className="Popup__input-label" htmlFor="password">Имя</label>
            <div className="Popup__input-area">
              <input className="Popup__input" onChange={validateName} name="name" type="text" required
                value={name} minLength="2" maxLength="40" id="name" placeholder="Введите своё имя" />
              <span className="Popup__input-error-message" id="name-input-error">{!validityName && validationMessage.name}</span>
              {sameUser && <span className="Popup__input-error-message Popup__input-error-message_regisrate">Такой пользователь уже есть</span>}
            </div>
          </>
        }

        <button className={`Popup__save-button ${buttonDisabled && 'Popup__save-button_disabled'}`} type="submit" disabled={buttonDisabled}>{registration ? 'Зарегистрироваться' : 'Войти'}</button>
      <p className="Popup__auth">Или <span className="Popup__auth-link" onClick={toggleAuth}>{registration ? 'Войти' : 'Зарегистрироваться'}</span></p>
        <button className="Popup__close-icon" type="button" onClick={props.onClose} />
      </form>
    </section>
  );
}

export default Popup;