import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import BaseApi from '../api/Base';
import axios from 'axios'
import { GrClose } from "react-icons/gr"

const WagerAlert = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const userId = BaseApi.getCurrentUserId(props.auth);
  const [userVote, setUserVote] = useState();
  const [userSecondaryVote, setUserSecondaryVote] = useState();
  const [availableTeams, setAvailableTeams] = useState([]);

  useEffect(setWagerForEventId,[])

  function handleTeamSelectChange(e) {
    setUserVote(e.target.value);
  }

  function handleSecondaryBoxChanges(e) {
    setUserSecondaryVote(e.target.value);
  }

  function setWagerForEventId() {
    const eventId = props.mLEvent.id;
    if (props.wagers) {
      const wager = props.wagers.find(item => item.eventId === eventId);
      setUserVote(wager.selectedTeam);
      setUserSecondaryVote(wager.secondary);
    }
  }

  function getAvailableTeams() {
    axios.post(BaseApi.getBaseUrl() + "/Teams",{
      "eventId": props.mLEvent.id
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BaseApi.getAuthToken(props.auth)
      }
    })
    .then( data => {
      console.log("AvailableTeams: " + JSON.stringify(data));
      setAvailableTeams(data);
    })
    .catch(err => {
      console.log("ERROR: " + err);
    })
  }

  function makeWager() {
    axios.put(BaseApi.getBaseUrl() + "/Events", {
      "eventId": props.mLEvent.id,
      "selectedTeam": userVote,
      "secondary": userSecondaryVote,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BaseApi.getAuthToken(props.auth)
      }
    })
    .then( data => {
      console.log("WAGER: " + JSON.stringify(data));
      closeModal();
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

  function openModal() {
    getAvailableTeams();
    setIsOpen(true);
  }

  return (
    <div>
      <div className="WagerText">
        { userVote ? (
          <p>You have already voted for {props.mLEvent.name}, but can update your vote until noon on {getDateTimeFromEpoch()}.</p>
        ) : (
          <p>Upcoming event: {props.mLEvent.name}. Please cast your vote before noon on {getDateTimeFromEpoch()}.</p>
        )}
      </div>
      <button onClick={openModal}>Vote</button>
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
          value={userVote}
          onChange={(e) => handleTeamSelectChange(e)}
        >
          <option value=""></option>
          <option value="Savage Speeders">Savage Speeders</option>
          <option value="O'rangers">O'rangers</option>
        </select>
        <p>Below is the secondary wager. If you are closest or tied for closest to the correct answer, you will earn 5 points.</p>
        <p>{props.mLEvent.secondary_wager}</p>
        <textarea value={userSecondaryVote} rows="4" cols="65" onChange={(e) => handleSecondaryBoxChanges(e)}/>
        <button onClick={() => makeWager()}>Submit</button>
      </ReactModal>
    </div>
  )
}

export default WagerAlert;
