import BaseApi from '../api/Base';

const LeagueTable = (props) => {

  var userTeam = BaseApi.getUserIdInUserTeamList(props.userTeams, props.auth);

  return (
    <div>
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
              const points = teamItem.points ? teamItem.points : 0;
              const userFav = teamItem.name === userTeam.favorite_ml_team;
              return (<tr className={userFav ? "User-Favorite" : undefined}>
                <td>{teamItem.name}</td>
                {
                  teamItem.events.map(item =>
                    <td className={"points-" + points}>{points}</td>
                  )
                }
                <td>{teamItem.total}</td>
              </tr>)
            })
          }
        </tbody>
        <thead>
          <tr>
            <th colSpan="18">One of Us</th>
          </tr>
        </thead>
        <tbody>
          { props.userTeams &&
            props.userTeams.map(teamItem =>
              <tr className={teamItem.id === userTeam.id ? "User-Favorite" : undefined}>
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
