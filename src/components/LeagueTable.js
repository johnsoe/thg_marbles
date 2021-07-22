import BaseApi from '../api/Base';

const LeagueTable = (props) => {

  var userTeam = BaseApi.getUserIdInUserTeamList(props.userTeams, props.auth);
  var userId = (userTeam ? userTeam.id : -1);

  return (
    <div className="Table-Contiainer">
      <h3>Full Results</h3>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>Marble Team</th>
            {
              Array.from(Array(16), (e, i) => {
                return <th key={'table-header-' + (i + 1)}>{i + 1}</th>;
              })
            }
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { props.mLTeams &&
            props.mLTeams.map(teamItem => {
              const userFav = teamItem.name === ( userTeam ? userTeam.favorite_ml_team : -1);
              return (<tr key={teamItem.name} className={userFav ? "User-Favorite" : undefined}>
                <td>{teamItem.name}</td>
                {
                  teamItem.events.map((item, i) => {
                    const points = item.points ? item.points : 0;
                    return <td key={teamItem.name + "-" + i} className={"points-" + points}>{points}</td>
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
              <tr key={teamItem.name} className={teamItem.id === userId ? "User-Favorite" : undefined}>
                <td>{teamItem.name}</td>
                {
                  teamItem.results.map((item, i) =>
                    <td key={teamItem.name + "-" + i}>{item.primary + item.secondary ? item.primary + item.secondary : 0}</td>
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
