
const LeagueTable = (props) => {


  return (
    <div>
      <h2>Full Results</h2>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>Marble Team</th>
            { props.events &&
              props.events.map(item =>
                <th>{item.event_num}</th>
              )
            }
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { props.mLTeams &&
            props.mLTeams.map(teamItem =>
              <tr>
                <td>{teamItem.name}</td>
                {
                  teamItem.events.filter(item => item.name)
                    .map(item =>
                      <td>{item.points}</td>
                    )
                }
                <td>{teamItem.total}</td>
              </tr>
            )
          }
        </tbody>
        <thead>
          <tr>
            <th>One of Us</th>
          </tr>
        </thead>
        <tbody>
          { props.userTeams &&
            props.userTeams.map(teamItem =>
              <tr>
                <td>{teamItem.name}</td>
                {
                  teamItem.results.filter(item => item.name)
                    .map(item =>
                      <td>{item.primary + item.secondary}</td>
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
