import { mainApiUrl } from './constants';
import { noImage } from './constants';

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
        localStorage.setItem('isLogin', true);
        return data;
      })
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  addNewArticle(newsCard) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        keyword: newsCard.tag,
        title: newsCard.title,
        text: newsCard.description,
        date: newsCard.publishedAt,
        source: newsCard.source.name,
        link: newsCard.url,
        image: newsCard.urlToImage || noImage,
      })
    })
      .then(this._handleResponse)
  };

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse)
  };

  deleterAticle(article) {
    // console.log(article);
    return fetch(`${this._baseUrl}/articles/${article._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse)
  };
}