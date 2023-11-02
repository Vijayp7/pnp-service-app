import React, { Component } from 'react'
import '../Entry-Screens/NavigationMenu.css'


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class NavigationMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
        <div class="f-menu">
          <div class="m-ordr-sumry-sec">
            <div class="side-menu">
              <span onClick={this.props.closeMenu}><img src="menu-close.png" /></span>
              <div class="m-prfl-edit">
                <div class="m-prfl-img">
                  <img src={this.props.userPhoto} />
                </div>
                <div class="m-prfl-cnt">
                  <h6>{user.first_name + " " + user.last_name}</h6>
                  <p onClick={this.props.openProfile}>Edit</p>
                </div>
              </div>
                <div class="menu-list">
                {/* <h5>Menu</h5> */}
    
              {/* <div class="menu-item">
                  <div class="menu-item-lft">
                    <img src="history-time.png" />
                  </div>
                  <span>History</span>
                  <small>10</small>
                </div>
                <div class="menu-item">
                  <div class="menu-item-lft">
                    <img src="blnc-icon.png" />
                  </div>
                  <span>Balance</span>
                </div>
                <div class="menu-item">
                  <div class="menu-item-lft">
                    <img src="referal-icon.png" />
                  </div>
                  <span>Referal</span>
                </div>  */}
                <div class="menu-item" onClick={this.props.openDocumentVerification}>
                  <div class="menu-item-lft">
                    <img src="my-badge-icon.png" />
                  </div>
                  <span>Verification</span>
                </div>
                <div class="menu-item" onClick={this.props.openAddService}>
                  <div class="menu-item-lft">
                    <img src="add-new-service-icon.png" />
                  </div>
                  <span>Add New Services</span>
                </div>
                <div class="menu-item" onClick={this.props.openAddPhotos}>
                  <div class="menu-item-lft">
                    <img src="add-media-icon.png" />
                  </div>
                  <span>Add Videos or Photos</span>
                </div>
                <div class="menu-item" onClick={this.props.openMyReviews}>
                  <div class="menu-item-lft">
                    <img src="review-icon.png" />
                  </div>
                  <span>My Reviews</span>
                </div>
                <div class="menu-item" onClick={this.props.openBankDetails}>
                  <div class="menu-item-lft">
                    <img src="review-icon.png" />
                  </div>
                  <span>Bank Details</span>
                </div>
                <div class="menu-item" onClick={this.props.Logout}>
                  <div class="menu-item-lft">
                    <img src="logout-icon.png" />
                  </div>
                  <span>Log out</span>
                </div>

                {/* <div>
                  <h1>My App</h1>
                  {appVersion && <p>Version: {appVersion}</p>}
                </div> */}
    
    
              </div>
              <div class="menu-btm-logo">
                <img src="menu-logo.png" />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default NavigationMenu