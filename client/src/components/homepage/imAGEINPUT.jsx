import React from 'react'
import { Input } from '@material-ui/core';
import axios from "axios"
import { storage } from "../../firebase/firebase";

export class imAGEINPUT extends React.Component {
    
   state={
     image:'',
     imgUrl:''
   }
    uploadHandler = (e) => {
      e.preventDefault()
      console.log('start of upload')
      // now async code goes here
      const uploadTask = storage.ref(`/images/${this.state.image.name}`).put(this.state.image)
      uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
       
      storage.ref('images').child(this.state.image.name).getDownloadURL()
       .then(fireBaseUrl => {
        alert( 'done with url',fireBaseUrl)
        this.setState({imgUrl:fireBaseUrl}) 
        console.log(" hguftjgvhb",this.state.imgUrl) 
          
       })
    })
    }

    render() {
        return (
            <div>
               <input type="file" accept="image/*" onChange={(e) =>{
                   this.state.image=e.target.files[0];
                   
               }} />
               <button onClick={this.uploadHandler}>Upload!</button>
            </div>
        )
    }
}

export default imAGEINPUT

