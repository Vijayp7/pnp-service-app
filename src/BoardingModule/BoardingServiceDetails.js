import React, { Component } from 'react'
import Services from '../Services/Services';
import BoardingServiceCostPreview from './BoardingServiceCostPreview';
import LoadingSymbol from '../Entry-Screens/LoadingSymbol';
import './BoardingServiceDetails.css';


const userData = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class BoardingServiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service_includes: [],
      price_details: [],
      add_on: [],
      veg_food_items: [],
      nonVeg_food_items: [],
      food_price_twice_a_day: "",
      summmary_page_status: false,
      loading: false,
      dummy_Price_Array: [],
      dummy_AddOns_Array: [],
      food_dummy_array: [],
      boarding_summary_preview_obj: {},
      final_food_type: "",
      final_food_type_2: "",
      boarding_type: "Home",
      boarding_price_details: [],
      boarding_add_ons: [],
      boarding_food_price: [],
      service_type : this.props.location.service_type,
    }
  }

  handleChange = (e)=>{
    e.preventDefault();
    const {name, value} = e.target;
    this.setState({
      [name]: value
    }, ()=>console.log(this.state))
  }

goBack = () =>{
    this.props.history.push({
        pathname: "/primary-profile-data"
    })
}

componentDidMount = ()=>{
  Services.getInstance().getBoarding_Price_Details().then((result)=>{
    if(result.status === true) {
      this.setState({
        price_details: result.data
      })
    }
  })

  Services.getInstance().getBoarding_Add_Ons_Details().then((result)=>{
    if(result.status === true){
      this.setState({
        add_on: result.data
      })
    }
  })

  //////////
  const vegobj = {
    id: 1
  }
  console.log(vegobj)
  Services.getInstance().getBoarding_Food_Types(vegobj).then((result)=>{
      if(result.status === true){
        this.setState({
        veg_food_items: result.data
      })
    } 
  })
///////////
  const Nonvegobj = {
    id: 2
  }
  Services.getInstance().getBoarding_Food_Types(Nonvegobj).then((result)=>{
      if(result.status === true){
        this.setState({
        nonVeg_food_items: result.data
      })
    } 
  })


}

ModifyServicePrice = (fullPricesList, type, id) =>{
  console.log(fullPricesList)
  for(let index=0; index<fullPricesList.length; index++){
    if(type == "increase" && id === fullPricesList[index].id){
      if(((Number(fullPricesList[index].price)) + (Number(fullPricesList[index].min_cost))) < Number(fullPricesList[index].max_cost)){
        fullPricesList[index].price = (Number(fullPricesList[index].price) + 5);
        this.setState({
          price_details: fullPricesList,
        })
      }
      else{
        //Alterts Can Be Added here when price reaches the Maximum cost
      }
      
    }
    else if(type == "decrease" && id === fullPricesList[index].id){
      if(((Number(fullPricesList[index].price)) + (Number(fullPricesList[index].min_cost))) > Number(fullPricesList[index].min_cost)){
         fullPricesList[index].price = (Number(fullPricesList[index].price) - 5);
        this.setState({
          price_details: fullPricesList,
        })
      }
      else{
        //Alterts Can Be Added here when price reaches the Minimum cost
      }
    }

    else{
      //Final Else Condition
    }
  }
}

// checkBoxClicked = (fullPriceArray, checkId, className) =>{
//   if(document.getElementById(className).checked)
//     {
//       for(let i = 0 ; i<fullPriceArray.length; i++) {
//           if(fullPriceArray[i].id === checkId) {      
//           this.state.dummy_Price_Array.push(fullPriceArray[i]); 
//       }
//     }
    
//     }
// else if(!(document.getElementById(className).checked)) {     
//       for(let i = 0 ; i<this.state.dummy_Price_Array.length; i++) {
//         if(this.state.dummy_Price_Array[i].id === checkId) {
//           this.state.dummy_Price_Array.splice(i,1)
//         }       
//       }
//     }
//     console.log(this.state.dummy_Price_Array)
// }

checkBoxClicked = (fullPriceobject) =>{
  this.state.dummy_Price_Array = [];
  this.state.dummy_Price_Array.push(fullPriceobject);
  console.log(this.state.dummy_Price_Array)
}

selectedAddOns = (fullAddOnsArray, checkId, className)=>{
  if(document.getElementById(className).checked)
  {
    for(let i = 0 ; i<fullAddOnsArray.length; i++) {
        if(fullAddOnsArray[i].id === checkId) {      
        this.state.dummy_AddOns_Array.push(fullAddOnsArray[i]);
    }
  }
  }
else if(!(document.getElementById(className).checked)) {    
    for(let i = 0 ; i<this.state.dummy_AddOns_Array.length; i++) {
      if(this.state.dummy_AddOns_Array[i].id === checkId) {
        this.state.dummy_AddOns_Array.splice(i,1)
      }       
    }
  }
  console.log(this.state.dummy_AddOns_Array)
}


ModifyAddOnsPrice = (fullPricesList, type, id) =>{
  console.log(fullPricesList)
  for(let index=0; index<fullPricesList.length; index++){
    if(type == "increase" && id === fullPricesList[index].id){
      if(((Number(fullPricesList[index].price)) + (Number(fullPricesList[index].min_cost))) < Number(fullPricesList[index].max_cost)){
        fullPricesList[index].price = (Number(fullPricesList[index].price) + 5);
        this.setState({
          add_on: fullPricesList,
        })
      }
      else{
        //Alterts Can Be Added here when price reaches the Maximum cost
      }
      
    }
    else if(type == "decrease" && id === fullPricesList[index].id){
      if(((Number(fullPricesList[index].price)) + (Number(fullPricesList[index].min_cost))) > Number(fullPricesList[index].min_cost)){
         fullPricesList[index].price = (Number(fullPricesList[index].price) - 5);
        this.setState({
          add_on: fullPricesList,
        })
      }
      else{
        //Alterts Can Be Added here when price reaches the Minimum cost
      }
    }

    else{
      //Final Else Condition
    }
  }
  
}

FoodType = (foodType) =>{
  if(this.state.final_food_type == ""){
      this.setState({
      final_food_type: foodType
      })
      if(foodType == "1") {
      const vegObj = {
        id: 1
      }
      Services.getInstance().getBoarding_Food_Prices(vegObj).then((result)=>{
        console.log(result)
        if(result.status === true){
          this.setState({
            food_dummy_array: result.data
          })
        }
      })
    }
  }
  else{
    this.setState({
      final_food_type: ""
    })
    const nonVegObj = {
      id: 2
    }
    Services.getInstance().getBoarding_Food_Prices(nonVegObj).then((result)=>{
      if(result.status === true){
        this.setState({
          food_dummy_array: result.data
        })
      }
    })
  }
  

  
}

FoodType_2 = (foodType) =>{
  if(this.state.final_food_type_2 == ""){
    this.setState({
    final_food_type_2: foodType
    })
    if(foodType == "2"){
      const nonVegObj = {
        id: 2
      }
      Services.getInstance().getBoarding_Food_Prices(nonVegObj).then((result)=>{
        if(result.status === true){
          this.setState({
            food_dummy_array: result.data
          })
        }
      })
    }
  }
  else{
    this.setState({
      final_food_type_2: ""
      })
      const vegObj = {
        id: 1
      }
      Services.getInstance().getBoarding_Food_Prices(vegObj).then((result)=>{
        console.log(result)
        if(result.status === true){
          this.setState({
            food_dummy_array: result.data
          })
        }
      })
  }
  
  
}
 
ModifyFoodPrice = (fullPricesList, type, id) =>{
  console.log(fullPricesList)
  for(let index=0; index<fullPricesList.length; index++){
    if(type == "increase" && id === fullPricesList[index].id){
      if(((Number(fullPricesList[index].price)) + (Number(fullPricesList[index].min_cost))) < Number(fullPricesList[index].max_cost)){
        fullPricesList[index].price = (Number(fullPricesList[index].price) + 5);
        this.setState({
          food_dummy_array: fullPricesList,
        })
      }
      else{
        //Alterts Can Be Added here when price reaches the Maximum cost
      }
      
    }
    else if(type == "decrease" && id === fullPricesList[index].id){
      if(((Number(fullPricesList[index].price)) + (Number(fullPricesList[index].min_cost))) > Number(fullPricesList[index].min_cost)){
         fullPricesList[index].price = (Number(fullPricesList[index].price) - 5);
        this.setState({
          food_dummy_array: fullPricesList,
        })
      }
      else{
        //Alterts Can Be Added here when price reaches the Minimum cost
      }
    }

    else{
      //Final Else Condition
    }
  }
}

serviceCostPreview = () =>{
  let final_Price_Array = [];
  let final_Add_Ons_Array = [];
  let final_food_Array = [];
  this.setState({
    loading: true,
  })
 
  for(let index=0; index<this.state.dummy_Price_Array.length; index++){
    final_Price_Array.push({
      name: this.state.dummy_Price_Array[index].name,
      id: this.state.dummy_Price_Array[index].id,
      price: String((Number(this.state.dummy_Price_Array[index].min_cost)) + (Number(this.state.dummy_Price_Array[index].price))),
    })
  }

  for(let index=0; index<this.state.dummy_AddOns_Array.length; index++){
    final_Add_Ons_Array.push({
      name: this.state.dummy_AddOns_Array[index].name,
      id: this.state.dummy_AddOns_Array[index].id,
      price: String((Number(this.state.dummy_AddOns_Array[index].min_cost)) + (Number(this.state.dummy_AddOns_Array[index].price))),
    })
  }

  for(let index=0; index<this.state.food_dummy_array.length; index++){
    if(this.state.final_food_type == "1"){
      if(this.state.final_food_type_2 == "2"){
        final_food_Array.push({
          name: "Veg",
          id: "1",
          price: String((Number(this.state.food_dummy_array[index].min_cost)) + (Number(this.state.food_dummy_array[index].price))),
          })
        final_food_Array.push({
          name: "Non-Veg",
          id: "2",
          price: String((Number(this.state.food_dummy_array[index].min_cost)) + (Number(this.state.food_dummy_array[index].price))),
          })
      }
      else{
        final_food_Array.push({
          name: this.state.food_dummy_array[index].name,
          id: this.state.food_dummy_array[index].id,
          price: String((Number(this.state.food_dummy_array[index].min_cost)) + (Number(this.state.food_dummy_array[index].price))),
        }) 
      }
      
    }
    else if(this.state.final_food_type_2 == "2") {
      final_food_Array.push({
        name: this.state.food_dummy_array[index].name,
        id: this.state.food_dummy_array[index].id,
        price: String((Number(this.state.food_dummy_array[index].min_cost)) + (Number(this.state.food_dummy_array[index].price))),
      }) 
    }
        
}
 
  const obj = {
    id: userData.id,
    boarding_type: this.state.boarding_type,
    bording: final_Price_Array,
    addon: final_Add_Ons_Array,
    food: final_food_Array
  }

  Services.getInstance().getBoarding_ServiceCost_Preview(obj).then((result)=>{
    console.log(result);
    if(result.status === true){
      this.setState({
        boarding_summary_preview_obj: result,
        summmary_page_status: true,
        loading: false
      })
    }
    else{
      this.setState({
        summmary_page_status: false,
        loading: false
      })
    }
  })
  
}

closePopUp = () =>{
  this.setState({
    summmary_page_status: false,
  })
}

moveToHomePage = () =>{
  this.props.history.push({
    pathname: "/home"
  })
}

  render() {
    return (
        <div class="srvc-dtls-pnp">
        <div class="srvc-dtls-header" style={{backgroundColor: (this.state.summmary_page_status === true) ? "rgba(0,0,0, 0.5)" : "#9dce76", opacity: (this.state.summmary_page_status === true) ? "0.2" : "1"}}>
          <a onClick={this.goBack}><img src="left-arrow.png" alt="arrow" /></a>
          <span>Service Details</span>
          <p style={{margin:"0 auto",textAlign:"center",color:"#fff",fontSize:"14px"}}>Select the Services You Offer</p>
        </div>
        <div class="srvc-dtls-view" style={{opacity: (this.state.summmary_page_status === true) ? "0.2" : "1"}} >
          <div class="srvc-dtls-title">
            <h5>Boarding Service Details</h5>
          </div>
          <div class="srvc-brdng">
            <p>Service Type</p>
            <div class="b-type">
              <select onChange={this.handleChange} name="boarding_type">
                <option value="Home"> Home </option>
                <option value="Kennel"> Kennel </option>
              </select>
            </div>
          </div>
           <h5>Service Includes</h5>

                <div class="brdng-srvc-inclds">
                  <div class="brdng-srvc-inclds-item" id='walking' onClick={()=>this.ServicesInclude("walking")}>
                    <div class="brdng-srvc-inclds-item-img">
                      <img src="brdng_wlkng_icon.png" />
                    </div>
                    <span>Walking</span>
                  </div>
                  <div class="brdng-srvc-inclds-item" id='combing' onClick={()=>this.ServicesInclude("combing")}>
                    <div class="brdng-srvc-inclds-item-img">
                      <img src="brdng_cmbng_icon.png" />
                    </div>
                    <span>Combing</span>
                  </div>
                </div>



              <h5>Add-ons</h5>
              <div class="add_on_lst_item">
                <div class="add_on_lst_img">
                  <img src="p_d_icon.png" />
                </div>
                <span>Pick & Drop</span>
                <div class="chk-item">
                  <input 
                   type="checkbox" 
                   id="chk1"
                   />
                  <label for="chk1"></label>
                </div>
              </div>

              <div class="add_on_lst_item">
                <div class="add_on_lst_img">
                  <img src="tick_bath_icon.png" />
                </div>
                <span>Tick Bath</span>
                <div class="chk-item">
                  <input type="checkbox" id="chk2" />
                  <label for="chk2"></label>
                </div>
              </div>

              <div class="add_on_lst_item">
                <div class="add_on_lst_img">
                  <img src="shampoo_bath_icon.png" />
                </div>
                <span>Shampoo Bath</span>
                <div class="chk-item">
                  <input type="checkbox" id="chk3" />
                  <label for="chk3"></label>
                </div>
              </div>

              <div class="add_on_lst_item">
                <div class="add_on_lst_img">
                  <img src="ac_brdng_icon.png" />
                </div>
                <span>AC</span>
                <div class="chk-item">
                  <input type="checkbox" 
                   id="chk4"
                    />
                  <label for="chk4"></label>
                </div>
              </div>

          <div class="srvc-food">
            <div class="srvc-food-hdng">
              <h5>Food</h5>
            </div>
              {this.state.food_dummy_array && this.state.food_dummy_array.length>=0 ? this.state.food_dummy_array.map((foodPrice,index)=>{
                return(
                <div class="srvc-food-day" key={index}>
                  <p>2 times/day</p>
                  <div class="q-incmnt" style={{display:"none"}}>
                    <button class="dcrmnt"><i class="fa-solid fa-minus" onClick={()=>this.ModifyFoodPrice(this.state.food_dummy_array, "decrease", foodPrice.id)}></i></button>
                    <p>{(Number(foodPrice.price) + Number(foodPrice.min_cost))}</p>
                    <button class="incrmnt"><i class="fa-solid fa-plus" onClick={()=>this.ModifyFoodPrice(this.state.food_dummy_array, "increase", foodPrice.id)}></i></button>
                  </div>
                </div>
                )
              }) : ""}
            

            <div class="food-list">
            <div class="food-item-sec" onClick={()=> this.FoodType("1")} style={{border: (this.state.final_food_type == "1") ? "2px solid #9dce76" : ""}} >
                <div class="actv-crl">
                  <img src="active-circle.png" alt="" />
                </div>
                <div class="inactv-crl" style={{display: (this.state.final_food_type == "1") ? "none" : "block"}}>
                  <img src="inactive-circle.png" alt="" />
                </div>
                <div class="food-item">
                  <div class="food-item-lft">
                    <img src="veg-icon.png" alt="" />
                  </div>
                  <div class="food-item-rht">
                    <p>Veg Food</p>
                  </div>
                </div>
                <div class="food-menu">
                <ul>
                  {this.state.veg_food_items && this.state.veg_food_items.length>0 ? this.state.veg_food_items.map((foodArray, index)=>{
                    return(
                      
                      <li key={index}>
                        <div class="food-dots" style={{background: (this.state.final_food_type == "1") ? "#9dce76" : ""}}>
                        </div>
                        <p>{foodArray.name}</p>
                      </li>      
                    )
                  }) : ""}
                </ul>
                </div>
              </div>
              <div class="food-item-sec" onClick={()=> this.FoodType_2("2")} style={{border: (this.state.final_food_type_2 == "2") ? "2px solid #9dce76" : ""}}>
                <div class="actv-crl">
                  <img src="active-circle.png" alt="" />
                </div>
                <div class="inactv-crl" style={{display: (this.state.final_food_type_2 == "2") ? "none" : "block"}} >
                  <img src="inactive-circle.png" alt="" />
                </div>
                <div class="food-item">
                  <div class="food-item-lft">
                    <img src="non-veg-icon.png" alt="" />
                  </div>
                  <div class="food-item-rht">
                    <p>Non veg Food</p>
                  </div>
                </div>
                <div class="food-menu">
                <ul>
                  {this.state.nonVeg_food_items && this.state.nonVeg_food_items.length>0 ? this.state.nonVeg_food_items.map((foodArray, index)=>{
                    return(
                      <li key={index}>
                        <div class="food-dots" style={{background: (this.state.final_food_type_2 == "2") ? "#9dce76" : ""}}>
                        </div>
                        <p>{foodArray.name}</p>
                      </li>       
                    )
                  }) : ""}
                </ul>
                </div>
              </div>
            </div>
          </div>
          {this.state.loading && this.state.loading === true ? <LoadingSymbol /> : ""}
          <div class="sbmt">
            <button onClick={this.moveToHomePage}>Submit</button>
          </div>
        </div>
        {/* {this.state.summmary_page_status ?
          <BoardingServiceCostPreview
            data = {this.state.boarding_summary_preview_obj}
            closePopUp = {this.closePopUp}
            moveToHomePage = {this.moveToHomePage}
          />
           : ""} */}
    </div>

    )
  }
}

export default BoardingServiceDetails