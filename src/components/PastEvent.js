import EventWagerView from './WagerView';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { GrClose } from "react-icons/gr";
import { getCustomStyles } from '../util/ModalUtil';

const PastEvent = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  var userWagerOnEvent = props.wagers && props.wagers.find(wager => props.userId === wager.userId);

  function getTeamFromWager(wager) {
    return props.mLTeams.find(item => {
      return wager.selectedTeam === item.name;
    });
  }

  const onLink = (e) => {
    e.stopPropagation();
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="League-Team-Container Past-Event-Container" onClick={openModal}>
        <div className="Team-Text-Container">
          <div>
            <p className="Wager-Text">{props.event.name}</p>
          </div>
          { props.event.expiry === 0 ? (
            <p className="Wager-Subtext"><a href={props.event.url} onClick={onLink}>Watch now</a></p>
          ) : (
            <p className="Wager-Subtext">Results Pending</p>
          )}
        </div>
        { userWagerOnEvent &&
          <div>
            <img className="Team-Icon" alt="team-icon" src={getTeamFromWager(userWagerOnEvent).icon_url}/>
          </div>
        }
      </div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={getCustomStyles()}
      >
        <span className='Icon-Container' onClick={closeModal}><GrClose/></span>
        <EventWagerView eventWagers={props.wagers} userTeams={props.userTeams} current={false}/>
      </ReactModal>
    </div>
  )
}

export default PastEvent;
