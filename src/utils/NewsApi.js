import { newsApiUrl, newsApiKey } from './constants';

export default class NewsApi {
  constructor() {
    this._baseUrl = newsApiUrl;
    // 'c98ef6802a714016b2b3860e5de842b5' vtl.stk@gmail.com
    // 'fb1f505eb00a45d7bff9fc944fde20a4' vitaly.smm@gmail.com
    this._API_KEY = newsApiKey;
    this._method = 'GET';
    this._headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    this._currentDate = new Date();
    this._startDate = new Date();
  };

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  _setStartDate() {
    this._startDate.setDate(this._currentDate.getDate() - 7);
  }

  _setUrl(request) {
    this._setStartDate();

    this._url = `${this._baseUrl}?` +
      `q=${request}&` +
      `from=${this._startDate.toISOString()}&` +
      `to=${this._currentDate.toISOString()}&` +
      'sortBy=popularity&' +
      'pageSize=100&' +
      `apiKey=${this._API_KEY}`;

    return this._url;
  }

  getNews(request) {
    this._setUrl(request);

    return fetch(this._url, {
      method: this._method,
      headers: this._headers
    })
      .then(this._handleResponse)
  }
}