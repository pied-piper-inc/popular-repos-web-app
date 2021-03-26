const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

function SelectLanguage(props) { 
  const languages = ['All', 'JavaScript', 'Java', 'CSharp', 'Python', 'Go'];

  return (
    <div>
      <span className="header">Popular repositories</span>
      <ul className="languages">
        {languages.map(language => (
          <li
            style={
              language === props.selectedLanguage ? { color: '#d00b21' } : null
            }
            key={language}
            onClick={props.onSelect.bind(null, language)}
          >
            {language}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepoGrid(props) {
  return (
    <div>
      <ul className="popular-list">
        {props.repos.map((repo, index) => (
          <li className="popular-item" key={repo.name}>
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li>
                <a href={repo.html_url} target="_blank">
                  {repo.name}
                </a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(language) {
    this.setState(() => ({
      selectedLanguage: language,
      repos: null
    }));

    api.fetchPopularRepos(language).then(repos => {
      this.setState(() => ({
        repos
      }));
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? (
          <p>Loading popular repositories...</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

module.exports = Home;
