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
            const eventWagers = getAllWagersOnEvent(props.wagers, item.id);
            return(
              <div key={item.name} className="pure-u-1 pure-u-sm-1-5">
                <PastEvent
                  event={item}
                  wagers={eventWagers}
                  userId={userId}
                  mLTeams={props.mLTeams}
                  userTeams={props.userTeams}
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
