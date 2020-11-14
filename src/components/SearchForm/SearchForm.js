import './SearchForm.css';

function SearchForm() {
  return (
    <div className="SearchForm">
      <input className="SearchForm__input" type="text" placeholder="Введите тему новости"/>
      <button className="SearchForm__button" type="submit">Искать</button>
    </div>
  );
}

export default SearchForm;