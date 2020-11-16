import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/saved-news">
          <SavedNews />
        </Route>

        <Route path="/">
          <Main />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
