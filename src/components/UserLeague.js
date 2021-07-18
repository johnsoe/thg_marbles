import UserTeamItem from './UserTeamItem'

const UserLeague = (props) => {

  var prevTotal = 0;
  var prevPlace = 0;

  return(
    <div className="ML-Container UL-Container">
      <h3>Our Standings</h3>
      <ul>  
        {
          props.userTeams
            .sort((a, b) => b.total - a.total)
            .map((item, index) => {
              var place = index + 1;
              if (prevTotal === item.total) {
                place = prevPlace;
              } else {
                prevTotal = item.total;
                prevPlace = place;
              }

              return <li key={item.name}>
                <UserTeamItem
                  team={item}
                  mLTeams={props.mLTeams}
                  place={place}/>
              </li>
            })
        }
      </ul>
    </div>
  )
}

export default UserLeague;
