import './App.css';

import React from 'react';
import MarbleLeague from './components/MarbleLeague';
import TeamCreateView from './components/TeamCreateView';
import LeagueTable from './components/LeagueTable';
import LeagueChart from './components/LeagueChart';
import UserLeague from './components/UserLeague';
import UserView from './components/UserView';
import WagerAlert from './components/WagerAlert';
import BaseApi from './api/Base';
import PastEvents from './components/PastEvents';
import { getAllWagersOnEvent } from './util/EventUtil';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsConfig from './aws-exports';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { alertOptions } from './util/ModalUtil';

class App extends React.Component {

  constructor() {
    super();
    this.state = { league: null, user: null }
  }

  componentDidMount() {
    this.queryForLeagueData();
  }

  queryForLeagueData() {
    BaseApi.queryForLeagueData(res => {
      this.setState({league : res.data.body});
    });
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

  getUpcomingEvents(allEvents, completed) {
    const now = Date.now();
    return allEvents && allEvents.filter(item => {
      var active = now / 1000 <= item.expiry;
      return completed ? !active : active;
    })
    .sort((a, b) => {
      var diff =  a.expiry - b.expiry;
      if (diff !== 0) {
        return diff;
      }
      return parseInt(a.event_num) - parseInt(b.event_num);
    });
  }

  getCompletedEvents(allEvents) {
    return allEvents && allEvents.filter(item => {
      return item.expiry === 0;
    })
    .sort((a, b) => {
      return parseInt(a.event_num) - parseInt(b.event_num);
    });
  }

  render() {
    const userTeams = this.getFilteredUserTeamList();
    const marbleTeams = this.getFilteredMarbleTeamList();
    const allEvents = this.getFilteredEvents();
    const allWagers = this.getAllWagers();
    const userWagers = this.getUserSpecificWagers();
    const upcomingEvents = this.getUpcomingEvents(allEvents, false);
    const pastEvents = this.getUpcomingEvents(allEvents, true);
    const completedEvents = this.getCompletedEvents(allEvents);
    return (
      <div className="App-Header">
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
          { pastEvents && this.state.league &&
            <PastEvents
              userTeams={userTeams}
              mLTeams={marbleTeams}
              wagers={allWagers}
              events={pastEvents}
              auth={this.state.user}
            />
          }
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
            { userTeams && marbleTeams && completedEvents &&
              <LeagueChart
                events={completedEvents}
                mLTeams={marbleTeams}
                userTeams={userTeams}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
