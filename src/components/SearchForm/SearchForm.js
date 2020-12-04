import './SearchForm.css';

function SearchForm(props) {
  const getInput = e => {
    props.searchWord(e.target.value);
  }

  return (
    <form className="SearchForm" onSubmit={props.addResult}>
      <input className="SearchForm__input" type="text" placeholder="Введите тему новости" onChange={getInput} required />
      <button className="SearchForm__button" type="submit" >Искать</button>
    </form>
  );
}

export default SearchForm;