import axios from 'axios'

class BaseApi {
  static getBaseUrl() {
    return "https://lsgs3tdrt3.execute-api.us-west-2.amazonaws.com/dev"
  }

  static queryForLeagueData(success) {
    axios.get(BaseApi.getBaseUrl(), {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(success)
      .catch(err => console.log(err));
  }

  static getCurrentUserId(auth) {
    return auth['attributes']['sub'];
  }

  static getAuthToken(auth) {
    return auth['signInUserSession']['accessToken']['jwtToken'];
  }

  static isUserIdInUserTeamList(userTeams, auth) {
    return userTeams.some(item => {
      return item.id == BaseApi.getCurrentUserId(auth);
    });
  }
}

export default BaseApi;
