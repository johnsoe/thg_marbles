import PastEvent from './PastEvent'
import { getAllWagersOnEvent } from '../util/EventUtil';
import BaseApi from '../api/Base';

const PastEvents = (props) => {

  var userTeam = BaseApi.getUserIdInUserTeamList(props.userTeams, props.auth);
  var userId = (userTeam ? userTeam.id : -1);

  return (
    <div>
      <h3>Past Events & Your Wagers</h3>
      <div className='pure-g'>
        {
          props.events.map(item => {
            var userWagerOnEvent = props.wagers.find(wager => item.id === wager.eventId);
            return(
              <div key={item.name} className="pure-u-1 pure-u-sm-1-5">
                <PastEvent
                  event={item}
                  userWager={userWagerOnEvent}
                  userId={props.userId}
                  mLTeams={props.mLTeams}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default PastEvents;
