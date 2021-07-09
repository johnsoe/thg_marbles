
import { positions } from 'react-alert'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  content: {
    top: '10%',
    left:'25%',
    right: '25%',
    bottom: 'auto',
    width:'auto',
  }
};

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px'
};

export { customStyles, alertOptions };
