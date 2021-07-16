import PlaceView from './PlaceView'

const MarbleLeagueHeader = (props) => {

  return (
    <div className={"League-Team-Container " + (props.onClickCallback ? "League-Team-Container-Hover" : "")}
      onClick={props.onClickCallback}>
      <img className="Team-Icon" src={props.team.icon_url}/>
      <div className="Team-Text-Container pure-u-2-3">
        <p className="Team-Text">{props.team.name}</p>
        <p className="Team-Subtext">{props.team.hashtag}</p>
      </div>
      <PlaceView total={props.team.total} place={props.place}/>
    </div>
  )
}

export default MarbleLeagueHeader
