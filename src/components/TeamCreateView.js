import './Components.css'

import React from 'react'
import ReactModal from 'react-modal'
import UserTeamModel from '..'
import axios from 'axios'

class TeamCreateView extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      selectedTeam: "",
      teamName: ""
    };
  }

  postTeamCreate(auth) {
    axios.post("https://lsgs3tdrt3.execute-api.us-west-2.amazonaws.com/dev", {
      "teamName": this.state.teamName,
      "selectedTeam": this.state.selectedTeam
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth['signInUserSession']['accessToken']['jwtToken']
      }
    })
      .then( data => {
        console.log("DATA: " + JSON.stringify(data))
        this.setState({ isOpen: false })
        this.props.onTeamAdded();
      })
      .catch(err => console.log("ERROR: " + err));
  }

  showTeamModal() {
    this.setState({ isOpen: true });
  }

  handleChange(e) {
    this.setState({ selectedTeam : e.target.value });
  }

  handleTeamNameChange(e) {
    this.setState({ teamName : e.target.value });
  }

  getCurrentUserId() {
    return this.props.auth['attributes']['sub']
  }

  isUserIdInUserTeamList() {
    return this.props.userTeams.some(item => {
      return item.id == this.getCurrentUserId();
    });
  }

  render() {
    var userAlreadyJoined = this.isUserIdInUserTeamList();
    return (
      <div>
        { !userAlreadyJoined &&
          <div>
            <button onClick={() => this.showTeamModal()}>Join The League</button>
            <ReactModal
              isOpen={this.state.isOpen}
              ariaHideApp={false}
            >
              <h3>Join the League!</h3>
              <label>
                Your team name:
                <input type="text" name="name" onChange={(e) => this.handleTeamNameChange(e)} />
              </label>
              <p>Please select one team to be your favorite. Every time your favorite team places top 3, you earn a raffle ticket. At the end of the league, we will draw raffle tickets for prizes.</p>
              <select
                value={this.state.selectedTeam}
                onChange={(e) => this.handleChange(e)}
                label="Favorite team:"
              >
                <option value=""></option>
                {
                  this.props.mLTeams.map(item =>
                    <option value={item.name}>{item.name}</option>
                  )
                }
              </select>
              <button onClick={() => this.postTeamCreate(this.props.auth)}>Submit</button>
            </ReactModal>
          </div>
        }
      </div>
    )
  }
}

export default TeamCreateView;
