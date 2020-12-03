const React = require('react');
const ReactRouter = require('react-router-dom');

const Router = ReactRouter.BrowserRouter;
const { Route } = ReactRouter;
const { Switch } = ReactRouter;
//const Nav = require('./Nav-d');
const Home = require('./home');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
module.exports = App;