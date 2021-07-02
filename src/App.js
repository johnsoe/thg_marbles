import './App.css';

import React from 'react'
import MarbleLeague from './components/MarbleLeague'
import axios from 'axios'


class App extends React.Component {

  constructor() {
    super();
    this.state = { teams: null };
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
  }

  render() {
    return (
      <div className="Top-ML-Container">
          { this.state.teams &&
            <MarbleLeague teams={
              this.state.teams.filter(item => item.ml_team)
            } />
          }
      </div>
    );
  }
}
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>

export default App;
