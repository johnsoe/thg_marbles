import './App.css';

import React from 'react'
import MarbleLeague from './components/MarbleLeague'
import TeamCreateView from './components/TeamCreateView'
import UserLeague from './components/UserLeague'
import BaseApi from './api/Base'

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsConfig from './aws-exports';
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

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

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px'
};

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
        // TODO: This data structure might not be the same and is resulting in an error.
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
    return this.state.teams && this.state.teams.filter(item => item.record_type === "LeagueTeam")
  }

  getFilteredUserTeamList() {
    return this.state.teams && this.state.teams.filter(item => item.record_type === "UserTeam")
  }

  getFilteredEvents() {
    return this.state.teams && this.state.teams.filter(item => item.record_type === "Event")
  }

  render() {
    const userTeams = this.getFilteredUserTeamList();
    const marbleTeams = this.getFilteredMarbleTeamList();
    const allEvents = this.getFilteredEvents();
    return (
      <div className="App-Header">
        { this.state.user ? (
          <button onClick={this.onSignOut}>Sign Out</button>
        ) : (
          <button onClick={this.onSignIn}>Sign In With Google</button>
        )}
        { this.state.user && marbleTeams && userTeams && userTeams.length < 16 &&
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <TeamCreateView
              auth={this.state.user}
              mLTeams={marbleTeams}
              userTeams={userTeams}
              onTeamAdded={this.queryForLeagueData.bind(this)}
            />
          </AlertProvider>
        }
        <div className="League-Views">
          <div className="Top-ML-Container pure-u-1 pure-u-md-2-5">
              { marbleTeams &&
                <MarbleLeague teams={marbleTeams} />
              }
          </div>
          <div className="Top-ML-Container pure-u-1 pure-u-md-3-5">
              { userTeams && this.state.teams &&
                <UserLeague
                  auth={this.state.user}
                  userTeams={userTeams}
                  mlTeams={marbleTeams}
                  events={allEvents}
                  onWagerMade={this.queryForLeagueData.bind(this)}
                />
              }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
