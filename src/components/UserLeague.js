
import UserTeamItem from './UserTeamItem'
import WagerAlert from './WagerAlert'
import BaseApi from '../api/Base'

import axios from 'axios';

const UserLeague = (props) => {

  return(
    <div className="ML-Container UL-Container">
      <ul>
        <h3>Our Standings</h3>
        {
          props.userTeams
            .sort((a, b) => b.total - a.total)
            .map((item, index) =>
              <li key={item.name}>
                <UserTeamItem
                  team={item}
                  mLTeams={props.mLTeams}
                  place={index + 1}/>
              </li>
            )
        }
      </ul>
    </div>
  )
}

export default UserLeague;
