import { useState } from 'react'
import PlaceView from './PlaceView'
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
      <div className="League-Team-Container League-Team-Container-Hover" onClick={openModal}>
        <p className="Team-Text pure-u-2-3">{props.team.name}</p>
        <PlaceView total={props.team.total} place={props.place}/>
      </div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={getCustomStyles()}>

        <span className='Icon-Container' onClick={closeModal}><GrClose/></span>
        <div className="League-Team-Container">
          <p className="Team-Text pure-u-2-3">{props.team.name}</p>
          <PlaceView total={props.team.total} place={props.place}/>
        </div>
        <p className="Team-Text">Favorite Team - {props.team.favorite_ml_team}</p>
        <UserTeamPerformance events={props.team.results} />
      </ReactModal>
    </div>
  )
}

export default UserTeamItem;
