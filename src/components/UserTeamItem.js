
const UserTeamItem = (props) => {
  console.log(props.team);
  return(
    <p>{props.team.name}</p>
  )
}

export default UserTeamItem;
