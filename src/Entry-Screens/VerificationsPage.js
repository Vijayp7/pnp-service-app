import React, { Component } from 'react'

export class VerificationsPage extends Component {
  render() {
    return (
        <div id="wrapper">
     
      

        <div class="srvc-dtls">
          
          <div class="srvc-dtls-hd">
            <h4>My Verification</h4>
            <div class="srvc-dtls-bck">
              <img src="images/srvc-dtls-bck-icon.png" />
            </div>
          </div>
  
  
          <div class="srvc-dtls-main">
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="images/phn_vrfn_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Phone Verification</p>
                  <span class="vrfcn-sucss">Verified</span>
                </div>
              </div>
              <div class="vrfn-item-rht">
                <img src="images/scs_vrfcn_icon.png" />
              </div>
            </div>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="images/gmail_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Gmail Verification</p>
                  <span>Verify Now</span>
                </div>
              </div>
            </div>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="images/thumb_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>ID Verification</p>
                  <span class="vrfcn-pndng">pending</span>
                </div>
              </div>
              <div class="vrfn-item-rht">
                  <img src="images/upload_c_icon.png" />
                  <input type="file" name="" placeholder="Upload A image" />
              </div>
            </div>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="images/certification_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Certication</p>
                  <span>Verify Now</span>
                </div>
              </div>
              <div class="vrfn-item-rht">
                  <img src="images/upload_c_icon.png" />
                  <input type="file" name="" placeholder="Upload A image" />
              </div>
            </div>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="images/business_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Business License</p>
                  <span>Verify Now</span>
                </div>
              </div>
              <div class="vrfn-item-rht">
                  <img src="images/upload_c_icon.png" />
                  <input type="file" name="" placeholder="Upload A image" />
              </div>
            </div>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="images/police_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Police Clearance</p>
                  <span>Verify Now</span>
                </div>
              </div>
              <div class="vrfn-item-rht">
                  <img src="images/upload_c_icon.png" />
                  <input type="file" name="" placeholder="Upload A image" />
              </div>
            </div>
          </div>
          <div class="vrfn-back-btn">
              <button>Back</button>
          </div>
  
  
        </div>
  
  
  
  
  
  
  
  
  
  
  
  
      </div>
    )
  }
}

export default VerificationsPage