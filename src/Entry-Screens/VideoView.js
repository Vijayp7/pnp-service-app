import React, { Component } from 'react'
import { QrReader } from 'react-qr-reader';
import { Player } from 'video-react';
import '../../node_modules/video-react/dist/video-react.css';




export class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state={
      service_type: this.props.location.service_type,
    }
  }


  videoEnded = () =>{
    console.log(this.state.service_type);
    if(this.state.service_type == '1'){
      this.props.history.push({
        pathname: "/boarding-service-details",
        service_type: this.state.service_type,
        
      })
    }
    else if(this.state.service_type == '2'){
      this.props.history.push({
        pathname: "/grooming-service-details",
        service_type: this.state.service_type,
      })
    }
    else if(this.state.service_type == '3'){
      this.props.history.push({
        pathname: "/training-service-details",
        service_type: this.state.service_type,
      })
    }
    else if(this.state.service_type == '4'){
      this.props.history.push({
        pathname: "/walking-service-details",
        service_type: this.state.service_type,
    })
    }
    else if(this.state.service_type == '5'){
      this.props.history.push({
      pathname: "/vet-service-details",
      service_type: this.state.service_type,
    })
    }
    else if(this.state.service_type == '6'){
      this.props.history.push({
      pathname: "/sitting-service-details",
      service_type: this.state.service_type,
    })
    }
    
  }

 goBack = () =>{
        this.props.history.push({
          pathname: "/primary-profile-data"
        })
  }



  

  render() {
    return (
      <div class="video-pnp">
        <div class="video-pnp-header">
             <a onClick={this.goBack}><img src="left-arrow.png" alt="arrow" /></a>
             <Player
                playsInline
                poster="dog-min.png"
                src="pnp-video.mp4"
                onEnded={() => this.videoEnded()} 
            />
        </div>
        <div class="video-txt">
          <h5>Please watch the video..</h5>
          <p>After completing the video it will take you to the next step automatically</p>
          <p></p>
        </div>
        {/* <p>QRRRRRR</p>
        <QrReader
          delay={300}
          style={{width: '100%'}}
          onError={this.handleErrorWebCam}
          onScan={this.handleScanWebCam} 
        />
        <h3>Scanned By WebCam Code: {this.state.setScanResultWebCam}</h3> */}


        
      </div>
    )
  }
}

export default VideoView






