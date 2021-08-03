const UserTeamPerformance = (props) => {
  const validEvents = filterValidEvents(props.events);
  return(
    <div>
      { validEvents && validEvents.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Primary</th>
              <th>Secondary</th>
            </tr>
          </thead>
          <tbody>
            {
              validEvents.map(item => {
                return (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.primary}</td>
                    <td>{item.secondary}</td>
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
  return events.filter(item => item.name || item.primary || item.secondary);
}

export default UserTeamPerformance;
