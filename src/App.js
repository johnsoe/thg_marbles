import './App.css';

import React from 'react'
import MarbleLeague from './components/MarbleLeague'
import TeamCreateView from './components/TeamCreateView'
import LeagueTable from './components/LeagueTable'
import UserLeague from './components/UserLeague'
import UserView from './components/UserView'
import WagerAlert from './components/WagerAlert'
import BaseApi from './api/Base'

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsConfig from './aws-exports';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { alertOptions } from './util/ModalUtil';

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
  devRedirectSignIn,
  productionRedirectSignIn
] = awsConfig.oauth.redirectSignIn.split(",");
const [
  localRedirectSignOut,
  devRedirectSignOut,
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
    this.state = { league: null, user: null }
  }

  componentDidMount() {
    this.queryForLeagueData();
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ user: user });
      })
      .catch(() => console.log("Not signed in"));

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signOut":
          this.setState({ user: null });
          break;
      }
    });
  }

  queryForLeagueData() {
    BaseApi.queryForLeagueData(res => {
      this.setState({league : res.data.body});
    });
  }

  onSignOut() {
    Auth.signOut();
  }

  onSignIn() {
    Auth.federatedSignIn({provider: 'Google'});
  }

  getFilteredMarbleTeamList() {
    return this.state.league && this.state.league.filter(item => item.record_type === "LeagueTeam")
  }

  getFilteredUserTeamList() {
    return this.state.league && this.state.league.filter(item => item.record_type === "UserTeam")
  }

  getFilteredEvents() {
    return this.state.league &&
      this.state.league.filter(item => item.record_type === "Event")
  }

  getUserSpecificWagers() {
    var allWagers = this.getAllWagers();
    return allWagers && this.state.user &&
      allWagers.filter(item =>
        BaseApi.getCurrentUserId(this.state.user) === item.userId
      );
  }

  getAllWagers() {
    return this.state.league && this.state.league.filter(item =>
      item.record_type === 'Wager'
    );
  }

  getUpcomingEvents(allEvents) {
    const now = Date.now();
    return allEvents && allEvents.filter(item => {
      return now / 1000 <= item.expiry;
    })
    .sort((a, b) => {
      return a.expiry - b.expiry
    });
  }

  getCompletedEvents(allEvents) {
    return allEvents && allEvents.filter(item => {
        return item.expiry === 0;
    })
  }

  render() {
    const userTeams = this.getFilteredUserTeamList();
    const marbleTeams = this.getFilteredMarbleTeamList();
    const allEvents = this.getFilteredEvents();
    const allWagers = this.getAllWagers();
    const userWagers = this.getUserSpecificWagers();
    const upcomingEvents = this.getUpcomingEvents(allEvents);
    const completedEvents = this.getCompletedEvents(allEvents);
    return (
      <div className="App-Header">
        <UserView
          user={this.state.user}
          onSignOut={this.onSignOut}
          onSignIn={this.onSignIn}/>
        { this.state.user && marbleTeams && userTeams && !BaseApi.isUserIdInUserTeamList(userTeams, this.state.user) && userTeams.length < 16 &&
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <TeamCreateView
              auth={this.state.user}
              mLTeams={marbleTeams}
              userTeams={userTeams}
              onTeamAdded={this.queryForLeagueData.bind(this)}
            />
          </AlertProvider>
        }
        { upcomingEvents && upcomingEvents.length > 0 && this.state.user && BaseApi.isUserIdInUserTeamList(userTeams, this.state.user) &&
          <div className="pure-g Wager-List">
            {
              upcomingEvents.map(item =>
                <div key={item.name} className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-4">
                  <WagerAlert
                    mLEvent={item}
                    auth={this.state.user}
                    onWagerMade={this.queryForLeagueData.bind(this)}
                    wagers={userWagers}
                    allWagers={allWagers}
                    userTeams={userTeams}
                  />
                </div>
              )
            }
          </div>
        }
        <div className="League-Views">
          <div className="Top-ML-Container pure-u-1 pure-u-md-1-2">
            { marbleTeams &&
              <MarbleLeague teams={marbleTeams} wagers={allWagers} events={allEvents} />
            }
          </div>
          <div className="Top-ML-Container pure-u-1 pure-u-md-1-2">
              { userTeams && this.state.league &&
                <UserLeague
                  auth={this.state.user}
                  userTeams={userTeams}
                  mLTeams={marbleTeams}
                  events={allEvents}
                  wagers={userWagers}
                />
              }
          </div>
          <div>
            { userTeams &&
              <LeagueTable
                events={allEvents}
                mLTeams={marbleTeams}
                userTeams={userTeams}
                auth={this.state.user}/>
            }
          </div>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
