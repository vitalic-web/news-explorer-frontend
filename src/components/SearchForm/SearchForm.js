import './SearchForm.css';
import { useState } from 'react';

function SearchForm(props) {
  const [reqInput, setReqInput] = useState('');

  const getInput = e => setReqInput(e.target.value);

  console.log(reqInput);

  return (
    <div className="SearchForm">
      <input className="SearchForm__input" type="text" placeholder="Введите тему новости" onChange={getInput} required />
      <button className="SearchForm__button" type="submit" onClick={props.addResult} >Искать</button>
    </div>
  );
}

export default SearchForm;