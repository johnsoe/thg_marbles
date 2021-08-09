import { positions } from 'react-alert'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  content: {
    top: '5%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
    width:'auto',
  }
};

const mobileStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  content: {
    top: '5%',
    left: '3%',
    right: '3%',
    bottom: 'auto',
    width:'auto',
  }
};

export const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px'
};

export const getCustomStyles = () => {
  if (window.innerWidth > 800) {
    return customStyles;
  } else {
    return mobileStyles;
  }
};
