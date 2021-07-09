import './Components.css'

import React from 'react'
import MarbleLeagueItem from './MarbleLeagueItem'

const MarbleLeague = (props) => {

  return (
    <div className="ML-Container">
      <ul className="League-List-Container">
        {
          props.teams.sort((a, b) => b.total - a.total)
          .map((item, index) =>
            <li key={item.name}>
              <MarbleLeagueItem
                team={item}
                place={index + 1}
                teams={props.teams}
                wagers={props.wagers}/>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default MarbleLeague;
