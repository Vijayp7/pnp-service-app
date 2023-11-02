import React, { Component } from 'react'
import Services from '../Services/Services';
import './BankDetails.css'
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));



export class BankDetails extends Component {
  constructor(props){
      super(props);
  }
  state={
    bank_full_name:"",
    bank_name:"",
    account_number:"",
    branch_name:"",
    IFSC_code:"",
    bank_full_name:"",
    bank_name:"",
    account_number:"",
    branch_name:"",
    IFSC_code:"",
    upi_provider:"",
    upi_full_name:"",
    upi_mobile:"",
    user_bank_id : "",
    getbankDetails :[],
    getUpiDetails :[],
    BankUpdateBtn:false,
    UpiUpdateBtn:false,
    loading : false,
    input_error : {
        input_error_bank_full_name : "",
        input_error_bank_name : "",
        input_error_account_number : "",
        input_error_branch_name : "",
        input_error_IFSC_code : "",
        input_error_upi_provider : "",
        input_error_upi_full_name : "",
        input_error_upi_mobile : "",
      },

}

componentDidMount=()=>{
  if(navigator.onLine){
    this.setState({
      loading : true
    })
    const obj={
      userId:user.id
    }
    Services.getInstance().getSpBankDetails(obj).then((result)=>{
      this.setState({
        loading : false
      })
      if(result.details && result.details.length > 0){
        this.setState({
          getbankDetails : result.details,
          bank_full_name : result.details[0].fullName,
          bank_name : result.details[0].bankName,
          account_number : result.details[0].accNumber,
          branch_name : result.details[0].branchName,
          IFSC_code : result.details[0].ifscCode,
          user_bank_id : result.details[0].id
      },()=>{console.log(this.state)})
      document.getElementById("i2").style.display="block";
      document.getElementById("i1").style.display="none";
      document.getElementById("i3").style.display="none";
      document.getElementById("i4").style.display="none";
      }
      else{
      document.getElementById("i2").style.display="none";
      document.getElementById("i1").style.display="block";
      document.getElementById("i3").style.display="none";
      document.getElementById("i4").style.display="none";
      }
    })
  }
  else{
    this.props.history.push({
      pathname : "/internet"
    })
  }
}


handleChange = e=>{
    const {name,value}= e.target;
    this.setState({
      [name]:value
    }
     ,()=>{
      console.log(this.state)
    }
    );
  }

  UpdateDetails=(update)=>{
    if(update=="bankUpdate"){
      document.getElementById("i1").style.display="block";
      document.getElementById("i2").style.display="none";
      document.getElementById("i3").style.display="none";
      document.getElementById("i4").style.display="none";
      this.setState({
        BankUpdateBtn:true,
      }
      )
      
    }else if(update=="upiUpdate"){
      document.getElementById("i3").style.display="block";
      document.getElementById("i2").style.display="none";
      document.getElementById("i1").style.display="none";
      document.getElementById("i4").style.display="none";
      this.setState({
        UpiUpdateBtn : true,
      })
     
    }
  
  }


Changetabs=(tab)=>{

    if(tab=="bank"){
      document.getElementById("bnk-active").classList.add("active");
      document.getElementById("upi-active").classList.remove("active");
      const obj={
        userId:user.id
    }
    Services.getInstance().getSpBankDetails(obj).then((result)=>{
      if(result.details && result.details.length > 0){
        this.setState({
          getbankDetails : result.details,
          bank_full_name : result.details[0].fullName,
          bank_name : result.details[0].bankName,
          account_number : result.details[0].accNumber,
          branch_name : result.details[0].branchName,
          IFSC_code : result.details[0].ifscCode,
          user_bank_id : result.details[0].id
      })
      
      document.getElementById("i2").style.display="block";
      document.getElementById("i1").style.display="none";
      document.getElementById("i3").style.display="none";
      document.getElementById("i4").style.display="none";
      }
      else{
      document.getElementById("i2").style.display="none";
      document.getElementById("i1").style.display="block";
      document.getElementById("i3").style.display="none";
      document.getElementById("i4").style.display="none";
      }
    }) 
    }
    else if(tab=="upi"){
      document.getElementById("bnk-active").classList.remove("active");
      document.getElementById("upi-active").classList.add("active");
      const obj1={
        userId:user.id
    }
    Services.getInstance().getSpUpiDetails(obj1).then((result)=>{
      
      if(result.details && result.details.length> 0){
        this.setState({
          getUpiDetails  : result.details,
          upi_full_name : result.details[0].fullName,
          upi_provider : result.details[0].provider,
          upi_mobile : result.details[0].mNumber,
          user_bank_id : result.details[0].id
      })

      document.getElementById("i4").style.display="block";
      document.getElementById("i3").style.display="none";
      document.getElementById("i1").style.display="none";
      document.getElementById("i2").style.display="none";
      }else{
      document.getElementById("i4").style.display="none";
      document.getElementById("i3").style.display="block";
      document.getElementById("i1").style.display="none";
      document.getElementById("i2").style.display="none";
      }
       
    })
    }else{
     
    }

}

BankSubmit=()=>{
    this.validateForm();
}


validateForm=()=>{
    if(this.state.bank_full_name== "" ){
        this.setState({
          input_error : {
            bank_full_name : "Please Enter Your FullName"
          }
        })
      }
      else if(this.state.bank_name==""){
        this.setState({
            input_error : {
              bank_name : "Please Enter BankName"
            }
          })
      }
      
      else if(this.state.account_number==""){
        this.setState({
            input_error : {
              account_number : "Please Enter Account Number"
            }
          })
      }
      else if(this.state.branch_name==""){
        this.setState({
            input_error : {
              branch_name : "Please Enter BranchName"
            }
          })
      }
      else if(this.state.IFSC_code==""){
        this.setState({
            input_error : {
              IFSC_code : "Please Enter IFSC code"
            }
          })
      }
      else{
        if(this.state.BankUpdateBtn == false){
          const obj={
            userId : user.id,
            fullName : this.state.bank_full_name,
            bankName: this.state.bank_name,
            accNumber: this.state.account_number,
            branchName: this.state.branch_name,
            ifscCode: this.state.IFSC_code
        }
        console.log(obj);
        Services.getInstance().createSpBankDetails(obj).then((result)=>{
            window.location.reload();
          })
        }
        else{
          const obj={
            userId : user.id,
            bankId : this.state.user_bank_id,
            fullName: this.state.bank_full_name,
            provider: this.state.bank_name,
            mNumber: this.state.account_number,
            branchName: this.state.branch_name,
            ifscCode: this.state.IFSC_code
        }

        console.log(obj);
        Services.getInstance().updateSpBankDetails(obj).then((result)=>{
          window.location.reload();
        })
        }

      }
    }

UpiSubmit=()=>{
    this.validateUpiForm();
}

validateUpiForm=()=>{
    if(this.state.upi_full_name== "" ){
        this.setState({
          input_error : {
            upi_full_name : "Please Enter Your FullName"
          }
        })
      }
      else if(this.state.upi_provider== "" ){
        this.setState({
          input_error : {
            upi_provider : "Please Select UPI Provider"
          }
        })
      }
      else if(this.state.upi_mobile== "" ){
        this.setState({
          input_error : {
            upi_mobile : "Please Enter UPI ID/Mobile Number"
          }
        })
      }
      else{
        if(this.state.UpiUpdateBtn==false){
          const obj={
            userId : user.id,
            fullName: this.state.upi_full_name,
            provider: this.state.upi_provider,
            mNumber: this.state.upi_mobile
        }
        console.log(obj);
        Services.getInstance().createSpUpiDetails(obj).then((result)=>{
          window.location.reload();
          })
        }
        else{
        const obj1={
          userId : user.id,
          bankId : this.state.user_bank_id,
          fullName: this.state.upi_full_name,
          provider: this.state.upi_provider,
          mNumber: this.state.upi_mobile
        }
        Services.getInstance().updateSpUpiDetails(obj1).then((result)=>{
          window.location.reload();
        })
        }           
      }
}


goBack = () =>{
  this.props.history.push({
    pathname : "/home"
  })
}



render() {
return (
  
     <div id="wrapper">
 
 <div class="srvc-dtls ab">
   
   <div class="srvc-dtls-hd">
     <h4>Add New Account</h4>
     <div class="srvc-dtls-bck" onClick={this.goBack}>
       <img src="srvc-dtls-bck-icon.png" />
     </div>
   </div>

   <div class="ab-main">
     


     <div class="ab-tabs">
       <ul id="ab-tabs-nav">
         <li className='active' id='bnk-active'>
           <a onClick={()=>this.Changetabs("bank")}>
             <div class="bnk-item">
               <div class="bnk-view">
                 <img src="bank-icon.png" />
               </div>
               <p>Bank</p>
             </div>
           </a>
         </li>
         <li id='upi-active'>
           <a onClick={()=>this.Changetabs("upi")}>
             <div class="bnk-item">
               <div class="bnk-view">
                 <img src="upi-icon.png" />
               </div>
               <p>UPI</p>
             </div>
           </a>
         </li>
       </ul>
       <div id="ab-tabs-content">
         <div  class="ab-tab-content" >
          <div id="i1" style={{display:'block'}}>
           <div class="d-form">
             <h4>Add Your Bank Details</h4>

             <div class="d-form-dtls">
               
               <div class="frm-item">
                 <label>Full Name</label>
                 <input 
                 type="text" 
                 name="bank_full_name" 
                 placeholder="Enter Full Name"
                 value={this.state.bank_full_name}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.bank_full_name}</div>

               <div class="frm-item">
                 <label>Bank Name</label>
                 <input 
                 type="text" 
                 name="bank_name" 
                 placeholder="State Bank of India"
                 value={this.state.bank_name}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.bank_name}</div>

               <div class="frm-item">
                 <label>Account Number</label>
                 <input 
                 type="number" 
                 name="account_number" 
                 placeholder="Enter Account Number"
                 value={this.state.account_number}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.account_number}</div>

               <div class="frm-item">
                 <label>Branch Name</label>
                 <input 
                 type="text" 
                 name="branch_name" 
                 placeholder="Enter Branch Name"
                 value={this.state.branch_name}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.branch_name}</div>

               <div class="frm-item">
                 <label>IFSC Code</label>
                 <input 
                 type="text" 
                 name="IFSC_code" 
                 placeholder="Enter IFSC Code"
                 value={this.state.IFSC_code}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.IFSC_code}</div>


               <div class="submit-button">
                 <button class="go-nxt" onClick={this.BankSubmit}>Submit</button>
               </div>

             </div>

             </div>
             </div>

             <div class="ab-adrs-dtls" id='i2' style={{display :"block"}}>
               <h4>Bank Details</h4>

               {this.state.getbankDetails && this.state.getbankDetails.length>0 ? this.state.getbankDetails.map((details,index)=>{
                return(
                  <div class="ab-adrs" key={index} >
                  <span onClick={()=>this.UpdateDetails("bankUpdate")}><img src="edit-t-icon.png"/></span>
                  <p>Full Name : <b>{details.fullName}</b></p>
                  <p>Bank Name : <b>{details.bankName}</b></p>
                  <p>Account No : <b>{details.accNumber}</b></p>
                  <p>Branch Name :  <b>{details.branchName}</b></p>
                  <p>IFSC Code :<b>{details.ifscCode}</b></p>
                </div>
                )
              
                }):""} 

               

             </div>

           

         </div>
         <div  class="ab-tab-content" >
           <div id="i3" style={{display:'none'}}>
           <div class="d-form">
             <h4>Add Your UPI Details</h4>

             <div class="d-form-dtls">
              
               <div class="frm-item">
                 <label>Full Name</label>
                 <input 
                 type="text" 
                 name="upi_full_name" 
                 placeholder="Enter Full Name"
                 value={this.state.upi_full_name}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.upi_full_name}</div>

               <div class="frm-item">
                 <label>UPI Provider</label>
                 <select onChange={this.handleChange} name='upi_provider'>
                 <option value="">Select</option>
                  {this.state.upi_provider == "Phone Pe" ? <option value="Phone Pe" selected>Phone Pe</option> : <option value="Phone Pe">Phone Pe</option>}
                  {this.state.upi_provider == "Gpay" ? <option value="Gpay" selected>Gpay</option> : <option value="Gpay">Gpay</option>}
                  {this.state.upi_provider == "Paytm" ? <option value="Paytm" selected>Paytm</option> : <option value="Paytm">Paytm</option>}
                 </select>
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.upi_provider}</div>

               <div class="frm-item">
                 <label>UPI ID/Mobile Number</label>
                 <input 
                 type="text" 
                 name="upi_mobile" 
                 placeholder="jayanta.infasta@oksbi"
                 value={this.state.upi_mobile}
                 onChange={this.handleChange}
                 />
               </div>
               <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.upi_mobile}</div>


               <div class="submit-button">
                 <button class="go-nxt" onClick={this.UpiSubmit}>Submit</button>
               </div>

             </div>
             </div>
             </div>

             <div class="ab-adrs-dtls" id='i4' style={{display :"none"}}>
               <h4>UPI Details</h4>

               {this.state.getUpiDetails && this.state.getUpiDetails.length>0 ? this.state.getUpiDetails.map((detailsUpi,index)=>{
                return(
               <div class="ab-adrs" key={index} >
                 <span onClick={()=>this.UpdateDetails("upiUpdate")}><img src="edit-t-icon.png"/></span>
                 <p>Full Name : <b>{detailsUpi.fullName}</b></p>
                 <p>UPI Provider : <b>{detailsUpi.provider}</b></p>
                 <p>UPI ID : <b>{detailsUpi.mNumber}</b></p>
               </div>
                 )
              
                }):""} 
            
             
           </div>
         </div>
       </div>
     </div> 
   </div>
 </div>
  <DarkBackground disappear={this.state.loading}>
              <LoadingOverlay
                active={true}
                spinner={true}
                text="Please Wait..."
              >
              </LoadingOverlay>
            </DarkBackground> 
    </div>
  )
}
}

export default BankDetails