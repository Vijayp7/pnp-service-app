import { color } from 'framer-motion'
import React, { Component } from 'react'
import Services from '../Services/Services';
import '../Entry-Screens/MyReviews.css'


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class MyReviews extends Component {

    constructor(props){
        super(props);
    }

    state={
       reviews : {},
       reviews_list : [],
    }
     componentDidMount = () =>{
      if(navigator.onLine){
      const obj = {
        userId : user.id
      }
      Services.getInstance().SpReviews(obj).then((result)=>{
        console.log(result)
        this.setState({
          reviews : result,
          reviews_list : result.reviewList,
        })
      })
     }
     else{
      this.props.history.push({
        pathname : "/internet"
      })
     }
    }
    

    viewProfile=()=>{
        this.props.history.push({
            pathname : "/home"
          })
    }


    openProfile = () =>{
      this.props.history.push({
        pathname : "/edit-profile"
      })
    }
    openHome = () =>{
      this.props.history.push({
        pathname : "/home"
      })
    }
    openWhatsapp = () =>{
      window.open("https://wa.me/917997887788","_blank");
    }

  render() {
    return (
        <div class="home-pnp">
        <div class="view-profile-header" style={{backgroundImage: `url(${user.photo})`}}>
          <div class="boarding-head">
            <a onClick={this.viewProfile}><img src="left-arrow.png" alt="arrow"/></a>
          </div>
          
        </div>
        <div class="view-profile-sec">
          <div class="profile-id">
            <div class="profile-id-lft">
              <div class="profile-id-img">
                <img src={user.photo} alt=""/>
              </div>
              <div class="profile-id-info">
                {/* <h4>{this.props.location.quote.name}</h4> */}
                <span>
                  <img src="booking-icon.png"/>
                  <p>{this.state.reviews.jobCom} Booking Completed</p>
                </span>
              </div>
            </div>
            <div class="profile-id-rht">
              <span>
                <img src="star-silver.png" alt=""/>
                <p>{this.state.reviews.avgRating}</p>
              </span>
              
            </div>
            <div class="secure">
                <img src="pnp-vrfd-strip.png" alt=""/>
            </div>
          </div>

          <div class="view-profile-tabs">
            <ul class="tabs">
              {/* <li class="tab-link current" id='tab-link-1' onClick={()=>this.tabSection("tab-1")} >Facilities</li>
              <li class="tab-link" id='tab-link-2' onClick={()=>this.tabSection("tab-2")} >Photos</li> */}
              {/* <li class="tab-link" id='tab-link-3' >Reviews</li> */}
            </ul>
            {/* <div id="tab-1" class="tab-content current" >
                <div class="facilities-sec" >
                  <div class="facilities-heading">
                    <div>
                      <h4>Facilities</h4>
                    </div>
                    <button>Book now</button>
                  </div>
                  <div class="facilities-list">
                    <div class="facilities">
                      <img src="facilities1-img.png" alt=""/>
                      <p>Meals</p>
                    </div>
                    <div class="facilities">
                      <img src="facilities2-img.png" alt=""/>
                      <p>Care</p>
                    </div>
                    <div class="facilities">
                      <img src="facilities3-img.png" alt=""/>
                      <p>Out Door</p>
                    </div>
                  </div>
                  <div class="facilities-list-2">
                    <div class="facilities-2">
                      <img src="facilities4-img.png" alt=""/>
                      <p>Combing</p>
                    </div>
                    <div class="facilities-2">
                      <img src="facilities6-img.png" alt=""/>
                      <p>Walking</p>
                    </div>
                  
                  </div>
                </div>
            </div> */}
            {/* <div id="tab-2" class="tab-content">
              <div class="profile-photo-sec" >
                <div class="profile-photo">
                  <img src="blog-photo1.png" />
                </div>
                <div class="profile-photo">
                  <img src="blog-photo1.png" />
                </div>
                <div class="profile-photo">
                  <img src="blog-photo1.png" />
                </div>
                <div class="profile-photo">
                  <img src="blog-photo1.png" />
                </div>
                <div class="profile-photo">
                  <img src="blog-photo1.png" />
                </div>
                <div class="profile-photo">
                  <img src="blog-photo1.png" />
                </div>
              </div>
            </div> */}
            <div id="tab-3" class="tab-content" style={{display:"block"}}>
              <div class="based-review">
                <div class="rating-sec" >
                  <p>{this.state.reviews.avgRating}</p>
                  <div class="rating-stars">
                    <img src="rating-star.png" />
                    <img src="rating-star.png" />
                    <img src="rating-star.png" />
                    <img src="rating-star.png" />
                    <img src="rating-star.png" />
                  </div>
                  <span>Based on {this.state.reviews.totalReviews} reviews</span>
                </div>
                <div class="rating-sec-ryt">
                  <ul>
                    <li>
                      <p>Excellent</p>
                      <div class="rating-bar">
                      <div style={{width: ((this.state.reviews.stars5)+"px"), height: "4px", backgroundColor : "#9dce76"}}></div>
                      </div>
                    </li>
                    <li>
                      <p>Good</p>
                      <div class="rating-bar">
                      <div style={{width: ((this.state.reviews.stars4)+"px"), height: "4px", backgroundColor : "#9dce76"}}></div>
                      </div>
                    </li>
                    <li>
                      <p>Average</p>
                      <div class="rating-bar">
                      <div style={{width: ((this.state.reviews.stars3)+"px"), height: "4px", backgroundColor : "#9dce76"}}></div>
                      </div>
                    </li>
                    <li>
                      <p>Below Average</p>
                      <div class="rating-bar">
                      <div style={{width: ((this.state.reviews.stars2)+"px"), height: "4px", backgroundColor : "#9dce76"}}></div>
                      </div>
                    </li>
                    <li>
                      <p>Poor</p>
                      <div class="rating-bar">
                      <div style={{width: ((this.state.reviews.stars1)+"px" || "0px"), height: "4px", backgroundColor : "#9dce76"}}></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div>

              {this.state.reviews_list && this.state.reviews_list.length > 0 ? this.state.reviews_list.map((review,index)=>{
                return(
                  <div class="google-rev-info">
                  <div class="google-rev">
                    <div class="google-feedback">
                      <img src={review.image} />
                      <div>
                        <h6>{review.ciUserId}</h6>
                        <div class="rating-stars">
                          <img src="rating-star.png" />
                          <img src="rating-star.png" />
                          <img src="rating-star.png" />
                          <img src="rating-star.png" />
                          <img src="rating-star.png" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div class="google-frt">
                      <img src="clock2.png" />
                      <p>{review.dateCreated}</p>
                    </div>
                  </div>
                  <p class="para">{review.comment}</p>
                </div>
                )
              }) : ""}

            

              </div>
            </div>
          </div>
        </div>
        <div class="srvc-ftr">
              <div class="srvc-ftr-item active" onClick={this.openProfile}>
                <img src="profile-a.png" class="wo-a"/>
                <img src="profile.png" class="wt-a"/>
                <span>Profile</span>
              </div>
              <div class="srvc-ftr-item active" onClick={this.openHome}>
                <img src="home.png" class="wo-a"/>
                <img src="home-a.png" class="wt-a"/>
                <span>Home</span>
              </div>
              <div class="srvc-ftr-item active" onClick={this.openWhatsapp}>
                {/* <a href='https://wa.me/917997887788'></a> */}
                <img src="help.png" class="wo-a"/>
                <img src="help.png" class="wt-a"/>
                <span>Help</span>
              </div>
              
          </div>

      </div>
    )
  }
}

export default MyReviews