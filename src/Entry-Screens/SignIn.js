import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from './LoadingSymbol';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 



var validRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export class SignIn extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
      f_name: "",
      l_name :"",
      email: "",
      phone: "",
      password: "",
      loading: false,
      errorMessage: "",
      error_f_name: "",
      error_l_name: "",
      error_email: "",
      error_phone: "",
      error_password: "",
    
      };
    }



    componentDidMount = () =>{
      if(navigator.onLine){
        document.querySelectorAll('input[type="number"]').forEach(input =>{
          input.oninput=()=>{
            if(input.value.length > input.maxLength) input.value=input.value.slice(0,input.maxLength)
          };
        });
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, 
          // () => console.log(this.state)
          ()=>{
            if(this.state.phone == null){
              //nothing
            }
            else{
              if(this.state.phone.length > 10){
                this.setState({
                  error_phone : "Invalid phone number"
                })
              }
              else{
                this.setState({
                  error_phone : ""
                })
              }
            }
          }
        );
      };
      
      newRegistration = () =>{
        this.setState({
          loading: true,
        })
      
        if(this.state.f_name == ""){
          this.setState({
            error_f_name : "First name is required",
            loading: false,
            error_l_name: "",
            error_email: "",
            error_phone: "",
            error_password: "",
          })
        }
        else if(this.state.l_name == ""){
          this.setState({
            error_l_name : "Last name is required",
            loading: false,
            error_f_name: "",
            error_email: "",
            error_phone: "",
            error_password: "",
          })
        }
        // else if(this.state.email == ""){
        //   this.setState({
        //     error_email : "Email is required",
        //     loading: false,
        //     error_f_name: "",
        //     error_l_name: "",
        //     error_phone: "",
        //     error_password: "",
        //   })
        // }
        // else if(!this.state.email.match(validRegex)){
        //   this.setState({
        //     error_email : "Invalid email id",
        //     loading: false,
        //     error_f_name: "",
        //     error_l_name: "",
        //     error_phone: "",
        //     error_password: "",
        //   })
        // }
        else if(this.state.phone == ""){
          this.setState({
            error_phone : "Phone number is required",
            loading: false,
            error_f_name: "",
            error_l_name: "",
            error_email: "",
            error_password: "",
          })
        }
        else if(this.state.phone.length < 10){
          this.setState({
            error_phone : "Phone number is incorrect",
            loading: false,
            error_f_name: "",
            error_l_name: "",
            error_email: "",
            error_password: "",
          })
        }
        else if(this.state.phone.length > 10){
          this.setState({
            error_phone : "Phone number is incorrect",
            loading: false,
            error_f_name: "",
            error_l_name: "",
            error_email: "",
            error_password: "",
          })
        }
        else if(this.state.password == ""){
          this.setState({
            error_password : "Password is required",
            loading: false,
            error_f_name: "",
            error_l_name: "",
            error_email: "",
            error_phone: "",
          })
        }
        
        else {
          this.setState({
            error_name : "",
          })
            const obj = {
              first_name: this.state.f_name,
              last_name : this.state.l_name,
              email: this.state.email,
              phone: this.state.phone,
              password: this.state.password,
            }
            Services.getInstance().newRegistration(obj).then((result)=>{
              console.log(result);
              if(result.status === true) {
                this.setState({
                  loading: false,
                })
                this.props.history.push({
                  pathname: '/otppage',
                  data: result.results,
                  })
              }
              else if(result.status === false){
                this.setState({
                  loading: false,
                  errorMessage : result.msg
                })                
              }
            })
          }      
      }
      
    

    Login = () =>{
        this.props.history.push({
            pathname: '/login'
        })
    }
  render() {
    return (
        <div class="sign-in-pnp">
        <div class="sign-in-head">
          <a onClick={this.Login}><img src="left-arrow.png" alt="arrow" /></a>
        </div> 
        <div class="sign-in-pnp-info">
          <img src="sign-p.png" alt="img" />
          <h3>Getting Started</h3>
          <p>Create an account to continue</p>
        </div> 
        { this.state.loading === true ? <LoadingSymbol /> : "" } 
        <div class="sign-in-inputs">
          <div class="sign-in-inputs-left">
            <input 
                type="text" 
                placeholder="First Name*"
                name='f_name'
                onChange={this.handleChange} 
                />
            <p style={{margin: '0px', color: 'red', fontSize: '14px', bottom: '3px', marginLeft: "15px", textAlign : "start"}}>{this.state.error_f_name}</p>
            <input 
                type="text" 
                placeholder="Last Name*"
                name='l_name'
                onChange={this.handleChange} 
                />
            <p style={{margin: '0px', color: 'red', fontSize: '14px', bottom: '3px', marginLeft: "15px", textAlign : "start"}}>{this.state.error_l_name}</p>
            <input 
                type="email"
                placeholder="Email Address*"
                name='email'
                onChange={this.handleChange}  
                />
            <p style={{margin: '0px', color: 'red', fontSize: '14px', bottom: '3px', marginLeft: "15px", textAlign : "start"}}>{this.state.error_email}</p>
               
            <input 
                type="number" 
                placeholder="Phone Number*"
                name='phone'
                min='0'
                max='3'
                maxLength='10'
                onChange={this.handleChange}
                />
            <p style={{margin: '0px', color: 'red', fontSize: '14px', bottom: '3px', marginLeft: "15px", textAlign : "start"}}>{this.state.error_phone}</p>

            <input 
                type="password" 
                placeholder="Password*"
                name='password'
                onChange={this.handleChange} 
                />
            <p style={{margin: '0px', color: 'red', fontSize: '14px', bottom: '3px', marginLeft: "15px", textAlign : "start"}}>{this.state.error_password}</p>
          </div>
          <p style={{margin: '10px', color: 'red'}}>{this.state.errorMessage}</p>
          <button onClick={this.newRegistration}>Sign Up</button>
          <p>Already have an account? <a onClick={this.Login}>Sign in</a> </p>
        </div>
        <div class="sign-in-btm">
        </div>
      </div>
    )
  }
}

export default SignIn