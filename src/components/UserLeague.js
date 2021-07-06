
import UserTeamItem from './UserTeamItem'
import WagerAlert from './WagerAlert'

import axios from 'axios';

const UserLeague = (props) => {

  function getUpcomingEvents() {
    const now = Date.now();
    console.log(now / 1000);
    return props.events.filter(item => {
        return now / 1000 <= item.expiry;
    })
    .sort(item => item.expiry);
  }

  const upcomingEvents = getUpcomingEvents();

  return(
    <div>
      { upcomingEvents.length > 0 && props.auth && 
        <ul>
          {
            upcomingEvents.map(item =>
              <li key={item.name}>
                <WagerAlert mLEvent={item} auth={props.auth} onWagerMade={props.onWagerMade}/>
              </li>
            )
          }
        </ul>
      }
      <ul>
        {
          props.userTeams.map(item =>
            <li key={item.name}>
              <UserTeamItem team={item}/>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default UserLeague;
