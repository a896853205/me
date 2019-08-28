import React from 'react';
// UI
import '../../style/cover.css'

// img
import IMG_BACKGROUND from '../../resources/background.png';

class CoverController extends React.Component {
  render() {
    return (
      <div className='cover-container'>
        <img 
          src={IMG_BACKGROUND}
          alt='背景'
          className='img-background' />
      </div>
    );
  }
}
export default CoverController;