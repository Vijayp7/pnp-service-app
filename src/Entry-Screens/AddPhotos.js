import React, { Component } from 'react'
import './AddPhotos.css'
import Services from '../Services/Services';
import { Plugins } from '@capacitor/core';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';
import Resizer from "react-image-file-resizer";
import { formatNumber } from "accounting-js";

const { App } = Plugins;
const user = JSON.parse(localStorage.getItem("PNP-Service-userData"));

export class AddPhotos extends Component {
    constructor(props){
        super(props);
    }
    state = {
        Selected_Images: [],
        Previous_Images : [],
        success_message : "",
        error_message : "",
        loading: false,
    }

    componentDidMount = () =>{
      if(navigator.onLine){
        document.addEventListener('ionBackButton', this.handleBackButton);
        const obj = {
            spId : user.id 
        }
        Services.getInstance().PreviousImages(obj).then((result)=>{
            console.log(result)
            this.setState({
                Previous_Images : result
            })
        })
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }

    }



    Submit = () =>{
      this.setState({
        loading : true
      })
      if(this.state.Previous_Images.length == 4){
        this.setState({
          error_message : "You Have already added " + this.state.Previous_Images.length + " images, you cannot add more than 4 images.",
          loading : false,
        })
      }
      else if((this.state.Selected_Images.length + this.state.Previous_Images.length) > 4){
        this.setState({
          error_message : "You Have already added " + this.state.Previous_Images.length + " images, You can add only more " + (4 - this.state.Previous_Images.length) + " images.",
          loading : false,
        })
      }
      else if(this.state.Selected_Images.length > 0){
        const obj = {
            spId : user.id,
            media : this.state.Selected_Images,
        }
        console.log(obj);
        Services.getInstance().AddImages(obj).then((result)=>{
            if(result.status === true){
                this.setState({
                    success_message : result.msg,
                    error_message : "",
                    loading : false
                }, ()=>{
                  const timeout = setTimeout(() => {
                    this.props.history.push({
                      pathname : "/home"
                    })
                }, 2000);
                })
            }
        })
      }
      else {
        this.setState({
          error_message : "Please Select the image",
          loading : false
      })
      }
    }





    fNumber = (n) =>
    formatNumber(n, { precision: 0, thousand: " ", decimal: "," });

    ImageUpload = (event) =>{
        try {
            let imagesArray = [];
            for(let i=0; i<event.target.files.length; i++){
              this.setState({
                loading : true
              })
              var fileInput = true;
              if (fileInput) {
                try {
                  const img = Resizer.imageFileResizer(
                    event.target.files[i],
                    720,
                    500,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                      console.log(uri);
                      this.setState({ newImage: uri });
                      const base64str = uri.split("base64,")[1];
                      const decoded = atob(base64str);
                      console.log(this.fNumber(decoded.length),)
                      this.setState({
                        newSize: this.fNumber(decoded.length),
                      });
                      let base64ImageURL = uri.replace('data:image/jpeg;base64,','');
                          const obj = {
                            id: i,
                            ext: "image/jpeg",
                            name : event.target.files[i].name,
                            url: base64ImageURL,
                            preview: uri,
                          }
                          imagesArray.push(obj);
                          this.setState({
                            Selected_Images : imagesArray,
                          },()=>{
                            if(imagesArray.length == event.target.files.length){
                              this.setState({
                                loading : false,
                              })
                            }
                          })

                      
                    },
                    "base64",
                    200,
                    200
                  );
                  console.log("img: ", typeof img);
                } catch (err) {
                  console.log(err);
                }
              }
            }

        } 
        catch (error) {
          console.error(error);
          return error;
        }
    }


    removeObjectWithId = (arr, index) => {
        const objWithIdIndex = arr.findIndex((obj)=>obj.id == index);
        arr.splice(objWithIdIndex, 1);
        this.setState({
            Selected_Images : arr,
        })    
      }
      
      unSelect_Image = (selected_images, index) =>{
        this.removeObjectWithId(selected_images, index);
      }



GoBack = () =>{
    this.props.history.push({
        pathname : "/home"
    })
}


delete_Image = (image) => {
  this.setState({
    loading : true
  })
    const obj = {
        spId : user.id,
        photoId : image.photoId
    }
    Services.getInstance().DeleteImages(obj).then((result)=>{
        window.location.reload();
    })
}








  render() {
    return (
        <div id="wrapper">
        <div class="srvc-dtls">
          
          <div class="srvc-dtls-hd">
            <h4>Add Photos & Videos</h4>
            <div class="srvc-dtls-bck" onClick={this.GoBack}>
              <img src="srvc-dtls-bck-icon.png" />
            </div>
          </div>
  
          <div class="add-media-main">
          <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>
            <h5>Upload</h5>
            <div class="cam-div">
              <img src="media-upload-icon.png" alt="image" />
              <p>Select Your Photos & Videos</p>
              <input 
                type="file" 
                accept="image/png, image/gif, image/jpeg"
                multiple="false"
                onChange={this.ImageUpload} 
                placeholder="Upload A image" />
            </div>
  

            <div class="upld-list">
                {this.state.Selected_Images && this.state.Selected_Images.length > 0 ? this.state.Selected_Images.map((images, index)=>{
                    return(
                        <div class="upld-item" key={index}>
                            <img src={images.preview} />
                            <div class="cross-img" onClick={()=>this.unSelect_Image(this.state.Selected_Images, index)}>
                                <img src="cancel-icon.png" alt="image" />
                            </div>
                    </div>
                    )
                }) : ""}


            </div>


            <div class="upld-list">
                {this.state.Previous_Images && this.state.Previous_Images.length > 0 ? this.state.Previous_Images.map((images, index)=>{
                    return(
                        <div class="upld-item" key={index}>
                            <img src={images.photo} />
                            <div class="cross-img" onClick={()=>this.delete_Image(images)}>
                                <img src="cancel-icon.png" alt="image" />
                            </div>
                    </div>
                    )
                }) : ""}


            </div>
            <p style={{margin : "0 auto", textAlign:"center", color : "green"}}>{this.state.success_message}</p>
            <p style={{margin : "0 auto", textAlign:"center", color : "red"}}>{this.state.error_message}</p>
            <div class="media-upld-btns">
                <button class="upld-btn" onClick={this.Submit}>Upload</button>
                {/* <button class="view-btn">View Old Photos & Videos</button> */}
  
            </div>
  
  
          </div>
          
  
  
        </div>
  
  
  
  
  
  
  
  
  
  
  
  
      </div>
    )
  }
}

export default AddPhotos