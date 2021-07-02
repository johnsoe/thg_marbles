
import React from 'react'

class MarbleLeagueItem extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    console.log(this.props.team);
    return (
      <div className="League-Team-Container">
        <img className="Team-Icon" src={this.props.team.icon_url}/>
        <div className="Team-Text-Container">
          <p className="Team-Text Team-Name">{this.props.team.name}</p>
          <p className="Team-Text ML-Hashtag">{this.props.team.hashtag}</p>
        </div>
      </div>
    )
  }
}

export default MarbleLeagueItem;
