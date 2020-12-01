import { mainApiUrl } from './constants';

export default class MainApi {
  constructor(options) {
    this._baseUrl = mainApiUrl;
    this._headers = options.headers;
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

  // метод авторизации пользователя
  login(email, password, error, popup, setLoginError) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        if (response.status === 200) {
          popup(false);
          error(false);
          return response.json();
        } else if (response.status === 400) {
          error(true);
          return Promise.reject(`Ошибка: ${response.status} - не передано одно из полей`);
        } else if (response.status === 401) {
          error(true);
          setLoginError('Неправильные почта или пароль')
          console.log(response.getMessage());
          return Promise.reject(`Ошибка: ${response.status} - неправильные почта или пароль`);
        }
      })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
      })
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: this._method,
      headers: this._headers
    })
      .then(this._handleResponse)
  }

}