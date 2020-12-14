import './SearchForm.css';

function SearchForm(props) {
  const getInput = e => {
    props.setSearchWord(e.target.value);
    localStorage.setItem('searchWord', e.target.value);
  }

  return (
    <form className="SearchForm" onSubmit={props.addResult}>
      <input className="SearchForm__input" type="text" placeholder="Введите тему новости" onChange={getInput}
        value={props.searchWord} readOnly={props.preloader && true} required  />
      <button className="SearchForm__button" type="submit" disabled={props.preloader && true} >Искать</button>
    </form>
  );
}

export default SearchForm;