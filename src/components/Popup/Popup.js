import './Popup.css';
import { useState, useEffect } from 'react';

function Popup(props) {
  const [validationMessage, setValidationMessage] = useState({ email: '', password: '', name: '' }); // кастомные тексты ошибок
  const [validityEmail, setValidityEmail] = useState(false); // валидность емейл
  const [validityPassword, setValidityPassword] = useState(false); // валидность пароля
  const [validityName, setValidityName] = useState(false); // валидность имени
  const [buttonDisabled, setButtonDisabled] = useState(true); // блокировка кнопки
  const [registration, setRegistration] = useState(false); // показ/скрытие попапа регистрации

  // показ/скрытие попапа с формой, при отрицательном значении показ/скрытие попапа успешной регистрации
  const [popupWithForm, setPopupWithForm] = useState(true);

  // валидация поля емейл
  const validateEmail = (e) => {
    props.setEmail(e.target.value);
    setValidationMessage({ email: 'Неправильный формат email' });
    setValidityEmail(e.target.validity.valid);
  }

  // валидация поля пароль
  const validatePassword = (e) => {
    props.setPassword(e.target.value);
    setValidationMessage({ password: 'Пароль должен быть не менее 8 символов' });
    setValidityPassword(e.target.validity.valid);
  }

  // валидация поля имя
  const validateName = (e) => {
    props.setName(e.target.value);
    setValidationMessage({ name: 'Имя должно быть не менее 2 символов' });
    setValidityName(e.target.validity.valid);
  }

  // очистка валидации
  const clearValidation = () => {
    setValidityEmail(false);
    setValidityPassword(false);
    setValidityName(false);
  }

  // переключение попапов вход/регистрация, так же очистка инпутов от введенных данных
  const toggleAuth = () => {
    setRegistration(!registration);
    setButtonDisabled(true);
    clearValidation();
    setValidationMessage({ email: '', password: '', name: '' });
    props.setEmail('');
    props.setPassword('');
    props.setName('');
  }

  // показ попапа успешной регистрации и скрытие попапа с формой
  const showSuccessPopup = (e) => {
    e.preventDefault();

    props.registration(setPopupWithForm);
  }

  // скрытие попапа успешной регистрации и показ попапа вход
  const redirectLogin = () => {
    setRegistration(!registration);
    setButtonDisabled(true);
    clearValidation();
    setPopupWithForm(true);
    props.setEmail('');
    props.setPassword('');
    setValidationMessage({ email: '' });
  }

  // блокировка кнопок обеих форм
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
  },);

  return (
    <section className={`Popup ${props.isOpen && 'Popup_active'}`}>

      {/* по умолчанию открывается попап входа */}
      <form className={`Popup__container ${!popupWithForm && 'Popup__container_hidden'}`} onSubmit={props.onSubmit}>
        <h3 className="Popup__title">{registration ? 'Регистрация' : 'Вход'}</h3>

        <label className="Popup__input-label" htmlFor="email">Email</label>
        <div className="Popup__input-area">
          <input className="Popup__input" onChange={validateEmail} name="email" type="email" required
            value={props.email} minLength="2" maxLength="40" id="email" placeholder="Введите почту" />
          <span className="Popup__input-error-message" id="email-input-error">{!validityEmail && validationMessage.email}</span>
        </div>

        <label className="Popup__input-label" htmlFor="password">Пароль</label>
        <div className="Popup__input-area">
          <input className="Popup__input" onChange={validatePassword} name="password" type="password" required
            value={props.password} minLength="8" maxLength="200" id="password" placeholder="Введите пароль" />
          <span className="Popup__input-error-message" id="password-input-error">{!validityPassword && validationMessage.password}</span>
        </div>

        {/* попап регистрации, зависит от состояния переменной registration */}
        {registration &&
          <>
            <label className="Popup__input-label" htmlFor="password">Имя</label>
            <div className="Popup__input-area">
              <input className="Popup__input" onChange={validateName} name="name" type="text" required
                value={props.name} minLength="2" maxLength="40" id="name" placeholder="Введите своё имя" />
              <span className="Popup__input-error-message" id="name-input-error">{!validityName && validationMessage.name}</span>
              {props.sameUser && <span className="Popup__input-error-message Popup__input-error-message_regisrate">Такой пользователь уже есть</span>}
            </div>
          </>
        }

        <button className={`Popup__save-button ${buttonDisabled && 'Popup__save-button_disabled'}`}
          onClick={registration ? showSuccessPopup : undefined} type="submit" disabled={buttonDisabled}>{registration ? 'Зарегистрироваться' : 'Войти'}</button>
        <p className="Popup__auth">Или <span className="Popup__auth-link" onClick={toggleAuth}>{registration ? 'Войти' : 'Зарегистрироваться'}</span></p>
        <button className="Popup__close-icon" type="button" onClick={props.onClose} />
      </form>

      {/* попап успешной регистрации, зависит от отрицательного состояния переменной popupWithForm */}
      {!popupWithForm &&
        <form className="Popup__container" onSubmit={props.onSubmit}>
          <h3 className="Popup__title Popup__title_successful">Пользователь успешно зарегистрирован!</h3>
          <button className="Popup__close-icon" type="button" onClick={props.onClose} />
          <p className="Popup__success-login" onClick={redirectLogin}>Войти</p>
        </form>
      }

    </section>
  );
}

export default Popup;