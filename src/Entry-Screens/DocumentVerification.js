import React, { Component } from 'react'
import './DocumentVerification.css'
import HandlingImage from './HandlingImage';
import Services from '../Services/Services';
import PullToRefresh from 'react-simple-pull-to-refresh';





const userData = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class DocumentVerification extends Component {
    constructor(props){
        super(props);
    }
    state= {
        id_proof : "",
        id_proof_return : "",
        id_proof_name : "",
        certificate_proof : "",
        certificate_proof_return : "",
        certificate_proof_name : "",
        address_proof : "",
        address_proof_return : "",
        address_proof_name : "",
        error_message : "",
        success_message : "",
        proofs_status : {}

    }
    componentDidMount = () =>{
      if(navigator.onLine){
        const obj = {
          userId : userData.id,
        }
        Services.getInstance().SPProofsStatus(obj).then((result)=>{
          this.setState({
            proofs_status : result
          })
        })
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }






    goBack = () =>{
        this.props.history.push({
            pathname : "/home"
        })
    }


    handle_Id_Proof = (event) =>{
      HandlingImage.getInstance().handleImagesMethod(event).then((result)=>{
        if(event.target.files[0].type == 'image/png'){
          let base64ImageURL = result.replace('data:image/png;base64,','');
          // console.log(base64ImageURL);
          this.setState({
            id_proof_return: base64ImageURL,
            id_proof: result,
            id_proof_name : event.target.files[0].name
          })
        }
        else if(event.target.files[0].type == 'image/jpeg'){
          let base64ImageURL = result.replace('data:image/jpeg;base64,','');
          // console.log(base64ImageURL);
          this.setState({
            id_proof_return: base64ImageURL,
            id_proof: result,
            id_proof_name : event.target.files[0].name
          })
    
        }
        else{
          // toast.error("Please upload PNG or JPEG files..");
        }
      })
    }




    
handle_Certificate_Proof = (event) =>{
  HandlingImage.getInstance().handleImagesMethod(event).then((result)=>{
    if(event.target.files[0].type == 'image/png'){
      let base64ImageURL = result.replace('data:image/png;base64,','');
      // console.log(base64ImageURL);
      this.setState({
        certificate_proof_return: base64ImageURL,
        certificate_proof: result,
        certificate_proof_name : event.target.files[0].name
      })
    }
    else if(event.target.files[0].type == 'image/jpeg'){
      let base64ImageURL = result.replace('data:image/jpeg;base64,','');
      // console.log(base64ImageURL);
      this.setState({
        certificate_proof_return: base64ImageURL,
        certificate_proof: result,
        certificate_proof_name : event.target.files[0].name
      })

    }
    else{
      // toast.error("Please upload PNG or JPEG files..");
    }
  })
}


handle_Address_Proof = (event) =>{
  HandlingImage.getInstance().handleImagesMethod(event).then((result)=>{
    if(event.target.files[0].type == 'image/png'){
      let base64ImageURL = result.replace('data:image/png;base64,','');
      // console.log(base64ImageURL);
      this.setState({
        address_proof_return: base64ImageURL,
        address_proof : result,
        address_proof_name : event.target.files[0].name,
      })
    }
    else if(event.target.files[0].type == 'image/jpeg'){
      let base64ImageURL = result.replace('data:image/jpeg;base64,','');
      this.setState({
        address_proof_return: base64ImageURL,
        address_proof : result,
        address_proof_name : event.target.files[0].name,
      })
      // console.log(base64ImageURL);

    }
    else if(event.target.files[0].type == 'image/jpg'){
      let base64ImageURL = result.replace('data:image/jpg;base64,','');
      this.setState({
        address_proof_return: base64ImageURL,
        address_proof : result,
        address_proof_name : event.target.files[0].name,
      })
      // console.log(base64ImageURL);

    }
    else{
      console.log("Please upload PNG or JPEG files..");
    }
  })
}

handleRefreshMethod = () =>{
  window.location.reload();
}



SubmitProofs = () =>{
  if(this.state.address_proof_return == "" && this.state.id_proof_return == "" && this.state.certificate_proof_return == ""){
    this.setState({
      error_message : "No files are selected to submit"
    })
  }
  else {
    this.setState({
      error_message : ""
    })
    const obj = {
      userId : userData.id,
      id_proof : this.state.id_proof_return,
      certificate_proof : this.state.certificate_proof_return,
      address_proof : this.state.address_proof_return,
    }
    Services.getInstance().SPUpdateProofs(obj).then((result)=>{
      if(result.status == true){
        this.setState({
          success_message : result.msg
        }, () =>{
          const timeout = setTimeout(() => {
            this.props.history.push({
              pathname : "/home"
            })
        }, 2000);
        })
      }
      else {
        this.setState({
          error_message : result.msg
        })
      }

    })
  }
}








  render() {
    return (
        <div id="wrapper">
        <div class="srvc-dtls">
          <div class="srvc-dtls-hd">
            <h4>My Verification</h4>
            <div class="srvc-dtls-bck" onClick={this.goBack}>
              <img src="srvc-dtls-bck-icon.png" />
            </div>
          </div>
          <div class="srvc-dtls-main" style={{minHeight : "0px"}}>
          <PullToRefresh onRefresh={this.handleRefreshMethod}>

            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="phn_vrfn_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Phone Verification</p>
                  <span class="vrfcn-sucss">Verified</span>
                </div>
              </div>
              <div class="vrfn-item-rht">
                <img src="scs_vrfcn_icon.png" />
              </div>
            </div>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="thumb_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>ID Verification</p>
                  {this.state.proofs_status.idArrove == "0" ? 
                      <span class="vrfcn-pndng">Pending</span> :
                    this.state.proofs_status.idArrove == "1" ?
                      <span class="vrfcn-sucss">Approved</span> :
                      <span class="vrfcn-pndng">Rejected</span> 
                  }
                  
                </div>
              </div>
{this.state.proofs_status.idArrove == "1" ?
              <div class="vrfn-item-rht">
                <img src="scs_vrfcn_icon.png" />
              </div>
      :
              <div class="vrfn-item-rht">
                  <img src="upload_c_icon.png" />
                  <input 
                    type="file" 
                    name="id_proof"
                    accept="image/*" 
                    placeholder="Upload A image"
                    onChange={this.handle_Id_Proof} 
                  />
              </div>
}
            </div>
            <p>{this.state.id_proof_name}</p>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="certification_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Certication</p>
                  {this.state.proofs_status.crtArrove == "0" ? 
                      <span class="vrfcn-pndng">Pending</span> :
                    this.state.proofs_status.crtArrove == "1" ?
                      <span class="vrfcn-sucss">Approved</span> :
                      <span class="vrfcn-pndng">Rejected</span> 
                  }
                </div>
              </div>
{this.state.proofs_status.crtArrove == "1" ?
              <div class="vrfn-item-rht">
                <img src="scs_vrfcn_icon.png" />
              </div>
      :
              <div class="vrfn-item-rht">
                  <img src="upload_c_icon.png" />
                  <input 
                    type="file" 
                    name="certificate_proof"
                    accept="image/*" 
                    placeholder="Upload A image"
                    onChange={this.handle_Certificate_Proof} 
                  />
              </div>
}
            </div>
            <p>{this.state.certificate_proof_name}</p>
            <div class="vrfn-item">
              <div class="vrfn-item-lft">
                <div class="vrfn-item-img">
                  <img src="business_icon.png" />
                </div>
                <div class="vrfn-item-cnt">
                  <p>Address Proof</p>
                  {this.state.proofs_status.addrArrove == "0" ? 
                      <span class="vrfcn-pndng">Pending</span> :
                    this.state.proofs_status.addrArrove == "1" ?
                      <span class="vrfcn-sucss">Approved</span> :
                      <span class="vrfcn-pndng">Rejected</span> 
                  }
                </div>
              </div>
{this.state.proofs_status.addrArrove == "1" ?
              <div class="vrfn-item-rht">
                <img src="scs_vrfcn_icon.png" />
              </div>
      :
              <div class="vrfn-item-rht">
                  <img src="upload_c_icon.png" />
                  <input 
                    type="file" 
                    name="address_proof"
                    accept="image/*" 
                    placeholder="Upload A image"
                    onChange={this.handle_Address_Proof}  
                  />
              </div>
}
            </div>
            </PullToRefresh>
            <p>{this.state.address_proof_name}</p>
          </div>

          <p style={{margin: '0px', color: 'red', fontSize: '14px', marginBottom: '5px',textAlign : "center"}}>{this.state.error_message}</p>
          <p style={{margin: '0px', color: 'green', fontSize: '14px', marginBottom: '5px',textAlign : "center"}}>{this.state.success_message}</p>
          <div class="vrfn-back-btn" onClick={this.SubmitProofs}>
              <button>Submit</button>
          </div>
            
        </div>
      </div>
    )
  }
}

export default DocumentVerification