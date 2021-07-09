
class NumberFormat {

  static numMapSuffix = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  }

  static numberPlaceFormat(place) {
    var suffix = NumberFormat.numMapSuffix[place];
    if (!suffix) {
      suffix = 'th';
    }
    return suffix;
  }
}

export default NumberFormat;
