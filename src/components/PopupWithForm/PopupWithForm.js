import './PopupWithForm.css';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>

      <form className="popup__container" onSubmit={props.onSubmit}>
        <h3 className="popup__title">{props.title}</h3>

        {props.children}

        <button className="popup__save-button" type="submit">{props.buttonText}</button>
        <button className="popup__close-icon" type="button" onClick={props.onClose}/>
      </form>
    </section>
  );
}

export default PopupWithForm;