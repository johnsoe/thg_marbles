import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import BaseApi from '../api/Base';
import axios from 'axios'
import { GrClose } from "react-icons/gr"
import { getCustomStyles } from '../util/ModalUtil';

const WagerAlert = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const userId = BaseApi.getCurrentUserId(props.auth);
  const [userVote, setUserVote] = useState();
  const [submittedVote, setSubmittedVote] = useState();
  const [userSecondaryVote, setUserSecondaryVote] = useState();
  const [availableTeams, setAvailableTeams] = useState();

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
      if (wager) {
        setSubmittedVote(wager.selectedTeam);
        setUserVote(wager.selectedTeam);
        setUserSecondaryVote(wager.secondary);
      }
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
    .then( res => {
      console.log("AvailableTeams: " + JSON.stringify(res));
      console.log("Teams Body: " + res.data.body);
      setAvailableTeams(res.data.body);
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
      setSubmittedVote(userVote);
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
    <div className="Wager-Container pure-u-1 pure-u-md-1-2">
      <div className="Wager-CTA pure-u-1-2">
        <h3>Upcoming Event:</h3>
        <p className="Wager-Text">{props.mLEvent.name}</p>
      </div>
      <div className="Wager-CTA pure-u-1-2">
        { submittedVote ? (
          <p className="Wager-Text">You have already voted, but can update your vote until noon on {getDateTimeFromEpoch()}.</p>
        ) : (
          <p className="Wager-Text">Please cast your vote before noon on {getDateTimeFromEpoch()}.</p>
        )}
        <button onClick={openModal}>Vote</button>
      </div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={getCustomStyles()}
      >
        <span className='Icon-Container' onClick={closeModal}><GrClose/></span>
        <h3>Upcoming Event: {props.mLEvent.name}</h3>
        <p>Select the team you believe will perform the best. You will earn the same number of points the selected team earns in this event.</p>
        <select
          value={userVote}
          onChange={(e) => handleTeamSelectChange(e)}
        >
          <option value="" key="empty"></option>
          { availableTeams &&
            availableTeams.map(item =>
              <option value={item} key={item}>{item}</option>
            )
          }
        </select>
        <p>Below is the secondary wager. If you are closest or tied for closest to the correct answer, you will earn 5 points.</p>
        <p className='Secondary-Wager-Title'>{props.mLEvent.secondary_wager}</p>
        <input type="text" name="secondary" value={userSecondaryVote} onChange={(e) => handleSecondaryBoxChanges(e)} />
        <button onClick={() => makeWager()}>Submit</button>
      </ReactModal>
    </div>
  )
}

export default WagerAlert;
