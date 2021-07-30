import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import BaseApi from '../api/Base';
import axios from 'axios';
import { GrClose } from "react-icons/gr";
import { getCustomStyles } from '../util/ModalUtil';
import EventWagerView from './WagerView';

const WagerAlert = (props) => {

  const [isOpen, setIsOpen] = useState(false);
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
    .then(res => {
      setAvailableTeams(res.data.body);
    })
    .catch(err => {
      console.log("AVAILABILITY ERROR: " + err);
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
    var date = new Date(props.mLEvent.expiry * 1000)
    return date.getHours() + " a.m. on " + date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric'});
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    getAvailableTeams();
    setIsOpen(true);
  }

  return (
    <div className="Wager-Container">
      <div className="Wager-Text-Container">
        <p className="Wager-Text">{props.mLEvent.name}</p>
        { submittedVote ? (
          <p className="Wager-Subtext">You have already voted, but can update your vote until {getDateTimeFromEpoch()}.</p>
        ) : (
          <p className="Wager-Subtext">Please cast your vote before {getDateTimeFromEpoch()}.</p>
        )}
      </div>
      <div className="Wager-Button">
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
            Object.entries(availableTeams)
              .map(([key, value]) => {
                if (value > 0) {
                  return <option value={key} key={key}>{key + " (" + value + ")"}</option>
                } else {
                  return null;
                }
              })
          }
        </select>
        <p>Below is the secondary wager. If you are closest or tied for closest to the correct answer, you will earn 5 points.</p>
        <p className='Secondary-Wager-Title'>{props.mLEvent.secondary_wager}</p>
        <input type="text" name="secondary" value={userSecondaryVote} onChange={(e) => handleSecondaryBoxChanges(e)} />
        <EventWagerView eventWagers={props.allWagers} userTeams={props.userTeams} current={true}/>
        <button onClick={() => makeWager()}>Submit</button>
      </ReactModal>
    </div>
  )
}

export default WagerAlert;
