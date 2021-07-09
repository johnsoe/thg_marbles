const UserTeamPerformance = (props) => {
  const validEvents = filterValidEvents(props.events);
  console.log("ValidEvents: " + validEvents);
  return(
    <div>
      { validEvents && validEvents.length > 0 &&
        <div className='pure-g'>
          <div className='pure-u-1-4 Performance-Col'>
            <h4>Event</h4>
            {
              validEvents.map(item =>
                <p>{item.name}</p>
              )
            }
          </div>
          <div className='pure-u-1-4 Performance-Col'>
            <h4>Points Earned</h4>
            {
              validEvents.map(item =>
                <p>{item.primary}</p>
              )
            }
          </div>
          <div className='pure-u-1-4 Performance-Col'>
            <h4>Secondary Points</h4>
            {
              validEvents.map(item =>
                <p>{item.secondary}</p>
              )
            }
          </div>
        </div>
      }
    </div>
  )
}

function filterValidEvents(events) {
  return events.filter(item => item.name || item.primary || item.secondary);
}

export default UserTeamPerformance;
