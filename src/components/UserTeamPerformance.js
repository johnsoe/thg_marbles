const UserTeamPerformance = (props) => {
  const validEvents = filterValidEvents(props.events);
  return(
    <div>
      { validEvents && validEvents.length > 0 &&
        <div className='pure-g'>
          <div className='pure-u-1-4 Performance-Col'>
            <h4>Event</h4>
            {
              validEvents.map(item =>
                <p key={item.name}>{item.name}</p>
              )
            }
          </div>
          <div className='pure-u-1-4 Performance-Col'>
            <h4>Primary</h4>
            {
              validEvents.map(item =>
                <p key={item.name + '-primary'}>{item.primary}</p>
              )
            }
          </div>
          <div className='pure-u-1-4 Performance-Col'>
            <h4>Secondary</h4>
            {
              validEvents.map(item =>
                <p key ={item.name + '-secondary'}>{item.secondary}</p>
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
