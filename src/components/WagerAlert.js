import React, { useState } from 'react';
import ReactModal from 'react-modal';
import BaseApi from '../api/Base';
import axios from 'axios'
import { GrClose } from "react-icons/gr"

const WagerAlert = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const userId = BaseApi.getCurrentUserId(props.auth);
  const [userVote, setUserVote] = useState(getUserVote());

  function getUserVote() {
    const wager = props.mLEvent.wagers[userId];
    return wager ? wager : ["", ""];
  }

  function handleTeamSelectChange(e) {
    setUserVote([e.target.value, userVote[1]]);
  }

  function handleSecondaryBoxChanges(e) {
    setUserVote([userVote[0], e.target.value]);
  }

  function makeWager() {
    axios.put(BaseApi.getBaseUrl() + "/Events", {
      "eventId": props.mLEvent.id,
      "selectedTeam": userVote[0],
      "secondary": userVote[1],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BaseApi.getAuthToken(props.auth)
      }
    })
    .then( data => {
      console.log("WAGER: " + JSON.stringify(data));
      setIsOpen(false);
      props.onWagerMade();
    })
    .catch(err => {
      console.log("ERROR: " + err);
    })
  }

  function getDateTimeFromEpoch() {
    return new Date(props.mLEvent.expiry * 1000)
      .toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric'});
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        { userVote[0] ? (
          <p>You have already voted for {props.mLEvent.name}, but can update your vote by clicking here.</p>
        ) : (
          <p>You have an upcoming event: {props.mLEvent.name}. Please cast your vote before noon on {getDateTimeFromEpoch()}</p>
        )}
      </div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
      >
        <h3>Wager on Upcoming Event: {props.mLEvent.name}</h3>
        <GrClose onClick={closeModal}/>
        <p>Select the team you believe will perform the best. You will earn the same number of points the selected team earns in this event.</p>
        <select
          value={userVote && userVote[0] ? (userVote[0]) : ""}
          onChange={(e) => handleTeamSelectChange(e)}
        >
          <option value="Savage Speeders">Savage Speeders</option>
          <option value="O'rangers">O'rangers</option>
        </select>
        <p>Below is the secondary wager. If you are closest or tied for closest to the correct answer, you will earn 5 points.</p>
        <p>{props.mLEvent.secondary_wager}</p>
        <textarea value={userVote[1]} rows="4" cols="65" onChange={(e) => handleSecondaryBoxChanges(e)}/>
        <button onClick={() => makeWager()}>Submit</button>
      </ReactModal>
    </div>
  )
}

export default WagerAlert;
