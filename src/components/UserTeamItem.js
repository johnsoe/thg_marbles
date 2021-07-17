import { useState } from 'react'
import UserTeamHeader from './UserTeamHeader'
import ReactModal from 'react-modal';
import { GrClose } from "react-icons/gr";
import { getCustomStyles } from '../util/ModalUtil';
import UserTeamPerformance from './UserTeamPerformance';

const UserTeamItem = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return(
    <div>
      <UserTeamHeader team={props.team} place={props.place} onClickCallback={openModal}/>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={getCustomStyles()}>

        <span className='Icon-Container' onClick={closeModal}><GrClose/></span>
        <UserTeamHeader team={props.team} place={props.place}/>
        <p className="Team-Text Fav-Text">Favorite Team - {props.team.favorite_ml_team}</p>
        <UserTeamPerformance events={props.team.results} />
      </ReactModal>
    </div>
  )
}

export default UserTeamItem;
