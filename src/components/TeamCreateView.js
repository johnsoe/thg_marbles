import './Components.css'

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useAlert } from 'react-alert';
import BaseApi from '../api/Base';
import { GrClose } from "react-icons/gr";
import { getCustomStyles } from '../util/ModalUtil';

const TeamCreateView = (props) => {

  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamName, setTeamName] = useState("");
  const [selectedVotingStyle, setSelectedVotingStyle] = useState("");
  const [userSuggestions, setUserSuggestions] = useState("");
  const [orangerSubmitCheck, setOrangerSubmitCheck] = useState(false);

  function postTeamCreate(auth) {
    if (!teamName || !selectedTeam) {
      alert.info("Please enter a valid team name and valid favorite team.");
      return;
    }

    if (teamName.length > 69) {
      alert.info("Please keep your team name length below 69 characters");
      return;
    }
    axios.post(BaseApi.getBaseUrl(), {
      "teamName": teamName,
      "selectedTeam": selectedTeam,
      "userSuggestions": userSuggestions,
      "selectedVotingStyle": selectedVotingStyle
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BaseApi.getAuthToken(auth)
      }
    })
      .then( data => {
        console.log("TEAM: " + JSON.stringify(data))
        closeModal();
        props.onTeamAdded();
      })
      .catch(err => {
        console.log("ERROR: " + err);
      })
  }

  function handleChange(e) {
    var selection = e.target.value;
    console.log("TEAM: " + selection);
    if (selection === "O'rangers" && orangerSubmitCheck === false) {
      alert.info("Are you sure you want to pick The O'rangers? It's not too late to pick a better team.");
      setOrangerSubmitCheck(true);
    }
    setSelectedTeam(selection);
  }

  function handleTeamNameChange(e) {
    setTeamName(e.target.value);
  }

  function handleVotingStyleChange(e) {
    setSelectedVotingStyle(e.target.value);
  }

  function handleSuggestionBoxChanges(e) {
    setUserSuggestions(e.target.value);
  }

  function handleJoinClick() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={handleJoinClick}>Join The League</button>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={getCustomStyles()}
      >
        <span className="Icon-Container" onClick={closeModal}><GrClose/></span>
        <h3>Join the League!</h3>
        <p>Your team name</p>
        <input type="text" name="name" value={teamName} onChange={(e) => handleTeamNameChange(e)} />
        <p>Please select one team to be your favorite. Every time your favorite team places top 3, you earn a raffle ticket. At the end of the league, we will draw raffle tickets for prizes.</p>
        <select
          value={selectedTeam}
          onChange={(e) => handleChange(e)}
          label="Favorite team:"
        >
          <option value=""></option>
          {
            props.mLTeams.map(item =>
              <option value={item.name}>{item.name}</option>
            )
          }
        </select>
        <p>Every week you will select one team you believe will do the best. Please select your preferred rules for which team you can vote for.</p>
        <select
          value={selectedVotingStyle}
          onChange={(e) => handleVotingStyleChange(e)}
        >
          <option value=""></option>
          <option value="unique">You can vote for a team only once.</option>
          <option value="two_per">You can vote for a team up to two times.</option>
          <option value="limited_dupes">You get a total of four duplicate votes that can be used on any team. All other votes must be unique.</option>
          <option value="draft">Let's do a draft! Each team picks five marbles from the league roster in snake style draft.</option>
        </select>
        <p>Please add any suggestions you have for the league in the input below. You can suggest a different voting scheme, or side bets that you might find interesting. I promise I'll read it as long as the suggestion comes from someone that didn't pick O'rangers as their favorite team.</p>
        <textarea onChange={(e) => handleSuggestionBoxChanges(e)}/>
        <button onClick={() => postTeamCreate(props.auth)}>Submit</button>
      </ReactModal>
    </div>
  )
}

export default TeamCreateView;
