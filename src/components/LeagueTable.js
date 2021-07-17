import BaseApi from '../api/Base';

const LeagueTable = (props) => {

  var userTeam = BaseApi.getUserIdInUserTeamList(props.userTeams, props.auth);
  var userId = (userTeam ? userTeam.id : -1);

  return (
    <div className="Table-Contiainer">
      <h2>Full Results</h2>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>Marble Team</th>
            {
              Array.from(Array(16), (e, i) => {
                return <th>{i + 1}</th>;
              })
            }
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { props.mLTeams &&
            props.mLTeams.map(teamItem => {
              const userFav = teamItem.name === ( userTeam ? userTeam.favorite_ml_team : -1);
              return (<tr className={userFav ? "User-Favorite" : undefined}>
                <td>{teamItem.name}</td>
                {
                  teamItem.events.map(item => {
                    const points = item.points ? item.points : 0;
                    return <td className={"points-" + points}>{points}</td>
                  })
                }
                <td>{teamItem.total}</td>
              </tr>)
            })
          }
        </tbody>
        <thead>
          <tr>
            <th colSpan="18">All of Us</th>
          </tr>
        </thead>
        <tbody>
          { props.userTeams &&
            props.userTeams.map(teamItem =>
              <tr className={teamItem.id === userId ? "User-Favorite" : undefined}>
                <td>{teamItem.name}</td>
                {
                  teamItem.results.map(item =>
                    <td>{item.primary + item.secondary ? item.primary + item.secondary : 0}</td>
                  )
                }
                <td>{teamItem.total}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}



export default LeagueTable;
