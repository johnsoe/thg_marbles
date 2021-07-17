import PlaceView from './PlaceView'

const UserTeamHeader = (props) => {

  console.log(props.team);

  return (
    <div className={"League-Team-Container" + (props.onClickCallback ? " League-Team-Container-Hover" : "")} onClick={props.onClickCallback}>
      <div className="Team-Text-Container pure-u-2-3">
        <p className="Team-Text">{props.team.name}</p>
        <p className="Team-Subtext">{props.team.person}</p>
      </div>
      <PlaceView total={props.team.total} place={props.place}/>
    </div>
  )
}

export default UserTeamHeader;
