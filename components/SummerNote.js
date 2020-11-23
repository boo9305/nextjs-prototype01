import React, {useState, useRef, useEffect} from 'react'

import axios from 'axios'

class SummerNote extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#summernote').summernote();
  
  }

  render () {
    return (
      <div>
        <div id="summernote"></div>
      </div>
    )
  };
}


export default SummerNote;
