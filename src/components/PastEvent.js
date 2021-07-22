import EventWagerView from './WagerView';

const PastEvent = (props) => {

  function getTeamFromWager(wager) {
    return props.mLTeams.find(item => {
      return wager.selectedTeam === item.name;
    });
  }

  return (
    <div>
      <div className="League-Team-Container Past-Event-Container">
        <div className="Team-Text-Container">
          <div>
            <p className="Wager-Text">{props.event.name}</p>
          </div>
          { props.event.expiry === 0 ? (
            <p className="Wager-Subtext"><a href={props.event.url}>Watch now</a></p>
          ) : (
            <p className="Wager-Subtext">Results Pending</p>
          )}
        </div>
        { props.userWager &&
          <div>
            <img className="Team-Icon" alt="team-icon" src={getTeamFromWager(props.userWager).icon_url}/>
          </div>
        }
      </div>
    </div>
  )
}

export default PastEvent;
