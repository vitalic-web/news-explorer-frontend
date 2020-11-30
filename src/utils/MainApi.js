import Popup from '../components/Popup/Popup';
import { mainApiUrl } from './constants';

export default class MainApi {
  constructor() {
    this._baseUrl = mainApiUrl;
    this._headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

    // метод регистрации пользователя
    register(email, password, name, error, popup) {
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password, name })
      })
        .then((response) => {
          if (response.status === 200) {
            popup(false);
            error(false);
            return response.json();
          } else if (response.status === 400) {
            error(true);
            return Promise.reject(`Ошибка: ${response.status} - некорректно заполнено одно из полей`);
          } else if (response.status === 409) {
            error(true);
            return Promise.reject(`Ошибка: ${response.status} - пользователь с таким емейл существует`);
          }
        })
    }
}