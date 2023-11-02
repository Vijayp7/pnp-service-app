import React, { Component } from 'react'

export class WalkingScreen extends Component {


    move =()=>{
        this.props.history.push({
            pathname:'/grooming-screen'
        })
    }

    componentDidMount () {
      if(navigator.onLine){
        window.addEventListener('backbutton', this.onBackPressed);
        if ("geolocation" in navigator) {
          console.log("Available");
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
      
            const obj = {
              lon: position.coords.longitude,
              lat: position.coords.latitude,
            };
            console.log(obj);
            localStorage.setItem("serivce_provider_lat", position.coords.latitude);
            localStorage.setItem("serivce_provider_long", position.coords.longitude);
    
            //For Full Address
            const google = window.google;
            var latlng = new google.maps.LatLng(obj.lat, obj.lon); 
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                      console.log(results[1].formatted_address);
                      localStorage.setItem("serivce_provider_location", results[1].formatted_address);
                    }
                }
                else {
                  //
                }
                
            });
          });
        } else {
          console.log("open GPS")
        }
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
       
    }


    componentWillUnmount() {
      window.removeEventListener('backbutton', this.onBackPressed);
    }

    onBackPressed = () => {
      this.props.history.push({
        pathname : "/borading-screen"
      })
    };


  render() {
    return (
        <div class="main1-pnp">
        <div class="main1-head">
          <div>
          <a onClick={this.onBackPressed}><img src="left-arrow.png" alt="arrow" /></a>
          </div>
          {/* <header>
            <img src="menu-logo.png" />
          </header> */}
        </div> 
        <div class="main1-pnp-info">
          <img src="walking-p.png" alt="img" />
          <span>Be a</span>
          <h3>Dog Walking</h3>
          <h6>Master</h6>
          <p>Hire verified Pet lover to watch your furry friend when you are away</p>
        </div> 
        <div class="main1-pagenations">
          <div class="pagination-wrapper">
            <div class="pagination">
              <span></span>
              <span class="active"></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <a onClick={this.move}><img src="arrow1.png" alt="arrow" /></a>
        </div>
      </div>
    )
  }
}

export default WalkingScreen