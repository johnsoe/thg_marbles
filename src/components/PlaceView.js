import NumberFormat from '../util/NumberFormat';

const PlaceView = (props) => {

  function getPlaceStyle() {
    if (props.total === 0) {
      return "";
    }
    switch (props.place) {
      case 1: return " Place-Gold";
      case 2: return " Place-Silver";
      case 3: return " Place-Bronze";
      default: return "";
    }
  }

  return (
    <div className="Place-Container">
      <p className={"Place-Text" + getPlaceStyle()}>
        <span>{props.place}</span>
        <span className="Place-Superscript">{NumberFormat.numberPlaceFormat(props.place)}</span>
      </p>
      <p className="Team-Text">{props.total}</p>
    </div>
  )
}

export default PlaceView;
