
import { useState } from 'react'
import ReactModal from 'react-modal';
import NumberFormat from '../util/NumberFormat';
import MarbleLeagueHeader from './MarbleLeagueHeader';
import MarbleTeamPerformance from './MarbleTeamPerformance';
import { GrClose } from "react-icons/gr";
import { getCustomStyles } from '../util/ModalUtil';

const MarbleLeagueItem = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <MarbleLeagueHeader
        team={props.team}
        place={props.place}
        onClickCallback={openModal}/>

      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={getCustomStyles()}>

        <span className='Icon-Container' onClick={closeModal}><GrClose/></span>
        <MarbleLeagueHeader
          team={props.team}
          place={props.place}/>

        <MarbleTeamPerformance events={props.team.events}/>
      </ReactModal>
    </div>
  )
}

export default MarbleLeagueItem;
