import axios from 'axios'

class BaseApi {

  static queryForLeagueData(success) {
    axios.get("https://lsgs3tdrt3.execute-api.us-west-2.amazonaws.com/dev", {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(success)
      .catch(err => console.log(err));
  }
}

export default BaseApi;
