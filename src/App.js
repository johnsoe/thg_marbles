import './App.css';

import React from 'react'
import MarbleLeague from './components/MarbleLeague'
import TeamCreateView from './components/TeamCreateView'
import BaseApi from './api/Base'

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsConfig from './aws-exports';

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");
const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}
Amplify.configure(updatedAwsConfig);

class App extends React.Component {

  constructor() {
    super();
    this.state = { teams: null, user: null }
  }

  componentDidMount() {
    this.queryForLeagueData();
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        this.setState({ user: user });
      })
      .catch(() => console.log("Not signed in"));

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
      }
    });
  }

  queryForLeagueData() {
    BaseApi.queryForLeagueData(res => {
      console.log("resetting state");
      console.log(this);
      this.setState({teams : res.data.body});
    });
  }

  onSignOut() {
    Auth.signOut();
  }

  onSignIn() {
    Auth.federatedSignIn({provider: 'Google'});
  }

  getFilteredMarbleTeamList() {
    return this.state.teams && this.state.teams.filter(item => item.ml_team)
  }

  getFilteredUserTeamList() {
    return this.state.teams && this.state.teams.filter(item => item.ml_team == false)
  }

  render() {
    return (
      <div className="App-Header">
        { this.state.user ? (
          <button onClick={this.onSignOut}>Sign Out</button>
        ) : (
          <button onClick={this.onSignIn}>Sign In With Google</button>
        )}
        { this.state.user && this.state.teams &&
          <TeamCreateView
            auth={this.state.user}
            mLTeams={this.getFilteredMarbleTeamList()}
            userTeams={this.getFilteredUserTeamList()}
            onTeamAdded={this.queryForLeagueData.bind(this)}
          />
        }
        <div className="Top-ML-Container">
            { this.state.teams &&
              <MarbleLeague teams={this.getFilteredMarbleTeamList()} />
            }
        </div>
      </div>
    );
  }
}

export default App;
