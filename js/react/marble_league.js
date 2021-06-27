'use strict';

import axios from 'axios';

const e = React.createElement;

class MarbleLeague extends React.Component {

  componentDidMount() {

      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          teams : res.data
        })
      })
      .catch(err => console.log(err))
  }

  constructor(props) {
    super(props);
    this.state = {
      teams : null
    }
  }

  render() {
    return e(
      'div',
      [],
      'test'
    )
  }
}

class MarbleTeamCard extends React.Component {
  constructor(props) {
    super(props);
  }
}

const domContainer = document.querySelector('#marble_league_container');
ReactDOM.render(e(MarbleLeague), domContainer);
