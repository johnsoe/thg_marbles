import './App.css';

import React from 'react'
import MarbleLeague from './components/MarbleLeague'
import axios from 'axios'

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

class App extends React.Component {

  constructor() {
    super();
    this.state = { teams: null, user: null }
  }

  componentDidMount() {
    axios.get("https://lsgs3tdrt3.execute-api.us-west-2.amazonaws.com/dev", {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        //console.log(res.data)
        this.setState({
          teams : res.data.body
        })
      })
      .catch(err => console.log(err));

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
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

  onSignOut() {
    Auth.signOut();
  }

  onSignIn() {
    Auth.federatedSignIn({provider: 'Google'});
  }

  render() {
    return (
      <div className="App-Header">
        { this.state.user ? (
          <button onClick={this.onSignOut}>Sign Out</button>
        ) : (
          <button onClick={this.onSignIn}>Sign In With Google</button>
        )}
        <div className="Top-ML-Container">
            { this.state.teams &&
              <MarbleLeague teams={
                this.state.teams.filter(item => item.ml_team)
              } />
            }
        </div>
      </div>
    );
  }
}

export default App;
