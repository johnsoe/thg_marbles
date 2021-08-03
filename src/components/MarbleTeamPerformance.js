
const MarbleTeamPerformance = (props) => {
  const validEvents = filterValidEvents(props.events);
  return(
    <div>
      { validEvents && validEvents.length > 0 &&

        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Points Earned</th>
            </tr>
          </thead>
          <tbody>
            {
              validEvents.map(item => {
                return (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.points}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </div>
  )
}

function filterValidEvents(events) {
  return events.filter(item => item.name);
}

export default MarbleTeamPerformance;
