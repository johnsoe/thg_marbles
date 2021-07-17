
const MarbleTeamPerformance = (props) => {
  const validEvents = filterValidEvents(props.events);
  return(
    <div>
      { validEvents && validEvents.length > 0 &&
        <div className='pure-g'>
          <div className='pure-u-2-5 Performance-Col'>
            <h4>Event</h4>
            {
              validEvents.map(item =>
                <p>{item.name}</p>
              )
            }
          </div>
          <div className='pure-u-2-5 Performance-Col'>
            <h4>Points Earned</h4>
            {
              validEvents.map(item =>
                <p>{item.points}</p>
              )
            }
          </div>
        </div>
      }
    </div>
  )
}

function filterValidEvents(events) {
  return events.filter(item => item.name);
}

export default MarbleTeamPerformance;
