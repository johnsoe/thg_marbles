const EventWagerView = (props) => {

  var userTeamMap = props.userTeams &&
    props.userTeams.reduce((map, obj) => (map[obj.id] = obj, map), {})

  var userWagerMap = props.eventWagers &&
    props.eventWagers.reduce((map, obj) => (map[obj.userId] = obj, map), {})



  return (
    <div className='Wager-View-Container'>
      { userWagerMap && userTeamMap &&
        <div>
          <h3>Current Wagers</h3>
          <div className='pure-g'>
            <h4 className='pure-u-2-5'>Team</h4>
            <h4 className='pure-u-2-5'>Primary</h4>
            <h4 className='pure-u-1-5'>Secondary</h4>
          </div>
        </div>
      }{
            props.userTeams.map(item => {
              const userWager = userWagerMap[item.id];
              if (userWager) {
                return(
                  <div className='pure-g'>
                    <div className='pure-u-2-5 Alert-Text-Item'>
                      {
                        <span>{item.name}</span>
                      }
                    </div>
                    <div className='pure-u-2-5 Alert-Text-Item'>
                      {
                        <span>{userWager.selectedTeam}</span>
                      }
                    </div>
                    <div className='pure-u-1-5 Alert-Text-Item'>
                      {
                        <span>{userWager.secondary}</span>
                      }
                    </div>
                  </div>
                );
              } else {
                return(<div></div>);
              }
           })
         }
    </div>
  )
}

export default EventWagerView;
