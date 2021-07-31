const EventWagerView = (props) => {

  var userTeamMap = props.userTeams &&
    props.userTeams.reduce((map, obj) => (map[obj.id] = obj, map), {})

  var userWagerMap = props.eventWagers &&
    props.eventWagers.reduce((map, obj) => (map[obj.userId] = obj, map), {})

  return (
    <div className='Wager-View-Container'>
      { userWagerMap && userTeamMap && props.userTeams && props.eventWagers && props.eventWagers.length > 0 &&
        <div>
          { props.current ? (
              <h3>Current Wagers</h3>
          ) : (
              <h3>All Wagers</h3>
          )
          }
          <div className='pure-g'>
            <h4 className='pure-u-2-5'>Team</h4>
            <h4 className='pure-u-2-5'>Primary</h4>
            <h4 className='pure-u-1-5'>Secondary</h4>
          </div>
        </div>
      }{
        props.userTeams.map((item, index) => {
          const userWager = userWagerMap[item.id];
          if (userWager) {
            var isUserTeamWager = props.userId === userWager.userId;
            return(
              <div className={'pure-g' + (isUserTeamWager ? " User-Favorite" : undefined)} key={'wager-' + item.id}>
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
                    <span>
                      {
                        userWager.secondary === "hidden" ? "[" + hiddenSynonyms[index % hiddenSynonyms.length] + "]"  : userWager.secondary
                      }
                    </span>
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

const hiddenSynonyms = [
  "Hidden", "Shrouded", "Redacted", "Veiled", "Indiscernable", "Unknown",
  "Undisclosed", "Masked", "Withheld", "Concealed", "Cloaked", "Clouded",
  "Invisible", "Buried"
];

export default EventWagerView;
