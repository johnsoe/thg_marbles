import './Components.css'

import React from 'react'
import MarbleLeagueItem from './MarbleLeagueItem'

class MarbleLeague extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="ML-Container">
        <ul className="League-List-Container">
          {
            this.props.teams
            .map(item =>
              <li key={item.name}>
                <MarbleLeagueItem team={item}/>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default MarbleLeague;
