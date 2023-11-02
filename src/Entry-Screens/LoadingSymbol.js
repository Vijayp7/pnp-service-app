import React, { Component } from 'react'

export class LoadingSymbol extends Component {

  render() {
    return (
        <div className="loading-main">
        <div className="loader--roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <header className="loader--title">Loading</header>
      </div>
    )
  }
}

export default LoadingSymbol