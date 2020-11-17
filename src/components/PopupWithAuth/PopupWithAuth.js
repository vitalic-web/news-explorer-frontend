import './PopupWithAuth.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupWithAuth(props) {
  return (
    <PopupWithForm isOpen={props.isOpen} title="Title" buttonText="Button Text">
      <input name="name" className="popup__input popup__input_filed_name" type="email" required
        minLength="2" maxLength="40" id="name-input" placeholder="Введите почту" />
      <span className="popup__input-error-message" id="name-input-error" />

      <input name="about" className="popup__input popup__input_filed_prof" type="password" required
        minLength="2" maxLength="200" id="prof-input" placeholder="Введите пароль" />
      <span className="popup__input-error-message" id="prof-input-error" />
    </PopupWithForm>
  );
}

export default PopupWithAuth;