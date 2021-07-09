import BaseApi from '../api/Base';

const UserView = (props) => {
  return (
    <div>
      { props.user ? (
        <div className='User-Container'>
          <button onClick={props.onSignOut}>Sign Out</button>
          <span>{BaseApi.getUserEmail(props.user)}</span>
        </div>
      ) : (
        <button onClick={props.onSignIn}>Sign In With Google</button>
      )}
    </div>
  )
}

export default UserView;
