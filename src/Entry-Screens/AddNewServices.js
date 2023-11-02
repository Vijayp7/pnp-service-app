import React, { Component } from 'react'
import './AddNewServices.css'
import Services from '../Services/Services';
import AddServiceSuccess from './AddServiceSuccess';


const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class AddNewServices extends Component {

    constructor (props){
        super(props);
    }
    state = {
        services : [],
        new_services : "",
        final_services : [],
        success_popup : false,
        count_selected : 0,
    }


    componentDidMount = () =>{
        if(navigator.onLine){
            const obj = {
                spId: user.id
            }
            Services.getInstance().ListofServices(obj).then((result)=>{
                console.log(result);
                let x = result.map((newR)=>{
                    newR.clicks = 0;
                    if(newR.select == "true"){
                        // this.setState({
                        //     new_services : [...this.state.new_services, newR.id],
                        // }, console.log(this.state.new_services))
                        this.state.final_services.push(newR.id);

                    }
                    return newR;
                })
                this.setState({
                    services : x
                })
            })
        }
        else{
            this.props.history.push({
                pathname : "/internet"
              })
        }
    }


    Select = (id, clicks) =>{
        if(clicks%2 == 0){
            document.getElementById(id).classList.add("active");
            let Z = this.state.services.map((X)=>{
                if(X.id == id){
                    X.clicks = X.clicks + 1; 
                    return X;
                }
                else{
                    return X;
                }
            })
            this.state.final_services.push(id);
            this.setState({
                count_selected : this.state.count_selected + 1,
            })
            // this.setState({
            //     new_services : [...this.state.new_services, id],
            //     services : Z
            // }, ()=>{

            // })

            
        }
        else{
            document.getElementById(id).classList.remove("active");
            let Z = this.state.services.map((X)=>{
                if(X.id == id){
                    X.clicks = X.clicks - 1;
                    this.state.final_services = this.state.final_services.filter(function (letter) {
                        return letter !== id;
                    });
                    return X;
                }
                else{
                    return X;
                }
            })
            this.setState({
                count_selected : this.state.count_selected - 1,
            })

        }
        
    }



    submit = (arr) =>{
        this.state.final_services = arr.filter((item,index) => arr.indexOf(item) === index);

        function removeDuplicates(arr) {
            return arr.filter((item,index) => arr.indexOf(item) === index);
        }


        if(this.state.count_selected == 0){
            this.setState({
                error_message : "Please select any service"
            })  
        }

        else if(this.state.final_services.length <= 3){
            const obj = {
                spId: user.id,
                services: removeDuplicates(this.state.final_services).join()
            }
            console.log(obj);
            Services.getInstance().AddServices(obj).then((result)=>{
                this.setState({
                    success_popup : true,
                })
            })
        }
        else{
            this.setState({
                error_message : "You cannot add more than 3 services"
            })
        }
        
    }




  render() {
    console.log(this.state.final_services)
    return (
        <div id="wrapper">  
            <div class="ad-srvc-main" id='popup' style={{display : "block"}}>
                {/* <div class="dwn-flow"> */}
            {/* </div> */}
            <img src='add-new.png' className='add-new-img'/>
            <h4>Add Service</h4>
            <div class="quotation-n-list">
                {this.state.services && this.state.services.length > 0 ? this.state.services.map((ser,index)=>{
                    return(
                        <div key={index}>
                        {ser.select == "true" ? "" : 
                            <div id={ser.id} class="quotation-n-item" onClick={()=>this.Select(ser.id, ser.clicks)}>
                            <p>{ser.name}</p>
                            </div>
                        }
                        </div>
                    )
                }) : "No services are found"}

            </div>
            <p style={{margin:"0 auto", textAlign:"center", color:"red"}}>{this.state.error_message}</p>
            <button class="qntn-resend" onClick={()=>this.submit(this.state.final_services)}>Submit</button>
            <button class="cncl-btn-m" onClick={this.props.closePopUp}>Close</button>

            {this.state.success_popup ? 
            <AddServiceSuccess />
            : ""}
            </div>



      </div>
    )
  }
}

export default AddNewServices