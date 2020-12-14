import { newsApiUrl, newsApiKey, newsDaysPeriod } from './constants';

export default class NewsApi {
  constructor() {
    this._baseUrl = newsApiUrl;
    this._API_KEY = newsApiKey;
    this._newsDaysPeriod = newsDaysPeriod;
    this._method = 'GET';
    this._headers = {
      'Accept': 'application/json',
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
    this._startDate.setDate(this._currentDate.getDate() - this._newsDaysPeriod);
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