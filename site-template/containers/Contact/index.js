import React, { Component } from 'react'
import batSignal from '../../images/bat-signal.jpg'
export default class Contact extends Component {
  render() {
    return (
      <div>
        <h1>Contact</h1>
        <p>For quick and prompt response, please use the bat signal that
        can be found in the hands of Detective James Gordon.</p>
        <img src={batSignal} />
      </div>
    )
  }
}


export default Contact
